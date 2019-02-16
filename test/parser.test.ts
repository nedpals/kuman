import { parseArgs as parse } from "../src/parser";
 
test('parse argv', () => {
    expect(parse(["test", "--hello=world", "-F", "hey", "unkn"]))
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
    expect(parse(["--hello"]))
        .toEqual({
            command: undefined,
            options: {
                hello: ''
            },
            unknown: []
        })
});

test('parse options with equals', () => {
    expect(parse(["--hello=world"]))
        .toEqual({
            command: undefined,
            options: {
                hello: "world"
            },
            unknown: []
        })
});

test('parse options without equals', () => {
    expect(parse(["--hello", "world", "-F", "24", "--foo", "bar,net,que"]))
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
    expect(parse(["--hello=world,foo,bar"]))
        .toEqual({
            command: undefined,
            options: {
                hello: ["world", "foo", "bar"]
            },
            unknown: []
        })
});