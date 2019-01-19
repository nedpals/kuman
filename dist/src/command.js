"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function addCommand(name, cb, state) {
    state.commands.push({
        name,
        run: (args = state.args) => cb(args)
    });
}
exports.addCommand = addCommand;
;
