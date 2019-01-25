import { CLIState, add, runCli, cliInfo } from "./src/cli";
import { CommandCallback } from "./src/command";
import { OptionCallback } from "./src/option";

/**
 * Initialize a new CLI instance.
 */
export function CLI() {
    const state = new CLIState();

    const Instance = {
        set: (key: string, value: any) => {
            cliInfo[key] = value;
        },
        addCommand: (name: string, cb: CommandCallback, options?: object) => {
            add("command", name, cb, options, state);
        },
        addOption: (name: string, cb: OptionCallback, options?: object) => {
            add("option", name, cb, options, state);
        },
        run: (argv: Array<string>) =>  {
            runCli(argv, state);
        }
    };

    return Instance;
}