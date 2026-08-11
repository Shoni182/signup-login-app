import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { errors } from 'celebrate';
import { logger } from './middleware/logger.js';

// Database
import { connectMongoDB } from './db/connectMongoDB.js';
// Middlewares
import { errorHandler } from './middleware/errorHandler.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
// Routes
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import bookRoutes from './routes/bookRoutes.js';

const app = express();
const PORT = process.env.PORT ?? 3000;

// Middlewars
app.use(logger);
app.use(cors());
app.use(express.json());

// Routs
app.use(authRoutes);
app.use('/users', userRoutes);
app.use('/books', bookRoutes);

// 404 - якщо маршрут не знайдено
app.use(notFoundHandler);

// Валідація за допомогою celebrate
app.use(errors());

// Помилка під час запиту
app.use(errorHandler);

// MongoDB
await connectMongoDB();

//: Запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
