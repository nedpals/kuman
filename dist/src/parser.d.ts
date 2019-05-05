/**
 * Parses commands, options, and unknown arguments from the ARGV array.
 * @param argv ARGV to be used
 */
export declare type ARGVArray = string[];
export default function parseArgv(argv: ARGVArray): {
    command: any;
    options: {};
    unknown: any[];
};
