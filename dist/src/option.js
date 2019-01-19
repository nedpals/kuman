"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
;
function addOption(name, cb, state) {
    state.options[name] = cb;
}
exports.addOption = addOption;
