import { Router } from 'express';
import { celebrate } from 'celebrate';
import { authorize } from '../middleware/authorize.js';

import {
  bookIdSchema,
  getAllBooksSchema,
  createBookSchema,
  updateBookSchema,
} from '../validation/bookValidation.js';

import {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} from '../controllers/booksController.js';
import { authenticate } from '../middleware/authenticate.js';

const router = Router();

router.use(authenticate);

router.get('/books', celebrate(getAllBooksSchema), getAllBooks);
router.get('/books/:id', celebrate(bookIdSchema), getBookById);

router.post(
  '/books',
  authorize(['admin']),
  celebrate(createBookSchema),
  createBook,
);
router.patch(
  '/books/:id',
  authorize(['admin']),
  celebrate(updateBookSchema),
  updateBook,
);
router.delete(
  '/books/:id',
  authorize(['admin']),
  celebrate(bookIdSchema),
  deleteBook,
);

export default router;
