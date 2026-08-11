import { Router } from 'express';
import { celebrate } from 'celebrate';
import { authorize } from '../middleware/authorize.js';
import { authenticate } from '../middleware/authenticate.js';
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
router.use(authenticate, authorize(['admin']));

router.get('/', celebrate(getAllUsersSchema), getAllUsers);
router.get('/:id', celebrate(getUserByIdSchema), getUserById);

router.post('/', celebrate(createUserSchema), createUser);
router.patch('/:id', celebrate(updateUserSchema), updateUser);
router.delete('/:id', celebrate(getUserByIdSchema), deleteUser);

export default router;
