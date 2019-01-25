export interface CommandOption {
    value: string;
    cb: any;
}
export declare type OptionCallback = (value: any) => void;
export declare function addOption(name: string, cb: OptionCallback, options: any, state: any): void;
