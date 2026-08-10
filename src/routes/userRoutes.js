import { Router } from 'express';
import { celebrate } from 'celebrate';
import {
  createUserSchema,
  getAllUsersSchema,
  getUserByIdSchema,
  updateUserSchema,
} from '../validation/userValidation.js';

import {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
} from '../controllers/userController.js';

const router = Router();

// Admin role:
router.get('/users', celebrate(getAllUsersSchema), getAllUsers);
router.post('/users', celebrate(createUserSchema), createUser);

router.get('/users/:userId', celebrate(getUserByIdSchema), getUserById);
router.patch('/users/:userId', celebrate(updateUserSchema), updateUser);
router.detele('/users/:userId', celebrate(getUserByIdSchema), deleteUser);

export default router;

// /users - get list of users, create user (GET, POST)
// /users/:id - get user by id, edit or delete user (GET, PUT/PATCH, DELETE)
