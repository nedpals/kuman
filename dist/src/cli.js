"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parser_1 = require("./parser");
const command_1 = require("./command");
const option_1 = require("./option");
exports.CLIState = function () {
    this.commands = [];
    this.options = {};
    this.args = {};
    this.setArgs = (obj) => {
        this.args = obj;
    };
};
exports.add = (type, name, cb, state) => {
    if (type === "command") {
        command_1.addCommand(name, cb, state);
    }
    else {
        option_1.addOption(name, cb, state);
    }
};
function runCli(argv, state) {
    state.setArgs(Object.assign({}, state.args, parser_1.parseArgs(argv)));
    const { commands, options, args } = state;
    const selectedCommand = commands.find(command => command.name === args.command);
    Object.keys(options).map(optName => options[optName](args.options[optName]));
    selectedCommand.run();
}
exports.runCli = runCli;
;
