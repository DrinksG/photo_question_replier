import { CustomError, CustomErrorObject } from './CustomError';

export class NotFoundError extends CustomError {
    statusCode = 404;

    constructor() {
        super('Route not found')

        Object.setPrototypeOf(this, NotFoundError.prototype)
    }

    serializeErrors(): CustomErrorObject[] {
        return [{
            message: 'Not found'
        }]
    }

}