import * as event from "./events";

/**
 * Generate help from the CLI State
 * @param state CLI state to be use
 */
export default function generateHelp(state: any) {
    event.emit("showHelp");

    console.log("\nOPTIONS:\n");
    
    let optionShorthands: Array<string> = state.options.map(o => o.shorthand).sort();
        
    state.options.sort().map((option, i) => {
        let name = `--${option.name}${typeof optionShorthands[i] !== "undefined" ? (', -' + optionShorthands[i]) : ''}`;

        console.log(`${name.padEnd(30, " ")}${option.description}`);
    });

    console.log("\nCOMMANDS:\n");

    state.commands.map(command => {
        let name = `${command.name}`;
        let description = command.hasOwnProperty('parent') ? `Redirects to '${command.parent}' command.` : command.description;

        console.log(name.padEnd(30, " ") + description);
    });
}