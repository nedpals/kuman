"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function parseArgs(argv) {
    const args = {
        command: argv[0],
        options: argv.filter(arg => arg.startsWith("--"))
            .map(arg => arg.replace("--", "").split("="))
            .map(arg => ({ name: arg[0], value: arg[1] }))
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
    ;
    return args;
}
exports.parseArgs = parseArgs;
