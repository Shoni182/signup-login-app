import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import { User } from '../models/user.js';

//: Register User
export const signupUser = async (req, res) => {
  const { email, password } = req.body;

  // Check if a user exist
  const existingUser = await User.findOne({ email });

  // Checking email
  if (existingUser) {
    throw createHttpError(400, 'Email in use!');
  }

  //! hash password using bcrypt
  const hashedPassword = await bcrypt.hash(password, 10);

  // create new a user
  const newUser = await User.create({
    email,
    password: hashedPassword,
  });

  // Віправлення данних користувача (без паролю) у відповідь
  res.status(201).json(newUser);
};

//: Login use

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Пошук юзера
  const user = await User.findOne({ email });
  // Перевірка

  if (!user) {
    throw createHttpError(401, 'No such user');
  }
  // Перевірка хеші паролів

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    throw createHttpError(401, '');
  }
  // Видаляємо стару версію користувача ----
  // Створюємо нову сессію
  // Викликаємо, передаємо обʼєкт відповіді та сессію

  res.status(200).json(user);
};
//! Logout User
