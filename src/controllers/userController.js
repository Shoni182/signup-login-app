import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import { User } from '../models/user';

// : Get /users - admin only
export const getAllUsers = async (req, res) => {
  const { page = 1, perPage = 10 } = req.query;

  const skip = (page - 1) * perPage;
  const usersQuery = await User.find();

  const [totalUsers, users] = await Promise.all([
    usersQuery.clone().countDocuments(),
    usersQuery.skip(skip).limit(perPage),
  ]);

  const totalPages = Math.ceil(totalUsers / perPage);
  res.status(200).json({ page, perPage, totalUsers, totalPages, users });
};

// : Get user by id - admin only
export const getUserById = async (req, res) => {
  const { _id } = req.params;

  const userQuery = await User.findById(_id);

  if (!userQuery) {
    throw createHttpError(404, 'User not found');
  }

  res.status(200).json(userQuery);
};

// : Create an user
export const createUser = async (req, res) => {
  const { email, password, name, role } = req.body;

  // Check if a user exist
  const existingUser = await User.findOne({ email });

  // Checking email
  if (existingUser) {
    throw createHttpError(409, 'Email in use!');
  }

  // Hash password using bcrypt
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new a user
  const newUser = await User.create({
    email,
    password: hashedPassword,
    name,
    role: role || 'user',
  });

  res.status(201).json(newUser);
};

// : Update an user
export const updateUser = async (req, res) => {
  const { _id } = req.params;
  const { name, email, role } = req.body;

  // Check if a email is free to use
  if (email) {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw createHttpError(409, 'Email in use!');
    }
  }

  // Check if user(admin) is allow to update a user
  if (role) {
    if (req.user.role !== 'admin') {
      throw createHttpError(403, 'Only admin can change user roles');
    }
  }

  if (req.body._id.toString() === _id && role !== 'admin') {
    throw createHttpError(403, 'Cannot downgrade your own admin role');
  }

  const updateData = {};
  if (name) updateData.name = name;
  if (email) updateData.email = email;
  if (role && req.user.role === 'admin') updateData.role = role;

  const user = await User.findOneAndUpdate({ _id }, updateData, {
    returnDocument: 'after',
  });

  if (!user) {
    throw createHttpError(404, 'Note not found');
  }

  res.status(200).json(user);
};

// : Delete an user
export const deleteUser = async (req, res) => {
  const { _id } = req.params;

  const userQuery = await User.findOneAndDelete(_id);

  if (!userQuery) {
    throw createHttpError(404, 'User not found');
  }

  res.status(200).json(userQuery);
};
