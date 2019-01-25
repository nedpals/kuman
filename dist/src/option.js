"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
;
function addOption(name, cb, options, state) {
    const optionAtrributes = Object.assign({ description: '' }, options);
    delete optionAtrributes.shorthand;
    if (typeof options.shorthand !== "undefined") {
        if (typeof options.shorthand === "object") {
            let shorthandValue = options.shorthand.uppercase ? options.shorthand.value.toUpperCase() : options.shorthand.value;
            state.shorthandOptions[shorthandValue] = name;
        }
        else {
            state.shorthandOptions[options.shorthand] = name;
        }
    }
    state.options[name] = Object.assign({ cb }, optionAtrributes);
    // if (typeof cb === 'any') {
    // }
}
exports.addOption = addOption;
