"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cli_1 = require("./src/cli");
function CLI() {
    const state = new cli_1.CLIState();
    const Instance = {
        addCommand: (name, cb) => {
            cli_1.add("command", name, cb, state);
        },
        addOption: (name, cb) => {
            cli_1.add("option", name, cb, state);
        },
        run: (argv) => {
            cli_1.runCli(argv, state);
        }
    };
    return Instance;
}
exports.CLI = CLI;
