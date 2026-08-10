import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';

// : Create a new User
export const createUserSchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    role: Joi.string().default('user').required(),
  }),
};

// : Get all users
export const getAllUsersSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(5).max(20).default(10),
  }),
};

// : Get a user by ID
export const getUserByIdSchema = {
  [Segments.PARAMS]: Joi.object({
    _id: Joi.string().custom(isValidObjectId).required(),
  }),
};

// : Update a user
export const updateUserSchema = {
  [Segments.PARAMS]: Joi.object({
    name: Joi.string().required(),
    _id: Joi.string().custom(isValidObjectId).required(),
    role: Joi.string().valid('user', 'admin').optional(),
  }),

  [Segments.BODY]: Joi.object({}),
};
