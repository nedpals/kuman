"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cli_1 = require("./src/cli");
function CLI() {
    const state = new cli_1.CLIState();
    const Instance = {
        set: (key, value) => {
            cli_1.cliInfo[key] = value;
        },
        addCommand: (name, cb, options) => {
            cli_1.add("command", name, cb, options, state);
        },
        addOption: (name, cb, options) => {
            cli_1.add("option", name, cb, options, state);
        },
        run: (argv) => {
            cli_1.runCli(argv, state);
        }
    };
    return Instance;
}
exports.CLI = CLI;
