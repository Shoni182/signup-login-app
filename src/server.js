import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { error } from 'celebrate';
import { celebrate } from 'celebrate';
// DB
import { connectMongoDB } from './db/connectMongoDB';
// middlewares
import { errorHandler } from './middleware/errorHandler';
// import {notFoundHandler}from

const app = express();
const PORT = process.env.PORT ?? 3000;

// підключення до MongoDB
await connectMongoDB();

// Перший маршрут
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello world!' });
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
