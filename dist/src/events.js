"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
const emitter = new events_1.EventEmitter();
exports.emitter = emitter;
function on(eventName, listener) {
    emitter.on(eventName, listener);
}
exports.on = on;
function emit(eventName) {
    emitter.emit(eventName);
}
exports.emit = emit;
