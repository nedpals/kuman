import { CLIState, add, runCli, cliInfo } from "./src/cli";
import { CommandCallback, CommandAttributes } from "./src/command";
import { OptionCallback, OptionAttributes } from "./src/option";

/**
 * Initialize a new CLI instance.
 */
export function CLI() {
    const state = new CLIState();

    const Instance = {
        set: (key: string, value: any) => {
            cliInfo[key] = value;
        },
        command: (name: string, cb: CommandCallback, options?: CommandAttributes) => {
            add("command", name, cb, options, state);
        },
        option: (name: string, cb: OptionCallback, options?: OptionAttributes) => {
            add("option", name, cb, options, state);
        },
        run: (argv: Array<string>) =>  {
            runCli(argv, state);
        }
    };

    return Instance;
}