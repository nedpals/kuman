import parseArgv, { ARGVArray } from "./parser";
import * as event from "./events";
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
    let errorMsg = "";
    let showHelp = false;

    const help = () => generateHelp(state);
    const { options, args } = state;
    const getCmd = (name: string) => getCommand(name, state);
    const currentCommand = getCmd(args.command);
    const runCommand = () => {
        if (execute && typeof(currentCommand) !== "undefined") {
            currentCommand.run();
        } else {
            if (errorMsg.length !== 0)
                console.error(errorMsg);

            if (showHelp)
                help();
        }
    };

    addOption("version", () => {
        event.emit("showVersion");
    }, {
        shorthand: "v",
        asCommand: true,
        description: "Displays CLI version"
    }, state);

    addOption("help", () => help(), {
        shorthand: "h",
        asCommand: true,
        description: "Displays the list of commands and options"
    }, state);

    Object.keys(state.args.options).map(opt => {
        let option = getOption(opt, state);
        if (typeof option !== "undefined") {
            if (option.asCommand === true) {
                option.cb(state.args.options[opt]);
                showHelp = false;
            } else {
                state.args.options[opt] = typeof option.cb !== "undefined" ? option.cb(state.args.options[opt]) : '';
            }
        }
    });

    if (typeof currentCommand === "undefined") {
        if (typeof(args.command) !== "undefined") {
            errorMsg = "Command not found";
        }

        return;
    }

    if (currentCommand.arguments !== 0) {
        state.setArgs({...args, _args: args.unknown.slice(0, currentCommand.arguments) });
    }

    if (currentCommand.hasOwnProperty('requires') && Array.isArray(currentCommand.requires)) {
        currentCommand.requires.map(option => {
            if (typeof getOption(option, state) === "undefined") {
                errorMsg = "Missing option: " + option;
                execute = false;
            }
        });
    }

    if (args.unknown.length !== currentCommand.arguments) {
        errorMsg = `Missing arguments: expected ${currentCommand.arguments}, got ${args.unknown.length}.`;
        execute = false;
        showHelp = true;
    }

    if (argv.length === 0) {
        showHelp = true;
        execute = false;
    }

    if ((typeof(args.command) === "undefined" && state.options.length === 0))
        event.emit("error");

    runCommand();
};

function getCommand(name: string, state: any) {
    return state.commands.find(command => command.shorthand === name || command.name === name);
}

function getOption(name: string, state: any) {
    return state.options.find(option => option.shorthand === name || option.name === name);
}