import { CLIInfo } from "./cli";

/**
 * Generate help from the CLI State
 * @param state CLI state to be use
 */
export default function generateHelp(state: any, info: CLIInfo) {
    const cli_name = info.name.replace(" ", "_").toLowerCase()

    console.log(info.name);
    console.log(info.description);

    console.log(`\nUsage: ` + (info.usage || `${cli_name} [options]`))

    console.log("\nOPTIONS:\n");
    
    Object.keys(state.options).sort((a, b) => {
        if (a.length > b.length)
            return 0;
        
        if (a.length < b.length)
            return 1;
    }).map(option => {
        let name = `--${option}`;
        
        console.log(`${name.padEnd(30, " ")}${state.options[option].description}`);
    });

    Object.keys(state.shorthandOptions).map(option => {
        let shorthand = `-${option}`;
        console.log(`${shorthand.padEnd(30, " ")}Shortcut of '${state.shorthandOptions[option]}'`);
    });

    console.log("\nCOMMANDS:\n");

    state.commands.map(command => {
        let name = `${command.name}`;
        let description = command.hasOwnProperty('parent') ? `Redirects to '${command.parent}' command.` : command.description;

        console.log(name.padEnd(30, " ") + description);
    });
}