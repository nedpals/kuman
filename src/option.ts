export interface CommandOption {
    value: string,
    cb: any
};

export type OptionCallback = (value: any) => void;

interface OptionShorthand {
    value: string,
    uppercase: boolean
}

export interface OptionAttributes {
    description?: string,
    asCommand?: boolean,
    shorthand?: string | OptionShorthand
}

/**
 * 
 * @param name Name of the option
 * @param cb Callback of the option
 * @param options Additional settings to the option
 * @param state State to be used
 */
export function addOption(name: string, cb: OptionCallback, options: OptionAttributes, state: any) {
    const optionAttributes: OptionAttributes = {
        description: '',
        ...options
    }

    delete optionAttributes.shorthand;

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
        ...optionAttributes
    };
}