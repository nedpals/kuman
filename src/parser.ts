/**
 * Parses commands, options, and unknown arguments from the ARGV array.
 * @param argv ARGV to be used
 */
export default function parseArgv (argv: string[]) {
    if (argv.length === 0)
        return { command: '', options: {}, unknown: [] };

    const parsed = {
        command: undefined,
        options: {},
        unknown: []
    };

    for (let i = 0; i < argv.length; i++) {
        const current: string = argv[i];

        if (!detectHyphenArgs(current)) {
            if (i === 0)
                parsed.command = current;

            if (i !== 0 && detectHyphenArgs(argv[i-1])) {
                const prevArg = parseHypenArgs(argv[i-1]);

                parsed.options[prevArg[0]] = detectArrayOfValues(current) ? current.split(",") : current;
            }
        }

        if (i !== 0 && (!detectHyphenArgs(argv[i-1]) && !detectHyphenArgs(current))) {
            parsed.unknown.push(current);
        }

        if (detectHyphenArgs(current)) {
            const arg = parseHypenArgs(current);
            
            const value = (() => {
                const val = arg[1] || ""

                return detectArrayOfValues(val) ? val.split(",") : val;
            })()

            parsed.options[arg[0]] = value;
        }
    }

    return parsed;
}

function parseHypenArgs(val) {
    return val.replace(val.startsWith("--") ? "--" : "-", "").split("=");
}

function detectArrayOfValues(val) {
    return val.split(",").length > 1 ? true : false;
}

function detectHyphenArgs(arg: string) {
    return arg.startsWith("-");
}
