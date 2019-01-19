import { CommandCallback } from "./src/command";
import { OptionCallback } from "./src/option";
export declare function CLI(): {
    addCommand: (name: string, cb: CommandCallback) => void;
    addOption: (name: string, cb: OptionCallback) => void;
    run: (argv: string[]) => void;
};
