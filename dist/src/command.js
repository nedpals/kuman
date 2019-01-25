"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function addCommand(name, cb, options, state) {
    const commandAttributes = Object.assign({ argument: '', description: '', shorthand: '' }, options);
    state.commands.push(Object.assign({ name, run: (args = state.args) => cb(args) }, commandAttributes));
}
exports.addCommand = addCommand;
;
