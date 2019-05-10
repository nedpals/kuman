import { emit, emitter } from "./event";

export interface CLIErrorObject {
    message: string,
    code?: string,
    showStackTrace?: boolean,
    throw?: boolean
}

export default function throwError(errObj: CLIErrorObject, cb?: (err: Error) => void) {
    const newError = () => {
        const err = new Error(errObj.message);
        err.name = errObj.code || "ERR_CLI";

        if (errObj.showStackTrace) {
            Error.captureStackTrace(err, throwError);
        } else {
            err.stack = "";
        }

        return err;
    };

    if (typeof cb !== "undefined")
        cb(newError());

    if (emitter.eventNames().includes("error"))
        emit("error", newError());

    if (errObj.throw)
        throw newError();
}