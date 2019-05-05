import parseArgv from "../src/parser";
 
describe("parse argv array", () => {
    test("just parse", () => {
        expect(parseArgv(["test", "--hello=world", "-F", "hey", "unkn"]))
            .toEqual({
                command: "test",
                options: {
                    hello: "world",
                    F: "hey"
                },
                unknown: ["unkn"]
            });
    });
    
    test("parsing it without command", () => {
        expect(parseArgv(["--hello"]))
            .toEqual({
                command: undefined,
                options: {
                    hello: ''
                },
                unknown: []
            })
    });
    
    test("parsing option value with equals", () => {
        expect(parseArgv(["--hello=world"]))
            .toEqual({
                command: undefined,
                options: {
                    hello: "world"
                },
                unknown: []
            })
    });
    
    test("parsing set of option values without equals", () => {
        expect(parseArgv(["--hello", "world", "-F", "24", "--foo", "bar,net,que"]))
            .toEqual({
                command: undefined,
                options: {
                    hello: "world",
                    F: "24",
                    foo: ["bar", "net", "que"]
                },
                unknown: []
            })
    });
    
    test("parsing comma-separated option value into an array of values", () => {
        expect(parseArgv(["--hello=world,foo,bar"]))
            .toEqual({
                command: undefined,
                options: {
                    hello: ["world", "foo", "bar"]
                },
                unknown: []
            })
    });
});