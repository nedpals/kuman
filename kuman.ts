import { CLIState, runCli } from "./src/cli";
import { addCommand, CommandCallback, CommandAttributes } from "./src/command";
import { addOption, OptionCallback, OptionAttributes } from "./src/option";
import * as events from "./src/events";
import { ARGVArray } from "./src/parser";

/**
 * Initialize a new CLI instance.
 */
export function CLI() {
    const state = new CLIState();

    const Instance = {
        state,
        ...events,
        command: (name: string, cb: CommandCallback, options?: CommandAttributes) => addCommand(name, cb, options, state),
        option: (name: string, cb: OptionCallback, options?: OptionAttributes) => addOption(name, cb, options, state),
        run: (argv: ARGVArray) => runCli(argv, state)
    };

    return Instance;
}