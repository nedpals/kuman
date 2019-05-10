import parseArgv from "../src/parser";
 
describe("parse argv array", () => {
    it("parses", () => {
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
    
    it("parses without command", () => {
        expect(parseArgv(["--hello"]))
            .toEqual({
                command: undefined,
                options: {
                    hello: ''
                },
                unknown: []
            })
    });
    
    it("parses option value with equals", () => {
        expect(parseArgv(["--hello=world"]))
            .toEqual({
                command: undefined,
                options: {
                    hello: "world"
                },
                unknown: []
            })
    });
    
    it("parses a set of option values without equals", () => {
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
    
    it("parses comma-separated option values into an array of values", () => {
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