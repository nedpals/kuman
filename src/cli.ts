import { parseArgs } from "./parser";
import { addCommand } from "./command";
import { addOption } from "./option";
export const cliInfo = {
    version: '',
    name: '',
    description: '',
    defaultCommand: ''
};

export const CLIState = function () : void {
    this.commands = [];
    this.options = {};
    this.args = {};
    this.setArgs = (obj: object) => {
        this.args = obj;
    };
};

export const add = (type: string, name: string, cb: any, options: object = {}, state: any) => {
    if (type === "command") {
        addCommand(name, cb, options, state);
    } else {
        addOption(name, cb, options, state);
    }
};

export function runCli(argv: Array<string>, state: any) {    
    state.setArgs({ ...state.args, ...parseArgs(argv) });

    const { options, args } = state;
    const getCmd = (name: string) => getCommand(name, state);
    const currentCommand = getCmd(args.command);
    const defaultCommand = getCmd(cliInfo.defaultCommand);

    add("option", "version", () => {
        console.log(cliInfo.version);
    }, {
        shorthand: {
            value: "v",
            uppercase: false
        },
        description: "Displays CLI version"
    }, state);

    add("option", "help", () => {
        generateHelp(state);
    }, {
        shorthand: {
            value: "h",
            uppercase: false
        },
        description: "Displays the list of commands and options"
    },state);

    if (typeof currentCommand !== "undefined" && currentCommand.hasOwnProperty('requires'))
        currentCommand.requires.split(", ").map(option => {
            if (typeof Object.keys(state.args.options).find(o => o === option) === "undefined") {
                console.error("Missing option: " + option);
            }
        });

    if (typeof(currentCommand) !== "undefined")
        currentCommand.run();
    
    if (typeof(currentCommand) !== "undefined" && Object.keys(args.options).length === 0) {
        console.error("Command not found");
        generateHelp(state);
    }

    if (argv.length === 0 && cliInfo.defaultCommand.length === 0)
        generateHelp(state)

    if ((typeof(args.command) === "undefined" && Object.keys(args.options).length === 0) && cliInfo.defaultCommand.length !== 0)
        defaultCommand.run();
};

function getCommand(name: string, state: any) {
    const { commands } = state;
    const getShorthandCommand = commands.find(command => command.shorthand === name);
    const getFullCommand = commands.find(command => command.name === name);

    return getFullCommand || getShorthandCommand;
}

function getOption(name: string, state: any) {
    const { options } = state;
    let foundOption = Object.keys(options).map(optionName => {
        const getShorthandOption = () => {
            if (typeof options[optionName].shorthand === "object") {
                return options[optionName].shorthand.value === name ? options[optionName] : undefined;
            } else {
                return options[optionName].shorthand === name ? options[optionName] : undefined;
            }
};
        const getFullOption = optionName === name ? options[optionName] : undefined;

        return getFullOption || getShorthandOption();
    }).filter(el => el !== undefined)[0];

    return foundOption;
}

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
        console.log(`--${option}        ${state.options[option].description}`);

        if (state.options[option].shorthand.length !== 0) {
            console.log(`-${state.options[option].shorthand}        Shortcut of '--${option}'`);
        }
    });

    console.log("\nCommands:\n");
    state.commands.map(command => {
        if (command.hasOwnProperty('parent')) {
            console.log(`${command.name}${command.argument && ('=' + command.argument.toUpperCase())}            Redirects to '${command.parent}' command.`);
        } else {
            console.log(`${command.name}${command.argument && ('=' + command.argument.toUpperCase())}            ${command.description}`);
        }
    });
}