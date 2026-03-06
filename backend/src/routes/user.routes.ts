import { Router } from 'express';
import * as UserController from '../controllers/user.controller.ts';

const router = Router();

router.get('/', UserController.getUsers);
router.get('/:_id', UserController.getUserById);
router.post('/', UserController.createUser);
router.put('/:_id', UserController.updateUser);
router.delete('/:_id', UserController.deleteUser);

export default router;
