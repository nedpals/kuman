import mockConsole from "jest-mock-console";
import { CLI } from "../kuman";

const cli = CLI();

describe("execute commands", () => {
    let expectedFn;
    let argv;

    const cliRun = jest.spyOn(cli, "run");
    const consoleLog = jest.spyOn(global.console, "log");

    it("runs a command", () => {
        expectedFn = () => console.log("Hello");
        argv = ["hello"];

        cli.command("hello", expectedFn);
        cliRun.mockImplementation(expectedFn);

        expect(cli.run(argv)).toBeUndefined();
        expect(consoleLog).toHaveBeenCalledWith("Hello");
        expect(cliRun).toHaveBeenCalledWith(argv);

        cliRun.mockReset();
        consoleLog.mockReset();
    });

    it("runs a command with required options", () => {
        argv = ["print", "--age", "10"];

        cli.option("age", (v) => v);
        cli.command("print", ({ options }) => console.log(options.age), { requires: ["age"] });
        cliRun.mockImplementation(() => console.log("10"));

        expect(cli.run(argv)).toBeUndefined();
        expect(consoleLog).toHaveBeenCalledWith("10");
        expect(cliRun).toHaveBeenCalledWith(argv);

        cliRun.mockReset();
        consoleLog.mockReset();
    });

    it("runs a command with one argument", () => {
        argv = ["name", "Ned"];

        cli.command("name", ({ args }) => console.log(args.name), { arguments: 1 });
        cliRun.mockImplementation(() => console.log("Ned"));

        expect(cli.run(argv)).toBeUndefined();
        expect(consoleLog).toHaveBeenCalledWith("Ned");
        expect(cliRun).toHaveBeenCalledWith(argv);

        cliRun.mockReset();
        consoleLog.mockReset();
    });
});