import { Joi, Segments } from 'celebrate';

// Book id shcema
export const bookIdSchema = {
  [Segments.PARAMS]: Joi.object({
    id: Joi.string().required(),
  }),
};

// Get all books (GET)
export const getAllBooksSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(5).max(20).default(10),
  }),
};

// Create new book (POST)
export const createBookSchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().required().min(1).messages({
      'string.base': 'Name must be a string',
      'string.min': 'Name should have at least 1 characters',
      'any.required': 'Name is required',
    }),
    author: Joi.string().required().messages({
      'string.base': 'Author name must be a string',
      'any.required': 'Author is required',
    }),
    pageCount: Joi.number().messages({
      'number.base': 'Page count must be a number',
    }),
  }),
};

// Update a book (PATCH)
export const updateBookSchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(1).messages({
      'string.base': 'Name must be a string',
      'string.min': 'Name should have at least 1 characters',
    }),
    author: Joi.string().messages({
      'string.base': 'Author name must be a string',
    }),
    pageCount: Joi.number().messages({
      'number.base': 'Page count must be a number',
    }),
  })
    .min(1)
    .messages({
      'object.min': 'At least one field must be provided to update',
    }),
};
