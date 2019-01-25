/**
 * CLI Instance's settings.
 * @type {{ version: string, name: string, description: string, defaultCommand: string }}
 */
export declare const cliInfo: {
    version: string;
    name: string;
    description: string;
    defaultCommand: string;
};
/**
 * Create a new CLI state instance.
 */
export declare const CLIState: () => void;
/**
 * Add's option or command in an instance.
 * @param type
 * @param name
 * @param cb
 * @param options
 * @param state
 */
export declare const add: (type: string, name: string, cb: any, options: object, state: any) => void;
/**
 * Run the instance.
 * @param argv ARGV array
 * @param state CLI State to be used
 */
export declare function runCli(argv: Array<string>, state: any): void;
