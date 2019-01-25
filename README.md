# Kumander (Alpha)
Simple, Express-style CLI builder for Node. Let's you create CLI programs whether in Typescript or in Javascript. No dependencies required.

## Install
### NPM
```bash
$ npm install --save https://github.com/nedpals/kumander.git
```
### Yarn
```bash
$ yarn add https://github.com/nedpals/kumander.git
```

## Usage
### Typescript
```typescript
import { CLI } from "kumander";
const cli = CLI();

cli.addOption("name", (value) => {
    return value;
});

cli.addCommand("print", (args) => {
    console.log(`Hello + ${args.options.name}`);
});

cli.run(process.argv.slice(2));
```

### Plain Javascript

```javascript
const kumander = require("kumander");
const cli = kumander.CLI();

cli.addOption("name", (value) => {
    return value;
});

cli.addCommand("print", (args) => {
    console.log(`Hello + ${args.options.name}`);
});

cli.run(process.argv.slice(2));
```

## Development 
### Build
You must install [Typescript](https://typescriptlang.org) first before you start building this module. After that, you can start building it by executing:
```bash
$ tsc --project ./tsconfig.json
```

### Roadmap
- [x] Shorthand option support
- [ ] Middleware / Plugin Support(?)
- [x] JSDoc comments
- [x] `--help` generation
- [x] Error handling
- [ ] Tests

### Contribute
1. Fork / Clone this repo. (`git clone https://github.com/nedpals/kumander.git`)
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request

## Copyright
- &copy; 2018 Ned Palacios (nedpals)