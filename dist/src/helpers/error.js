"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const event_1 = require("./event");
function throwError(errObj, cb) {
    const newError = () => {
        const err = new Error(errObj.message);
        err.name = errObj.code || "ERR_CLI";
        if (errObj.showStackTrace) {
            Error.captureStackTrace(err, throwError);
        }
        else {
            err.stack = "";
        }
        return err;
    };
    if (typeof cb !== "undefined")
        cb(newError());
    if (event_1.emitter.eventNames().includes("error"))
        event_1.emit("error", newError());
    if (errObj.throw)
        throw newError();
}
exports.default = throwError;
