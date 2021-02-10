import {CustomError} from "./custom-error";

export class NotFoundError extends CustomError {
    statusCode = 404

    constructor(public message: string) {
        super('Not found');
        Object.setPrototypeOf(this, NotFoundError.prototype)
    }

    serializeErrors() {
        return [{
            message: `${this.message} not found`
        }];
    }
}