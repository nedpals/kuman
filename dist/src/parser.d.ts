/**
 * Parses commands, options, and unknown arguments from the ARGV array.
 * @param argv ARGV to be used
 */
export declare function parseArgs(argv: string[]): {
    command: string;
    options: {};
    unknown: any[];
};
