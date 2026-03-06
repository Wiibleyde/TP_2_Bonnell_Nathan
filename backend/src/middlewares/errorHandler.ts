import type express from 'express';
import { sendError } from '../views/response.ts';

export const errorHandler = (err: unknown, req: express.Request, res: express.Response, next: express.NextFunction): void => {
    if (err instanceof SyntaxError && 'body' in err) {
        sendError(res, 400, 'Invalid JSON body');
        return;
    }

    if (
        typeof err === 'object' &&
        err !== null &&
        (
            ('status' in err && (err as { status: unknown }).status === 404) ||
            ('statusCode' in err && (err as { statusCode: unknown }).statusCode === 404)
        )
    ) {
        sendError(res, 404, 'Not found');
        return;
    }

    if (typeof err === 'object' && err !== null && 'name' in err && (err as { name: unknown }).name === 'CastError') {
        sendError(res, 404, 'User not found');
        return;
    }

    if (typeof err === 'object' && err !== null && 'name' in err && (err as { name: unknown }).name === 'ValidationError') {
        sendError(res, 400, 'Validation error');
        return;
    }

    if (typeof err === 'object' && err !== null && 'code' in err && (err as { code: unknown }).code === 11000) {
        sendError(res, 409, 'Conflict');
        return;
    }

    sendError(res, 500, 'Internal server error');
};
