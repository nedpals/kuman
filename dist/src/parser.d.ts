/**
 * Parses commands, options, and unknown arguments from the ARGV array.
 * @param argv ARGV to be used
 */
export declare function parseArgs(argv: string[]): {
    command: any;
    options: {};
    unknown: any[];
};
