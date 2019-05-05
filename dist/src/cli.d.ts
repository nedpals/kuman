import { ARGVArray } from "./parser";
/**
 * Create a new CLI state instance.
 */
export declare const CLIState: () => void;
/**
 * Run the instance.
 * @param argv ARGV array
 * @param state CLI State to be used
 */
export declare function runCli(argv: ARGVArray, state: any): void;
