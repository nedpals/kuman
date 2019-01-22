import { CLIState, add, runCli, cliInfo } from "./src/cli";
import { CommandCallback } from "./src/command";
import { OptionCallback } from "./src/option";
export function CLI() {
    const state = new CLIState();

    const Instance = {
        set: (key: string, value: any) => {
            cliInfo[key] = value;
        },
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