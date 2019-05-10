import mockConsole from "jest-mock-console";
import { CLI } from "../kuman";

describe("execute commands", () => {
    test("run command", () => {
        const restoreConsole = mockConsole();
        const cli = CLI();

        cli.command("hello", () => console.log("Hello"));
        expect(cli.run(["hello"])).toHaveBeenCalled();
        restoreConsole();
    });
});