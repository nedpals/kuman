# Kuman Documentation
> Current version: `0.0.6`

Table of contents:
- [Kuman.CLI](#Kuman.CLI)
    - [cli.command](#cli.command)
    - [cli.emit](#cli.emit)
    - [cli.on](#cli.on)
    - [cli.option](#cli.option)
    - [cli.run](#cli.run)
    - [cli.state](#cli.state)

## `Kuman.CLI()`
Returns a new instance of the CLI.

## `cli.command`
Creates a new command for the CLI.
```js
cli.command("hello", ({ args }) => {
    const name = args[0];

    console.log(`Hello ${name}!`);
}, {
    arguments: 1,
    description: "Prints a name with age.",
    shorthand: "h",
    requires: ["age"]
})
```

| Parameter |  Type  | Description |
|-----------|--------|-------------|
|name       |`string`| Name of the command.|
|cb         |`function`| The function the CLI will use to perform/run the task.|
|options    |`object`| Command options.|

options object:

| Option  |   Type  | Default | Description |
|---------|---------|---------|-------------|
|arguments|`integer`|0|Number of arguments the command will use. |
|description|`string`|none|Description for the command. Useful if you are showing the information on the `help` screen.|
|shorthand|`string`|none|Shortcut/alternate name for the command.|
|requires|`Array<string>`|none| Options that are required to perform the command. If none of the options are used, CLI will print an error.|

## `cli.emit`
Emits/triggers a specific event registered from the list of event listeners.
```js
cli.emit("showVersion");
```

| Parameter |  Type  | Description |
|-----------|--------|-------------|
|name       |`string`| Name of the event.|


## `cli.on`
Adds a new event listener.
```js
cli.on("showVersion", () => {
    console.log("1.0");
});
```

| Parameter |  Type  | Description |
|-----------|--------|-------------|
|name       |`string`| Name of the event. Available events: `"init" | "showHelp" | "showVersion" | "error"`|
|cb         |`function`| The function the event listener will use to perform/run the task.|

### `init`
Triggers before the CLI starts.

### `destroy`
Triggers when the CLI's process is terminated.

### `showHelp`
Triggers when the user executes the `--help` screen.

### `showVersion`
Triggers when the user executes the `--version` screen.

### `error`
Triggers when the CLI emits an error. 

You can trigger specific functions based on the error codes. For example:
```js
cli.on("error", (err) => {
    // If the specific command was not found.
    if (err.code === "CLI_ERR_CMD_NOT_FOUND") {
        console.log("Oopsie!");
    }
});
```
#### Error codes
|code|description|
|----|-----------|
|`CLI_ERR_CMD_NOT_FOUND`|Command not found.|
|`CLI_ERR_MISSING_OPTION`|Missing option required for the specific command.|
|`CLI_ERR_MISSING_ARGS`|Missing command arguments.|
|`CLI_ERR_NO_ARGS`|No arguments input from the ARGV array.|


## `cli.option`
Creates a new option for the CLI.
```js
cli.option("yolo", (value) => {
    console.log("You only live once.");
}, {
    description: "Prints the meaning of YOLO.",
    asCommand: true,
    shorthand: "y"
})
```

| Parameter |  Type  | Description |
|-----------|--------|-------------|
|name       |`string`| Name of the option.|
|cb         |`function`| The function the CLI will use to perform/run the task.|
|options    |`object`| Command options.|

options object:

| Option  |   Type  | Default | Description |
|---------|---------|---------|-------------|
|description|`string`|none|Description for the command. Useful if you are showing the information on the `help` screen.|
|shorthand|`string`|none|Shortcut/alternate name for the command.|
|asCommand|`boolean`|false|Makes the option perform/behave like a CLI command.|

## `cli.run`
Runs the command-line application.

```js
cli.run(process.argv.splice(2));
```

| Parameter |  Type  | Description |
|-----------|--------|-------------|
|argv       |`Array<string>`|Array to be used for parsing and executing the CLI|

## `cli.state`
Returns an object with the instance's commands, options, and the parsed arguments from the array.
