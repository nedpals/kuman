"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parser_1 = require("./parser");
const command_1 = require("./command");
const option_1 = require("./option");
const help_1 = require("./help");
exports.cliInfo = {
    version: '',
    name: '',
    description: '',
    defaultCommand: '',
    usage: ''
};
/**
 * Create a new CLI state instance.
 */
exports.CLIState = function () {
    this.commands = [];
    this.shorthandOptions = {};
    this.options = {};
    this.args = {};
    this.setArgs = (obj) => {
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
exports.add = (type, name, cb, options = {}, state) => {
    if (type === "command") {
        command_1.addCommand(name, cb, options, state);
    }
    else {
        option_1.addOption(name, cb, options, state);
    }
};
/**
 * Run the instance.
 * @param argv ARGV array
 * @param state CLI State to be used
 */
function runCli(argv, state) {
    state.setArgs(Object.assign({}, state.args, parser_1.parseArgs(argv)));
    let execute = true;
    let errorMsg = "";
    let showHelp = false;
    const help = () => help_1.default(state, exports.cliInfo);
    const { options, args, shorthandOptions } = state;
    const getCmd = (name) => getCommand(name, state);
    const currentCommand = getCmd(args.command);
    const defaultCommand = getCmd(exports.cliInfo.defaultCommand);
    const runCommand = () => {
        if (execute && typeof (currentCommand) !== "undefined") {
            currentCommand.run();
        }
        else {
            if (errorMsg.length !== 0)
                console.error(errorMsg);
            if (showHelp)
                help();
        }
    };
    exports.add("option", "version", () => {
        console.log(exports.cliInfo.version);
    }, {
        shorthand: {
            value: "v",
            uppercase: false
        },
        asCommand: true,
        description: "Displays CLI version"
    }, state);
    exports.add("option", "help", () => help(), {
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
            }
            else {
                args.options[shorthandOptions[optName]] = typeof option.cb !== "undefined" ? option.cb(currentArgOption) : '';
                delete args.options[optName];
            }
        }
    });
    Object.keys(options).map(optName => {
        if (typeof args.options[optName] !== "undefined") {
            let option = getOption(optName, state);
            if (option.asCommand === true) {
                option.cb(args.options[optName]);
                showHelp = false;
            }
            else {
                args.options[optName] = typeof option.cb !== "undefined" ? option.cb(args.options[optName]) : '';
            }
        }
    });
    if (typeof currentCommand !== "undefined" && currentCommand.arguments !== 0) {
        state.setArgs(Object.assign({}, args, { _args: args.unknown.slice(0, currentCommand.arguments) }));
    }
    if (typeof currentCommand !== "undefined" && currentCommand.hasOwnProperty('requires')) {
        if (currentCommand.isArray()) {
            currentCommand.requires.map(option => {
                if (typeof getOption(option, state) === "undefined") {
                    errorMsg = "Missing option: " + option;
                    execute = false;
                }
            });
        }
        else {
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
    if (typeof (currentCommand) === "undefined" && typeof (args.command) !== "undefined")
        errorMsg = "Command not found";
    if (argv.length === 0) {
        showHelp = true;
        execute = false;
    }
    if ((typeof (args.command) === "undefined" && Object.keys(args.options).length === 0) && exports.cliInfo.defaultCommand.length !== 0)
        defaultCommand.run();
    runCommand();
}
exports.runCli = runCli;
;
function getCommand(name, state) {
    const { commands } = state;
    const getShorthandCommand = commands.find(command => command.shorthand === name);
    const getFullCommand = commands.find(command => command.name === name);
    return getFullCommand || getShorthandCommand;
}
function getOption(name, state) {
    const { options, shorthandOptions } = state;
    let foundOption = Object.keys(shorthandOptions).map(optionName => {
        const currentShorthand = shorthandOptions[optionName];
        return optionName === name && options[currentShorthand];
    }).concat(Object.keys(options).map(optionName => optionName === name && options[optionName])).filter(el => el !== false)[0];
    return foundOption;
}
