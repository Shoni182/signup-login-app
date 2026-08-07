import { Router } from 'express';
import { celebrate } from 'celebrate';
import { registerUser } from '../controllers/authController.js';
import { registerUserSchema } from '../validation/authValidation.js';

const router = Router();

router.post('/auth/register', celebrate(registerUserSchema), registerUser);

export default router;
