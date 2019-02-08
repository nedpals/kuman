import { CommandCallback, CommandAttributes } from "./src/command";
import { OptionCallback, OptionAttributes } from "./src/option";
/**
 * Initialize a new CLI instance.
 */
export declare function CLI(): {
    set: (key: string, value: any) => void;
    command: (name: string, cb: CommandCallback, options?: CommandAttributes) => void;
    option: (name: string, cb: OptionCallback, options?: OptionAttributes) => void;
    run: (argv: string[]) => void;
};
