export interface CommandOption {
    value: string,
    cb: any
};

export type OptionCallback = (value: any) => void;

/**
 * 
 * @param name Name of the option
 * @param cb Callback of the option
 * @param options Additional settings to the option
 * @param state State to be used
 */
export function addOption(name: string, cb: OptionCallback, options: any, state: any) {
    const optionAtrributes = {
        description: '',
        ...options
    }

    delete optionAtrributes.shorthand;

    if (typeof options.shorthand !== "undefined") {
        if (typeof options.shorthand === "object") {
            let shorthandValue = options.shorthand.uppercase ? options.shorthand.value.toUpperCase() : options.shorthand.value;
    
            state.shorthandOptions[shorthandValue] = name;
        } else {
            state.shorthandOptions[options.shorthand] = name;
        }
    }

    state.options[name] = {
        cb,
        ...optionAtrributes
    };

    // if (typeof cb === 'any') {

    // }

    
}