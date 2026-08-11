import { Router } from 'express';
import { celebrate } from 'celebrate';
import { loginUser, signupUser } from '../controllers/authController.js';
import {
  loginUserSchema,
  signupUserSchema,
} from '../validation/authValidation.js';

const router = Router();

router.post('/signup', celebrate(signupUserSchema), signupUser);
router.post('/login', celebrate(loginUserSchema), loginUser);

export default router;
