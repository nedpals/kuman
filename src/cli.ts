import { parseArgs } from "./parser";
import { addCommand } from "./command";
import { addOption } from "./option";

/**
 * CLI Instance's settings.
 * @type {{ version: string, name: string, description: string, defaultCommand: string }}
 */
export const cliInfo = {
    version: '',
    name: '',
    description: '',
    defaultCommand: ''
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
    state.setArgs({ ...state.args, ...parseArgs(argv) });

    let execute = true;
    let errorMsg = "";
    let showHelp = false;

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
                generateHelp(state);
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

    add("option", "help", () => {
        generateHelp(state);
    }, {
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

    if (typeof currentCommand !== "undefined" && currentCommand.hasOwnProperty('requires'))
        currentCommand.requires.split(", ").map(option => {
            if (typeof getOption(option, state) === "undefined") {
                errorMsg = "Missing option: " + option;
                execute = false;
            }
        });

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

/**
 * Generate help from the CLI State
 * @param state CLI state to be use
 */
function generateHelp(state: any) {
    const cli_name = cliInfo.name.replace(" ", "_").toLowerCase()

    console.log(cliInfo.name);
    console.log(cliInfo.description);
    

    console.log(`\nUsage: ${cli_name} [options]`)

    console.log("\nOptions:\n");
    
    Object.keys(state.options).sort((a, b) => {
        if (a.length > b.length)
            return 0;
        
        if (a.length < b.length)
            return 1;
    }).map(option => {
        let name = `--${option}`;
        
        console.log(`${name.padEnd(30, " ")}${state.options[option].description}`);
    });

    Object.keys(state.shorthandOptions).map(option => {
        let shorthand = `-${option}`;
        console.log(`${shorthand.padEnd(30, " ")}Shortcut of '${state.shorthandOptions[option]}'`);
    });

    console.log("\nCommands:\n");

    state.commands.map(command => {
        let name = `${command.name}${command.argument && ('=' + command.argument.toUpperCase())}`;
        let description = command.hasOwnProperty('parent') ? `Redirects to '${command.parent}' command.` : command.description;

        console.log(name.padEnd(30, " ") + description);
    });
}