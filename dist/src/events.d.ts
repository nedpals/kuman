/// <reference types="node" />
import { EventEmitter } from "events";
declare type CLIEvent = "init" | "destroy" | "log" | "showHelp" | "showVersion" | "error";
declare const emitter: EventEmitter;
declare function on(eventName: CLIEvent, listener: (args: any) => void): void;
declare function emit(eventName: CLIEvent): void;
export { on, emit, emitter };
