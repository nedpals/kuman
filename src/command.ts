export type CommandCallback = (args: any) => void;

export function addCommand(name: string, cb: CommandCallback, options: any, state: any) {
    const commandAttributes = {
        argument: '',
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

