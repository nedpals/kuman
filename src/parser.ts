/**
 * Parses commands, options, and unknown arguments from the ARGV array.
 * @param argv ARGV to be used
 */
export function parseArgs (argv: string[]) {
    if (argv.length === 0)
        return { command: '', options: {}, unknown: [] };

    const args = {
        command: !argv[0].startsWith("-") ? argv[0] : undefined,
        options: argv.filter(arg => arg.startsWith("--") || arg.startsWith("-"))
                    .map(arg => arg.replace(arg.startsWith("--") ? "--" : "-", "").split("="))
                    .map(arg => ({ name: arg[0], value: arg[1] || "" }))
                    .map(arg => ({
                        name: arg.name,
                        value: arg.value.split(",").length > 1 ? arg.value.split(",") : arg.value
                    }))
                    .reduce((obj, item) => {
                        obj[item.name] = item.value;
                        return obj;
                    }, {}),
        unknown: []
    };

    args.unknown = argv.filter(i => i !== args.command)
                       .filter(i => !i.startsWith("--") || !i.startsWith("-"));

    return args;
}