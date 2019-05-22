"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CLIHelpers = require("./helpers");
;
/**
 * Adds command in the instance state.
 * @param name Name of the command
 * @param cb Callback of the command
 * @param options Additional settings for the command
 * @param state State to be used
 */
function addCommand(name, cb, options, state) {
    const commandAttributes = Object.assign({ arguments: 0, description: '', shorthand: '' }, options);
    state.commands.push(Object.assign({ name, run: (args = state.args, helpers = CLIHelpers) => cb(args, helpers) }, commandAttributes));
}
exports.addCommand = addCommand;
;
