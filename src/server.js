import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { errors } from 'celebrate';

// Database
import { connectMongoDB } from './db/connectMongoDB.js';
// imports middlewares
import { errorHandler } from './middleware/errorHandler.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';

import authRoutes from './routes/authRoutes.js';
import { logger } from './middleware/logger.js';
// import booksRoutes

const app = express();
const PORT = process.env.PORT ?? 3000;

// ^ Middlewars
app.use(logger);
app.use(cors());
app.use(express.json());

// ^ Routs
app.use(authRoutes);

// ^ 404 - якщо маршрут не знайдено
app.use(notFoundHandler);

// ^ Валідація за допомогою celebrate
app.use(errors());

// ^ Помилка під час запиту
app.use(errorHandler);

// ^ MongoDB
await connectMongoDB();

//: Запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
