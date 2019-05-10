"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parser_1 = require("./parser");
const helpers_1 = require("./helpers");
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
    let showHelp = false;
    const currentCommand = getCommand(state.args.command, state);
    const runCommand = () => {
        if (execute && typeof (currentCommand) !== "undefined") {
            currentCommand.run();
        }
        else {
            if (showHelp)
                help_1.default(state);
        }
    };
    initializeCLI(state);
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
        if (typeof (state.args.command) !== "undefined") {
            helpers_1.throwError({
                code: "CLI_ERR_CMD_NOT_FOUND",
                message: "Command not found",
                showStackTrace: false
            });
        }
        return;
    }
    if (currentCommand.arguments !== 0) {
        state.setArgs(Object.assign({}, state.args, { args: state.args.unknown.slice(0, currentCommand.arguments) }));
    }
    if (currentCommand.hasOwnProperty('requires') && Array.isArray(currentCommand.requires)) {
        currentCommand.requires.map(option => {
            if (typeof getOption(option, state) === "undefined") {
                helpers_1.throwError({
                    code: "CLI_ERR_MISSING_OPTION",
                    message: "Missing option: " + option
                }, () => {
                    execute = false;
                });
            }
        });
    }
    console.log(currentCommand);
    if (state.args.unknown.length !== currentCommand.arguments) {
        helpers_1.throwError({
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
    if (typeof (state.args.command) === "undefined" && Object.keys(state.args.options).length === 0) {
        helpers_1.throwError({
            code: "CLI_ERR_NO_ARGS",
            message: "No arguments found.",
            throw: true
        });
    }
    runCommand();
}
exports.runCli = runCli;
;
function initializeCLI(state) {
    option_1.addOption("version", () => {
        helpers_1.event.emit("showVersion");
    }, {
        shorthand: "v",
        asCommand: true,
        description: "Displays CLI version"
    }, state);
    option_1.addOption("help", () => help_1.default(state), {
        shorthand: "h",
        asCommand: true,
        description: "Displays the list of commands and options"
    }, state);
    helpers_1.event.emit("init");
}
function getCommand(name, state) {
    return state.commands.find(command => command.shorthand === name || command.name === name);
}
function getOption(name, state) {
    return state.options.find(option => option.shorthand === name || option.name === name);
}
