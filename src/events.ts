import { EventEmitter } from "events";

type CLIEvent = "init" | "destroy" | "log" | "showHelp" | "showVersion" | "error";

const emitter = new EventEmitter();

function on(eventName: CLIEvent, listener: (args: any) => void) {
    emitter.on(eventName, listener);
}

function emit(eventName: CLIEvent) {
    emitter.emit(eventName);
}

export {
    on,
    emit,
    emitter
};