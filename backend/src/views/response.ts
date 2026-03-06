import type express from 'express';

type ApiSuccessResponse<T> = {
    success: true;
    data: T;
    count?: number;
    message?: string;
};

type ApiErrorResponse = {
    success: false;
    message: string;
};

export const sendSuccess = <T>(
    res: express.Response,
    statusCode: number,
    data: T,
    options?: { count?: number; message?: string }
) => {
    const response: ApiSuccessResponse<T> = {
        success: true,
        data,
        ...(options?.count !== undefined ? { count: options.count } : {}),
        ...(options?.message ? { message: options.message } : {})
    };
    return res.status(statusCode).json(response);
};

export const sendError = (res: express.Response, statusCode: number, message: string) => {
    const response: ApiErrorResponse = {
        success: false,
        message
    };
    return res.status(statusCode).json(response);
};
