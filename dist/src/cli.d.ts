export declare const cliInfo: {
    version: string;
    name: string;
    description: string;
    defaultCommand: string;
};
export declare const CLIState: () => void;
export declare const add: (type: string, name: string, cb: any, options: object, state: any) => void;
export declare function runCli(argv: Array<string>, state: any): void;
