export interface CLIErrorObject {
    message: string;
    code?: string;
    showStackTrace?: boolean;
    throw?: boolean;
}
export default function throwError(errObj: CLIErrorObject, cb?: (err: Error) => void): void;
