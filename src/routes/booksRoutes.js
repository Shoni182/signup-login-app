import { Router } from 'express';
import { celebrate } from 'celebrate';
import {
  bookIdSchema,
  getAllBooksSchema,
  createBookSchema,
  updateBookSchema,
} from '../validation/booksValidation';

import {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} from '../controllers/booksController';

const router = Router();

// : Get all books (GET)
router.get('/books', celebrate(getAllBooksSchema), getAllBooks);

// : Get book by Id (GET)
router.get('/books/:id', celebrate(bookIdSchema), getBookById);

// : Create new book (POST)
router.post('/books', celebrate(createBookSchema), createBook);

// : Update a book (PATCH)
router.patch('/books/:id', celebrate(updateBookSchema), updateBook);
// : Delete a book (DETELE)
router.delete('/books/:id', celebrate(bookIdSchema), deleteBook);

export default router;
