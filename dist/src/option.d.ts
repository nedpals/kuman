export interface CommandOption {
    value: string;
    cb: any;
}
export declare type OptionCallback = (value: any) => void;
/**
 *
 * @param name Name of the option
 * @param cb Callback of the option
 * @param options Additional settings to the option
 * @param state State to be used
 */
export declare function addOption(name: string, cb: OptionCallback, options: any, state: any): void;
