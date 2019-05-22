import mockConsole from "jest-mock-console";
import { CLI } from "../kuman";

const cli = CLI();

describe("execute option", () => {
    let expectedFn;
    let argv;

    const cliRun = jest.spyOn(cli, "run");
    const consoleLog = jest.spyOn(global.console, "log");

    it("runs a command", () => {
        expectedFn = (v) => console.log(parseInt(v) + 10);
        argv = ["--addOne", "10"];

        cli.command("hello", expectedFn);
        cliRun.mockImplementation(() => { console.log(11) });

        expect(cli.run(argv)).toBeUndefined();
        expect(consoleLog).toHaveBeenCalledWith(12);
        expect(cliRun).toHaveBeenCalledWith(argv);

        cliRun.mockReset();
        consoleLog.mockReset();
    });
});