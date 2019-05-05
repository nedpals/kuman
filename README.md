# Kuman (Alpha)
Simple, Express-style CLI framework for Node. Create CLI programs written in Typescript or in Javascript with no additional dependencies.

<!-- ### Visit the new docs [here](https://nedpals.gitbook.io/kuman/). -->

## Install
### NPM
```bash
$ npm install --save kuman@0.0.6
```
### Yarn
```bash
$ yarn add kuman@0.0.6
```

## Usage
- Import first the module
```javascript
// For Typescript
import { CLI } from "kuman";
const cli = CLI();

// For NodeJS
const kuman = require("kuman/dist/kuman");
const cli = kuman.CLI();
```
- Start using it by adding commands and options.
```javascript
// Adds "yolo" option
cli.option("yolo", () => {
    console.log("You only live once.");
}, {
    description: "Prints the meaning of YOLO.",
    asCommand: true // treats the option as a command.
})

// Adds "name" option
cli.option("age", (value) => {
    return value;
}, {
    description: "Age option", // Describe the name option
    shorthand: ["A"] // Shortcut for the option ("-A")
});

cli.command("print", ({ options, _args }) => {
    console.log(`Hello my name is ${_args[0]}`);
    if (options.age) {
        console.log(`I'm ${options.age} years old.`)
    }
}, {
    arguments: 1, // Defines how many arguments to be used.
    description: "Prints a name" // Describe the command
});

cli.run(process.argv.slice(2)); // Runs the CLI with the ARGV array;
```
- Run the program
```bash
$ node test.js print Joe --age=20
Hello my name is Joe
I\'m 20 years old.

$ node test.js --yolo
You only live once.
```

### Events (new in 0.0.6)
Events is a new feature in Kuman in which you can trigger certain events everytime your CLI app will launch, display version, and etc. It replaces the `get()` and `set()` functions that manipulate few instance settings and values like `cli_version` and `cli_name`.

```javascript
// This outputs the following information when you type `--help` 
cli.on("showHelp", () => {
    console.log("My App");
    console.log("This is a sample CLI app");
    console.log("\nUsage: my_app [options]");
});

// This event triggers when you check the version of your CLI app.
cli.on("showVersion", () => {
    console.log("1.0");
});
```


### `--help` Generation
Kuman can auto-generate the list everytime you add a command or option.
```
$ node test.js --help
My CLI app
Just a normal command line program

Usage: my_cli app [options]

OPTIONS:

--yolo, -A                    Prints the meaning of YOLO.
--debug, -D                   Debug information
--age, -h                     Age option
--version, -v                 Displays CLI version
--help                        Displays the list of commands and options

COMMANDS:

print                         Prints a name
```

## Development 
### Build
Kuman is written on [Typescript](https://typescriptlang.org) from the ground-up and must install the `tsc` compiler first before you start building this module. After that, you can start building it by executing:
```bash
$ npm build-dev
```

### Roadmap
- [x] Command argument support
- [x] Shorthand option support
- [ ] Middleware / Plugin Support(?)
- [x] JSDoc comments
- [x] `--help` generation
- [ ] Error handling
- [x] Tests

### Contribute
1. Fork / Clone this repo. (`git clone https://github.com/nedpals/kuman.git`)
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request

## Copyright
- &copy; 2018-2019 Ned Palacios (nedpals)