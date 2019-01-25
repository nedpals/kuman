import { CommandCallback } from "./src/command";
import { OptionCallback } from "./src/option";
/**
 * Initialize a new CLI instance.
 */
export declare function CLI(): {
    set: (key: string, value: any) => void;
    addCommand: (name: string, cb: CommandCallback, options?: object) => void;
    addOption: (name: string, cb: OptionCallback, options?: object) => void;
    run: (argv: string[]) => void;
};
