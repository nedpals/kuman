export interface CommandOption {
    value: string;
    cb: any;
}
export declare type OptionCallback = (value: any) => void;
interface OptionShorthand {
    value: string;
    uppercase: boolean;
}
export interface OptionAttributes {
    description?: string;
    asCommand?: boolean;
    shorthand?: string | OptionShorthand;
}
/**
 *
 * @param name Name of the option
 * @param cb Callback of the option
 * @param options Additional settings to the option
 * @param state State to be used
 */
export declare function addOption(name: string, cb: OptionCallback, options: OptionAttributes, state: any): void;
export {};
