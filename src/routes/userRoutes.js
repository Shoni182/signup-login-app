import { Router } from 'express';
import { celebrate } from 'celebrate';
import { authorize } from '../middleware/authorize.js';
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

// Admin role
router.use(authorize(['admin']));

router.get('/users', celebrate(getAllUsersSchema), getAllUsers);
router.get('/users/:id', celebrate(getUserByIdSchema), getUserById);

router.post('/users', celebrate(createUserSchema), createUser);
router.patch('/users/:id', celebrate(updateUserSchema), updateUser);
router.delete('/users/:id', celebrate(getUserByIdSchema), deleteUser);

export default router;
