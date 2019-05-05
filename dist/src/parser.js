"use strict";
/**
 * Parses commands, options, and unknown arguments from the ARGV array.
 * @param argv ARGV to be used
 */
Object.defineProperty(exports, "__esModule", { value: true });
function parseArgv(argv) {
    if (argv.length === 0)
        return { command: '', options: {}, unknown: [] };
    const parsed = {
        command: undefined,
        options: {},
        unknown: []
    };
    for (let i = 0; i < argv.length; i++) {
        const current = argv[i];
        if (!detectHyphenArgs(current)) {
            if (i === 0)
                parsed.command = current;
            if (i !== 0 && detectHyphenArgs(argv[i - 1])) {
                const prevArg = parseHypenArgs(argv[i - 1]);
                parsed.options[prevArg[0]] = detectArrayOfValues(current) ? current.split(",") : current;
            }
        }
        if (i !== 0 && (!detectHyphenArgs(argv[i - 1]) && !detectHyphenArgs(current))) {
            parsed.unknown.push(current);
        }
        if (detectHyphenArgs(current)) {
            const arg = parseHypenArgs(current);
            const value = (() => {
                const val = arg[1] || "";
                return detectArrayOfValues(val) ? val.split(",") : val;
            })();
            parsed.options[arg[0]] = value;
        }
    }
    return parsed;
}
exports.default = parseArgv;
function parseHypenArgs(val) {
    return val.replace(val.startsWith("--") ? "--" : "-", "").split("=");
}
function detectArrayOfValues(val) {
    return val.split(",").length > 1 ? true : false;
}
function detectHyphenArgs(arg) {
    return arg.startsWith("-");
}
