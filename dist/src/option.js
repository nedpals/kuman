"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 * @param name Name of the option
 * @param cb Callback of the option
 * @param options Additional settings to the option
 * @param state State to be used
 */
function addOption(name, cb, options, state) {
    const option = Object.assign({ description: '', name,
        cb }, options);
    state.options.push(option);
}
exports.addOption = addOption;
