import parseArgv from "../src/parser";
 
test('parse argv', () => {
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

test('parse argv without command', () => {
    expect(parseArgv(["--hello"]))
        .toEqual({
            command: undefined,
            options: {
                hello: ''
            },
            unknown: []
        })
});

test('parse options with equals', () => {
    expect(parseArgv(["--hello=world"]))
        .toEqual({
            command: undefined,
            options: {
                hello: "world"
            },
            unknown: []
        })
});

test('parse options without equals', () => {
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

test('parse options with an array of values', () => {
    expect(parseArgv(["--hello=world,foo,bar"]))
        .toEqual({
            command: undefined,
            options: {
                hello: ["world", "foo", "bar"]
            },
            unknown: []
        })
});