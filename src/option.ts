export type OptionCallback = (value: any) => void;
export interface OptionAttributes {
    name?: string,
    description?: string,
    asCommand?: boolean,
    cb?: OptionCallback,
    shorthand?: string
}

/**
 * Adds a new CLI option/flag to the instance
 * 
 * @param name Name of the option.
 * @param cb Option callback.
 * @param options Additional settings to the option.
 * @param state CLI Instance/State to be used/
 */
export function addOption(name: string, cb: OptionCallback, options: OptionAttributes, state: any) {
    const option: OptionAttributes = {
        description: '',
        name,
        cb,
        ...options
    };

    state.options.push(option);
}