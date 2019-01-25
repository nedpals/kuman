"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
;
/**
 *
 * @param name Name of the option
 * @param cb Callback of the option
 * @param options Additional settings to the option
 * @param state State to be used
 */
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
