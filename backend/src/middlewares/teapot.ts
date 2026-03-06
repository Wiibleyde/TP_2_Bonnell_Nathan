import type express from 'express';

export const teapot = (req: express.Request, res: express.Response, next: express.NextFunction): void => {
    if ('teapot' in req.query) {
        res.status(418).json({
            success: false,
            message: "I'm a teapot ☕",
            hint: "RFC 2324 - Hyper Text Coffee Pot Control Protocol",
        });
        return;
    }
    next();
};
