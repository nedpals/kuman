export interface CommandOption {
    value: string;
    cb: any;
}
export declare type OptionCallback = (value: any) => void;
export declare function addOption(name: string, cb: OptionCallback, state: any): void;
