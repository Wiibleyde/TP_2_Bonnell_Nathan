import * as UserModel from '../models/user.model.ts';
import { sendSuccess, sendError } from '../views/response.ts';
import type { Request, Response, NextFunction } from 'express';

export const getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { role } = req.query;
        const rawPage = req.query['page'];
        const rawLimit = req.query['limit'];
        const rawSearch = req.query['search'];

        const page = rawPage !== undefined ? Number(rawPage) : 1;
        const limit = rawLimit !== undefined ? Number(rawLimit) : 10;
        const search = typeof rawSearch === 'string' && rawSearch.trim() !== ''
            ? rawSearch.trim()
            : undefined;

        if (!Number.isInteger(page) || page < 1) {
            sendError(res, 400, 'page must be a positive integer');
            return;
        }

        if (!Number.isInteger(limit) || limit < 1) {
            sendError(res, 400, 'limit must be a positive integer');
            return;
        }

        if (rawSearch !== undefined && typeof rawSearch !== 'string') {
            sendError(res, 400, 'search must be a string');
            return;
        }

        if (role !== undefined && !UserModel.isValidRole(role)) {
            sendError(res, 400, "role must be 'admin' or 'user'");
            return;
        }

        const result = await UserModel.findAllPaginated(
            page,
            limit,
            role as User['role'] | undefined,
            search
        );
        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
};

export const getUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = req.params['_id'] as string;

        const user = await UserModel.findById(userId);

        if (user) {
            sendSuccess(res, 200, user);
        } else {
            sendError(res, 404, 'User not found');
        }
    } catch (err) {
        next(err);
    }
};

export const createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { name, email, role } = req.body ?? {};

        if (!name || !email || !role) {
            sendError(res, 400, 'name, email and role are required');
            return;
        }

        if (!UserModel.isValidRole(role)) {
            sendError(res, 400, "role must be 'admin' or 'user'");
            return;
        }

        if (await UserModel.emailExists(email)) {
            sendError(res, 409, 'Email already in use');
            return;
        }

        const newUser = await UserModel.create({ name, email, role });
        sendSuccess(res, 201, newUser, { message: 'User created successfully' });
    } catch (err) {
        next(err);
    }
};

export const updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = req.params['_id'] as string;
        const { name, email, role } = req.body ?? {};

        if (role !== undefined && !UserModel.isValidRole(role)) {
            sendError(res, 400, "role must be 'admin' or 'user'");
            return;
        }

        if (email !== undefined && await UserModel.emailExists(email, userId)) {
            sendError(res, 409, 'Email already in use');
            return;
        }

        const user = await UserModel.update(userId, { name, email, role });

        if (user) {
            sendSuccess(res, 200, user, { message: 'User updated successfully' });
        } else {
            sendError(res, 404, 'User not found');
        }
    } catch (err) {
        next(err);
    }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = req.params['_id'] as string;

        const deleted = await UserModel.remove(userId);

        if (deleted) {
            res.status(204).send();
        } else {
            sendError(res, 404, 'User not found');
        }
    } catch (err) {
        next(err);
    }
};
