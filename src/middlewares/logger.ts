import type express from 'express';

export const logger = (req: express.Request, res: express.Response, next: express.NextFunction): void => {
    const start = Date.now();
    res.on('finish', () => {
        const duration = Date.now() - start;
        const timestamp = new Date().toISOString().replace('T', ' ').slice(0, 19);
        console.log(`[${timestamp}] ${req.method} ${req.url} - ${res.statusCode} - ${duration}ms`);
    });
    next();
};
