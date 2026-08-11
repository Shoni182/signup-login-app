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

router.get('/', celebrate(getAllBooksSchema), getAllBooks);
router.get('/:id', celebrate(bookIdSchema), getBookById);

router.post('/', authorize(['admin']), celebrate(createBookSchema), createBook);
router.patch(
  '/:id',
  authorize(['admin']),
  celebrate(updateBookSchema),
  updateBook,
);
router.delete(
  '/:id',
  authorize(['admin']),
  celebrate(bookIdSchema),
  deleteBook,
);

export default router;
