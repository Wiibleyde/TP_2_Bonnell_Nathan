import type express from 'express';
import { sendError } from '../views/response.ts';

export const errorHandler = (err: unknown, req: express.Request, res: express.Response, next: express.NextFunction): void => {
    if (err instanceof SyntaxError && 'body' in err) {
        sendError(res, 400, 'Invalid JSON body');
        return;
    }

    next(err);
};
