import parseArgv from "./parser";
import { addCommand } from "./command";
import { addOption } from "./option";
import generateHelp from "./help";

/**
 * CLI Instance's settings.
 * @type {{ version: string | number, name: string, description: string, defaultCommand: string, usage: string }}
 */

export interface CLIInfo {
    version: string | number,
    name: string,
    description: string,
    defaultCommand: string,
    usage: string
}

export const cliInfo: CLIInfo = {
    version: '',
    name: '',
    description: '',
    defaultCommand: '',
    usage: ''
};

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
 * Add's option or command in an instance.
 * @param type 
 * @param name 
 * @param cb 
 * @param options 
 * @param state 
 */
export const add = (type: string, name: string, cb: any, options: object = {}, state: any) => {
    if (type === "command") {
        addCommand(name, cb, options, state);
    } else {
        addOption(name, cb, options, state);
    }
};

/**
 * Run the instance.
 * @param argv ARGV array
 * @param state CLI State to be used
 */
export function runCli(argv: Array<string>, state: any) {    
    state.setArgs({ ...state.args, ...parseArgv(argv) });

    let execute = true;
    let errorMsg = "";
    let showHelp = false;

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
                help()
        }
    };

        event.emit("showVersion");
    }, {
        shorthand: "v",
        asCommand: true,
        description: "Displays CLI version"
    }, state);

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

            if (option.asCommand === true) {
                option.cb(args.options[optName]);
                showHelp = false;
            } else {
                args.options[optName] = typeof option.cb !== "undefined" ? option.cb(args.options[optName]) : '';
            }
        }
    });

    if (typeof currentCommand !== "undefined" && currentCommand.arguments !== 0) {
        state.setArgs({...args, _args: args.unknown.slice(0, currentCommand.arguments) });
    }

    if (typeof currentCommand !== "undefined" && currentCommand.hasOwnProperty('requires')) {
        if (Array.isArray(currentCommand.requires)) {
            currentCommand.requires.map(option => {
                if (typeof getOption(option, state) === "undefined") {
                    errorMsg = "Missing option: " + option;
                    execute = false;
                }
            });
        } else {
            if (typeof getOption(currentCommand.requires, state) === "undefined") {
                errorMsg = "Missing option: " + currentCommand.requires;
                execute = false;
            }
        }
    }

    if (typeof currentCommand !== "undefined" && args.unknown.length !== currentCommand.arguments) {
        errorMsg = `Missing arguments: expected ${currentCommand.arguments}, got ${args.unknown.length}.`;
        execute = false;
        showHelp = true;
    }

    if (typeof(currentCommand) === "undefined" && typeof(args.command) !== "undefined")
        errorMsg = "Command not found";
    
    if (argv.length === 0) {
        showHelp = true;
        execute = false;
    }

    if ((typeof(args.command) === "undefined" && state.options.length === 0))
        event.emit("error");

    runCommand();
};

function getCommand(name: string, state: any) {
    const { commands } = state;
    const getShorthandCommand = commands.find(command => command.shorthand === name);
    const getFullCommand = commands.find(command => command.name === name);

    return getFullCommand || getShorthandCommand;
}

function getOption(name: string, state: any) {
    return state.options.find(option => option.shorthand === name || option.name === name);
}