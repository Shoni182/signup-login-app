// models for MongoDB
import { Schema } from 'mongoose';
import { model } from 'mongoose';

const bookSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  author: {
    type: String,
    required: true,
    trim: true,
  },
  pageCount: {
    type: Number,
    required: true,
    trim: true,
  },
});

bookSchema.index({ name: 'text', author: 'text' });
export const Book = model('Book', bookSchema);
