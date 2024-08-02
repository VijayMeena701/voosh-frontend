import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ApiError } from '../utils/ApiError';



// Handle errors
export const errorHandler = (err: ApiError, req: Request, res: Response, next: NextFunction): void => {
    const { statusCode, message } = err;

    res.status(statusCode).json({ status: 'error', statusCode, message });
};


// Convert Error to ApiError, if needed
export const errorConverter = (err: any, req: Request, res: Response, next: NextFunction): void => {
    let error = err;

    if (!(error instanceof ApiError)) {
        const statusCode = (error.statusCode as StatusCodes) || StatusCodes.INTERNAL_SERVER_ERROR;
        const message = error.message || StatusCodes[statusCode];
        error = new ApiError(statusCode, message);
    }
    next(error);
};


export default { errorConverter, errorHandler };
