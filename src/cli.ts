import parseArgv, { ARGVArray } from "./parser";
import { throwError, event } from "./helpers";
import { addOption } from "./option";
import generateHelp from "./help";

/**
 * Create a new CLI state instance.
 */
export const CLIState = function () : void {
    this.commands = [];
    this.options = [];
    this.args = {};
    this.setArgs = (obj: object) => {
        this.args = obj;
    };
};

/**
 * Run the instance.
 * @param argv ARGV array
 * @param state CLI State to be used
 */
export function runCli(argv: ARGVArray, state: any) {    
    state.setArgs({ ...state.args, ...parseArgv(argv) });

    let execute = true;
    let showHelp = false;

    const currentCommand = getCommand(state.args.command, state);
    const runCommand = () => {
        if (execute && typeof(currentCommand) !== "undefined") {
            currentCommand.run();
        } else {
            if (showHelp)
                generateHelp(state);
        }

        event.emit("destroy");
    };

    initializeCLI(state);

    Object.keys(state.args.options).map(opt => {
        let option = getOption(opt, state);
        if (typeof option !== "undefined") {
            if (option.asCommand === true) {
                option.cb(state.args.options[opt]);
                showHelp = false;

                event.emit("destroy");
            } else {
                state.args.options[opt] = typeof option.cb !== "undefined" ? option.cb(state.args.options[opt]) : '';
            }
        }
    });

    if (typeof currentCommand === "undefined") {
        if (typeof(state.args.command) !== "undefined") {
            throwError({
                code: "CLI_ERR_CMD_NOT_FOUND",
                message: "Command not found",
                showStackTrace: false
            }, (err) => {
                console.log(`${err.name}: ${err.message}`);
            });
        }

        return;
    }

    if (currentCommand.arguments !== 0) {
        state.setArgs({...state.args, args: state.args.unknown.slice(0, currentCommand.arguments) });
    }

    if (currentCommand.hasOwnProperty('requires') && Array.isArray(currentCommand.requires)) {
        currentCommand.requires.map(option => {
            if (typeof getOption(option, state) === "undefined") {
                throwError({
                    code: "CLI_ERR_MISSING_OPTION",
                    message: "Missing option: " + option
                }, () => {
                    execute = false;
                });
            }
        });
    }

    if (state.args.unknown.length !== currentCommand.arguments) {
        throwError({
            code: "CLI_ERR_MISSING_ARGS",
            message: `Missing arguments: expected ${currentCommand.arguments}, got ${state.args.unknown.length}.`,
            throw: false
        }, () => {
            execute = false;
            showHelp = true;
        });
    }

    if (argv.length === 0) {
        showHelp = true;
        execute = false;
    }

    if (typeof(state.args.command) === "undefined" && Object.keys(state.args.options).length === 0) {
        throwError({
            code: "CLI_ERR_NO_ARGS",
            message: "No arguments found.",
            throw: true
        });
    }

    runCommand();

    process.on("SIGINT", () => {
        event.emit("destroy");
    });
};

function initializeCLI(state: any) {
    addOption("version", () => {
        event.emit("showVersion");
    }, {
        shorthand: "v",
        asCommand: true,
        description: "Displays CLI version"
    }, state);

    addOption("help", () => generateHelp(state), {
        shorthand: "h",
        asCommand: true,
        description: "Displays the list of commands and options"
    }, state);

    event.emit("init");
} 

function getCommand(name: string, state: any) {
    return state.commands.find(command => command.shorthand === name || command.name === name);
}

function getOption(name: string, state: any) {
    return state.options.find(option => option.shorthand === name || option.name === name);
}