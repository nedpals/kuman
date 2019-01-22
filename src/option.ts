export interface CommandOption {
    value: string,
    cb: any
};

export type OptionCallback = (value: any) => void;

export function addOption(name: string, cb: OptionCallback, options: any, state: any) {
    const optionAtrributes = {
        description: '',
        shorthand: "",
        ...options
    }

    if (typeof options.shorthand === "object")
        optionAtrributes.shorthand = options.shorthand.uppercase ? options.shorthand.value.toUpperCase() : options.shorthand;

    state.options[name] = {
        cb,
        ...optionAtrributes
    };

    // if (typeof cb === 'any') {

    // }

    
}