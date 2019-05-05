/// <reference types="node" />
import { CommandCallback, CommandAttributes } from "./src/command";
import { OptionCallback, OptionAttributes } from "./src/option";
import * as events from "./src/events";
/**
 * Initialize a new CLI instance.
 */
export declare function CLI(): {
    command: (name: string, cb: CommandCallback, options?: CommandAttributes) => void;
    option: (name: string, cb: OptionCallback, options?: OptionAttributes) => void;
    run: (argv: string[]) => void;
    on: typeof events.on;
    emit: typeof events.emit;
    emitter: import("events").EventEmitter;
    state: any;
};
