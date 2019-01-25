export declare type CommandCallback = (args: any) => void;
/**
 * Adds command in the instance state.
 * @param name Name of the command
 * @param cb Callback of the command
 * @param options Additional settings for the command
 * @param state State to be used
 */
export declare function addCommand(name: string, cb: CommandCallback, options: any, state: any): void;
