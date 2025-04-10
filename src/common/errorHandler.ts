import { HttpError } from 'http-errors';
import logger from '../config/logger';
import { NextFunction, Request, Response } from 'express';

export const globalError = (error: HttpError, req: Request, res: Response, _next: NextFunction) => {
    logger.error(error.message);
    const statusCode = error.statusCode || 500;

    res.status(statusCode).json({
        errors: [
            {
                type: error.name,
                msg: error.message,
                path: '',
                location: '',
            },
        ],
    });
};
