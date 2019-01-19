import { parseArgs } from "./parser";
import { addCommand } from "./command";
import { addOption } from "./option";

export const CLIState = function () : void {
    this.commands = [];
    this.options = {};
    this.args = {};
    this.setArgs = (obj: object) => {
        this.args = obj;
    };
};

export const add = (type: string, name: string, cb: any, state: any) => {
    if (type === "command") {
        addCommand(name, cb, state);
    } else {
        addOption(name, cb, state);
    }
};

export function runCli(argv: Array<string>, state: any) {    
    state.setArgs({ ...state.args, ...parseArgs(argv) });

    const { commands, options, args } = state;
    const selectedCommand = commands.find(command => command.name === args.command);

    Object.keys(options).map(optName => options[optName](args.options[optName]));

    selectedCommand.run();
};