import { CLIState, add, runCli } from "./src/cli";
import { CommandCallback } from "./src/command";
import { OptionCallback } from "./src/option";
export function CLI() {
    const state = new CLIState();

    const Instance = {
        addCommand: (name: string, cb: CommandCallback) => {
            add("command", name, cb, state);
        },
        addOption: (name: string, cb: OptionCallback) => {
            add("option", name, cb, state);
        },
        run: (argv: Array<string>) =>  {
            runCli(argv, state);
        }
    };

    return Instance;
}