import createHttpError from 'http-errors';
import { Book } from '../models/book';

// : Get all books (GET)
export const getAllBooks = async (req, res) => {
  const { page = 1, perPage = 10 } = req.query;

  const skip = (page - 1) * perPage;
  const booksQuery = await Book.find();

  const [totalBooks, books] = await Promise.all([
    booksQuery.clone().countDocuments(),
    booksQuery.skip(skip).limit(perPage),
  ]);

  const totalPages = Math.ceil(totalBooks / perPage);
  res.status(200).json({ page, perPage, totalBooks, totalPages, books });
};
// : Get book by Id (GET)
export const getBookById = async (req, res) => {
  const { _id } = req.params;

  const bookQuery = await Book.findById(_id);

  if (!bookQuery) {
    throw createHttpError(404, 'Book not found');
  }

  res.status(200).json(bookQuery);
};

// : Create new book (POST)
export const createBook = async (req, res) => {
  const note = await Book.create({ ...req.body });
  res.status(201).json(note);
};

// : Update a book (PATCH)
export const updateBook = async (req, res) => {
  const { _id } = req.params;

  const bookQuery = await Book.findOneAndUpdate(
    {
      _id,
    },

    req.body,
    {
      returnDocument: 'after',
    },
  );

  if (!bookQuery) {
    throw createHttpError(404, 'Note not found');
  }

  res.status(200).json(bookQuery);
};

// : Delete a book (DETELE)
export const deleteBook = async (req, res) => {
  const { _id } = req.params;

  const bookQuery = await Book.findOneAndDelete(_id);

  if (!bookQuery) {
    throw createHttpError(404, 'Book not found');
  }

  res.status(200).json(bookQuery);
};
