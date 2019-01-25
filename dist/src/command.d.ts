export declare type CommandCallback = (args: any) => void;
export declare function addCommand(name: string, cb: CommandCallback, options: any, state: any): void;
