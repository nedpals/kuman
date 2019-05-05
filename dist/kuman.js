"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cli_1 = require("./src/cli");
const command_1 = require("./src/command");
const option_1 = require("./src/option");
const events = require("./src/events");
/**
 * Initialize a new CLI instance.
 */
function CLI() {
    const state = new cli_1.CLIState();
    const Instance = Object.assign({ state }, events, { command: (name, cb, options) => command_1.addCommand(name, cb, options, state), option: (name, cb, options) => option_1.addOption(name, cb, options, state), run: (argv) => cli_1.runCli(argv, state) });
    return Instance;
}
exports.CLI = CLI;
