import { CommandCallback, CommandAttributes } from "./src/command";
import { OptionCallback, OptionAttributes } from "./src/option";
/**
 * Initialize a new CLI instance.
 */
export declare function CLI(): {
    state: any;
    set: (key: string, value: any) => void;
    get: (key: string) => any;
    command: (name: string, cb: CommandCallback, options?: CommandAttributes) => void;
    option: (name: string, cb: OptionCallback, options?: OptionAttributes) => void;
    run: (argv: string[]) => void;
};
