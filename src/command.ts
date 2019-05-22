import * as CLIHelpers from "./helpers";

export type CommandCallback = (args: any, helpers: any) => void;
export interface CommandAttributes {
    arguments?: number,
    description?: string,
    shorthand?: string
    requires?: Array<string>
};

/**
 * Adds command in the instance state.
 * @param name Name of the command
 * @param cb Callback of the command
 * @param options Additional settings for the command
 * @param state State to be used
 */
export function addCommand(name: string, cb: CommandCallback, options: CommandAttributes, state: any) {
    const commandAttributes: CommandAttributes = {
        arguments: 0,
        description: '',
        shorthand: '',
        ...options
    };
  
    state.commands.push({
        name,
        run: (args: object = state.args, helpers: any = CLIHelpers) => cb(args, helpers),
        ...commandAttributes
    });
};

