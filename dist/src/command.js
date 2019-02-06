"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Adds command in the instance state.
 * @param name Name of the command
 * @param cb Callback of the command
 * @param options Additional settings for the command
 * @param state State to be used
 */
function addCommand(name, cb, options, state) {
    const commandAttributes = Object.assign({ arguments: 0, description: '', shorthand: '' }, options);
    state.commands.push(Object.assign({ name, run: (args = state.args) => cb(args) }, commandAttributes));
}
exports.addCommand = addCommand;
;
