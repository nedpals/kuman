export type CommandCallback = (args: any) => void;

/**
 * Adds command in the instance state.
 * @param name Name of the command
 * @param cb Callback of the command
 * @param options Additional settings for the command
 * @param state State to be used
 */
export function addCommand(name: string, cb: CommandCallback, options: any, state: any) {
    const commandAttributes = {
        arguments: 0,
        description: '',
        shorthand: '',
        ...options
    };
  
    state.commands.push({
        name,
        run: (args: any = state.args) => cb(args),
        ...commandAttributes
    });
};

