export interface CommandOption {
    value: string,
    cb: any
};

export type OptionCallback = (value: any) => void;

export function addOption(name: string, cb: OptionCallback, state: any) {
    state.options[name] = cb;
}