import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import { User } from '../models/user.js';

//: SignUp a user
export const signupUser = async (req, res) => {
  const { email, password } = req.body;

  // Check if a user exist
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw createHttpError(400, 'Email in use!');
  }

  // Hash password using bcrypt
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new a user
  const newUser = await User.create({
    email,
    password: hashedPassword,
  });

  // Віправлення данних користувача (без паролю) у відповідь
  res.status(201).json(newUser);
};

//: Login a user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Search an user
  const userQuery = await User.findOne({ email });

  if (!userQuery) {
    throw createHttpError(401, 'No such user');
  }

  // Check password
  const isValidPassword = await bcrypt.compare(password, userQuery.password);
  if (!isValidPassword) {
    throw createHttpError(401, '');
  }
  // Видаляємо стару версію користувача ----
  // Створюємо нову сессію
  // Викликаємо, передаємо обʼєкт відповіді та сессію

  res.status(200).json(userQuery);
};
//! Logout User
