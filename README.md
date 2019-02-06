# Kumander (Alpha)
Simple, Express-style CLI builder for Node. Let's you create CLI programs whether in Typescript or in Javascript with no additional dependencies.

## Install
### NPM
```bash
$ npm install --save https://github.com/nedpals/kumander.git#v0.0.2
```
### Yarn
```bash
$ yarn add https://github.com/nedpals/kumander.git#v0.0.2
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
// Adds "yolo" option
cli.addOption("yolo", () => {
    console.log("You only live once.");
}, {
    description: "Prints the meaning of YOLO.",
    asCommand: true // treats the option as a command.
})

// Adds "name" option
cli.addOption("name", (value) => {
    return value;
}, {
    description: "Name option", // Describe the name option
    shorthand: "N" // Shortcut for the option ("-N")
});

cli.addCommand("print", ({ options }) => {
    console.log(`Hello + ${options.name}`);
}, {
    requires: "name", // Checks if "name" option is present
    description: "Prints a name" // Describe the command
});

cli.run(process.argv.slice(2)); // Runs the CLI with the ARGV array;
```
- Run the program
```bash
$ node test.js print --name=Joe
Hello Joe

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
It auto-generates the list everytime you add a command or option.
```
$ node test.js --help
My CLI app
Just a normal command line program

Usage: my_cli app [options]

Options:

--version                     Display CLI version
--yolo                        Prints the meaning of YOLO.
--name                        Name option
--help                        Displays the list of commands and options
-N                            Shortcut of 'name'
-v                            Shortcut of 'version'
-h                            Shortcut of 'help'

Commands:

print                         Prints a name
```

## Development 
### Build
Kumander is written on [Typescript](https://typescriptlang.org) from the ground-up and must install the `tsc` compiler first before you start building this module. After that, you can start building it by executing:
```bash
$ tsc --project ./tsconfig.json
```

### Roadmap
- [ ] Command argument support
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