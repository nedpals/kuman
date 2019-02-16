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
    this.shorthandOptions = {};
    this.options = {};
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

    const help = () => generateHelp(state, cliInfo);
    const { options, args, shorthandOptions } = state;
    const getCmd = (name: string) => getCommand(name, state);
    const currentCommand = getCmd(args.command);
    const defaultCommand = getCmd(cliInfo.defaultCommand);
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

    add("option", "version", () => {
        console.log(cliInfo.version);
    }, {
        shorthand: {
            value: "v",
            uppercase: false
        },
        asCommand: true,
        description: "Displays CLI version"
    }, state);

    add("option", "help", () => help(), {
        shorthand: {
            value: "h",
            uppercase: false
        },
        asCommand: true,
        description: "Displays the list of commands and options"
    }, state);

    // Execute shorthand
    Object.keys(shorthandOptions).map(optName => {
        let currentArgOption = args.options[optName];

        if (typeof currentArgOption !== "undefined") {
            let option = getOption(optName, state);

            if (option.asCommand === true) {
                option.cb(currentArgOption);
            } else {
                args.options[shorthandOptions[optName]] = typeof option.cb !== "undefined" ? option.cb(currentArgOption) : '';

                delete args.options[optName];
            }
        }
    })

    Object.keys(options).map(optName => {
        if (typeof args.options[optName] !== "undefined") {
            let option = getOption(optName, state);

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

    if ((typeof(args.command) === "undefined" && Object.keys(args.options).length === 0) && cliInfo.defaultCommand.length !== 0)
        defaultCommand.run();

    runCommand();
};

function getCommand(name: string, state: any) {
    const { commands } = state;
    const getShorthandCommand = commands.find(command => command.shorthand === name);
    const getFullCommand = commands.find(command => command.name === name);

    return getFullCommand || getShorthandCommand;
}

function getOption(name: string, state: any) {
    const { options, shorthandOptions } = state;
    let foundOption = Object.keys(shorthandOptions).map(optionName => {
            const currentShorthand = shorthandOptions[optionName];
            return optionName === name && options[currentShorthand];
        }).concat(Object.keys(options).map(optionName => optionName === name && options[optionName])).filter(el => el !== false)[0];

    return foundOption;
}