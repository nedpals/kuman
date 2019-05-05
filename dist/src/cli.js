"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parser_1 = require("./parser");
const event = require("./events");
const option_1 = require("./option");
const help_1 = require("./help");
/**
 * Create a new CLI state instance.
 */
exports.CLIState = function () {
    this.commands = [];
    this.options = [];
    this.args = {};
    this.setArgs = (obj) => {
        this.args = obj;
    };
};
/**
 * Run the instance.
 * @param argv ARGV array
 * @param state CLI State to be used
 */
function runCli(argv, state) {
    state.setArgs(Object.assign({}, state.args, parser_1.default(argv)));
    let execute = true;
    let errorMsg = "";
    let showHelp = false;
    const help = () => help_1.default(state);
    const { options, args } = state;
    const getCmd = (name) => getCommand(name, state);
    const currentCommand = getCmd(args.command);
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
    option_1.addOption("version", () => {
        event.emit("showVersion");
    }, {
        shorthand: "v",
        asCommand: true,
        description: "Displays CLI version"
    }, state);
    option_1.addOption("help", () => help(), {
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
            }
            else {
                state.args.options[opt] = typeof option.cb !== "undefined" ? option.cb(state.args.options[opt]) : '';
            }
        }
    });
    if (typeof currentCommand === "undefined") {
        if (typeof (args.command) !== "undefined") {
            errorMsg = "Command not found";
        }
        return;
    }
    if (currentCommand.arguments !== 0) {
        state.setArgs(Object.assign({}, args, { _args: args.unknown.slice(0, currentCommand.arguments) }));
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
    if ((typeof (args.command) === "undefined" && state.options.length === 0))
        event.emit("error");
    runCommand();
}
exports.runCli = runCli;
;
function getCommand(name, state) {
    return state.commands.find(command => command.shorthand === name || command.name === name);
}
function getOption(name, state) {
    return state.options.find(option => option.shorthand === name || option.name === name);
}
