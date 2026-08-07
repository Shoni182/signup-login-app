import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import { User } from '../models/user.js';

//: Register User
export const registerUser = async (req, res) => {
  const { email, password } = req.body;

  // Check if a user exist
  const existingUser = await User.findOne({ email });

  // Checking email
  if (existingUser) {
    throw createHttpError(400, 'Email in use!');
  }

  // hash password using bcrypt
  const hashedPassword = await bcrypt.hash(password, 10);

  // create new a user
  const newUser = await User.create({
    email,
    password: hashedPassword,
  });

  // Віправлення данних користувача (без паролю) у відповідь
  res.status(201).json(newUser);
};
