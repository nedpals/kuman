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

    args.unknown = argv.filter(arg => {
        const unknownArg = arg.startsWith("--") ? arg.replace("--", "").split("=")[0] : arg;
        return unknownArg != args.command; 
    }).filter((arg, i, a) => {
        const unknownArg = arg.startsWith("--") ? arg.replace("--", "").split("=")[0] : arg;
        return Object.keys(args.options).some(opt => opt.startsWith(unknownArg));
    });

    return args;
}