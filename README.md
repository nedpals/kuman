# Kumander (Alpha)
Simple, Express-style CLI framework for Node. Create CLI programs written in Typescript or in Javascript with no additional dependencies.

## Install
### NPM
```bash
$ npm install --save kumander@0.0.3
```
### Yarn
```bash
$ yarn add kumander@0.0.3
```

## Usage
- Import first the module
```javascript
// For Typescript
import { CLI } from "kumander/dist/kumander";
const cli = CLI();

// For NodeJS
const kumander = require("kumander/dist/kumander");
const cli = kumander.CLI();
```
- Start using it by adding commands and options.
```javascript
cli.set("name", "My CLI app"); // Add CLI name
cli.set("version", "1.0"); // Add CLI version
cli.set("description", "Just a normal command line program"); // CLI description
cli.set("defaultCommand", "print"); // Add default command to be executed

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
    shorthand: "A" // Shortcut for the option ("-A")
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

### Adding additional info
```javascript
// You must insert them first before you add the commands/options.

cli.set("name", "My CLI app"); // Add CLI name
cli.set("version", "1.0"); // Add CLI version
cli.set("description", "Just a normal command line program"); // CLI description
cli.set("defaultCommand", "print"); // Add default command to be executed
```

### `--help` Generation
Kumander can auto-generate the list everytime you add a command or option.
```
$ node test.js --help
My CLI app
Just a normal command line program

Usage: my_cli app [options]

Options:

--version                     Displays CLI version
--yolo                        Prints the meaning of YOLO.
--help                        Displays the list of commands and options
--age                         Age option
-A                            Shortcut of 'age'
-v                            Shortcut of 'version'
-h                            Shortcut of 'help'

Commands:

print                         Prints a name
```

## Development 
### Build
Kumander is written on [Typescript](https://typescriptlang.org) from the ground-up and must install the `tsc` compiler first before you start building this module. After that, you can start building it by executing:
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
- [ ] Tests

### Contribute
1. Fork / Clone this repo. (`git clone https://github.com/nedpals/kumander.git`)
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request

## Copyright
- &copy; 2018 Ned Palacios (nedpals)