export declare type OptionCallback = (value: any) => void;
export interface OptionAttributes {
    name?: string;
    description?: string;
    asCommand?: boolean;
    cb?: OptionCallback;
    shorthand?: string;
}
/**
 *
 * @param name Name of the option
 * @param cb Callback of the option
 * @param options Additional settings to the option
 * @param state State to be used
 */
export declare function addOption(name: string, cb: OptionCallback, options: OptionAttributes, state: any): void;
