import type express from 'express';
import * as UserModel from '../models/user.model.ts';
import { sendSuccess, sendError } from '../views/response.ts';
import type { Request, Response } from 'express';

export const getUsers = async (req: Request, res: Response): Promise<void> => {
    const { role } = req.query;

    if (role !== undefined && !UserModel.isValidRole(role)) {
        sendError(res, 400, "role must be 'admin' or 'user'");
        return;
    }

    const filtered = await UserModel.findAll(role as User['role'] | undefined);
    sendSuccess(res, 200, filtered, { count: filtered.length });
};

export const getUserById = async (req: Request, res: Response): Promise<void> => {
    const userId = req.params['_id'] as string;

    const user = await UserModel.findById(userId);

    if (user) {
        sendSuccess(res, 200, user);
    } else {
        sendError(res, 404, 'User not found');
    }
};

export const createUser = async (req: Request, res: Response): Promise<void> => {
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
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
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
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    const userId = req.params['_id'] as string;

    const deleted = await UserModel.remove(userId);

    if (deleted) {
        res.status(204).send();
    } else {
        sendError(res, 404, 'User not found');
    }
};
