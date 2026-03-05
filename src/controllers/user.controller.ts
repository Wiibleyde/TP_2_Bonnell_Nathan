import type express from 'express';
import * as UserModel from '../models/user.model.ts';
import { sendSuccess, sendError } from '../views/response.ts';

const parseUserId = (id: string): number | null => {
    const parsed = Number.parseInt(id, 10);
    return Number.isNaN(parsed) ? null : parsed;
};

export const getUsers = (req: express.Request, res: express.Response): void => {
    const { role } = req.query;

    if (role !== undefined && !UserModel.isValidRole(role)) {
        sendError(res, 400, "role must be 'admin' or 'user'");
        return;
    }

    const filtered = UserModel.findAll(role as User['role'] | undefined);
    sendSuccess(res, 200, filtered, { count: filtered.length });
};

export const getUserById = (req: express.Request, res: express.Response): void => {
    const userId = parseUserId(req.params['id'] as string);

    if (userId === null) {
        sendError(res, 400, 'Invalid user id');
        return;
    }

    const user = UserModel.findById(userId);

    if (user) {
        sendSuccess(res, 200, user);
    } else {
        sendError(res, 404, 'User not found');
    }
};

export const createUser = (req: express.Request, res: express.Response): void => {
    const { name, email, role } = req.body ?? {};

    if (!name || !email || !role) {
        sendError(res, 400, 'name, email and role are required');
        return;
    }

    if (!UserModel.isValidRole(role)) {
        sendError(res, 400, "role must be 'admin' or 'user'");
        return;
    }

    if (UserModel.emailExists(email)) {
        sendError(res, 409, 'Email already in use');
        return;
    }

    const newUser = UserModel.create({ name, email, role });
    sendSuccess(res, 201, newUser, { message: 'User created successfully' });
};

export const updateUser = (req: express.Request, res: express.Response): void => {
    const userId = parseUserId(req.params['id'] as string);

    if (userId === null) {
        sendError(res, 400, 'Invalid user id');
        return;
    }

    const { name, email, role } = req.body ?? {};

    if (role !== undefined && !UserModel.isValidRole(role)) {
        sendError(res, 400, "role must be 'admin' or 'user'");
        return;
    }

    if (email !== undefined && UserModel.emailExists(email, userId)) {
        sendError(res, 409, 'Email already in use');
        return;
    }

    const user = UserModel.update(userId, { name, email, role });

    if (user) {
        sendSuccess(res, 200, user, { message: 'User updated successfully' });
    } else {
        sendError(res, 404, 'User not found');
    }
};

export const deleteUser = (req: express.Request, res: express.Response): void => {
    const userId = parseUserId(req.params['id'] as string);

    if (userId === null) {
        sendError(res, 400, 'Invalid user id');
        return;
    }

    const deleted = UserModel.remove(userId);

    if (deleted) {
        res.status(204).send();
    } else {
        sendError(res, 404, 'User not found');
    }
};
