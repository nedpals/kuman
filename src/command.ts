export type CommandCallback = (args: any) => void;

export function addCommand(name: string, cb: CommandCallback, state: any) {
    state.commands.push({
        name,
        run: (args: any = state.args) => cb(args)
    });
};