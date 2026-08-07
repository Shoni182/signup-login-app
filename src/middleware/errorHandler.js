import { HttpError } from 'http-errors';

// ^ Middleware for error handler
export const errorHandler = (err, req, res, next) => {
  console.error('Error Middleware', err);

  if (err instanceof HttpError) {
    return res.status(err.status).json({
      message: err.message || err.name,
    });
  }
  const isProd = process.env.NODE_ENV === 'production';

  res.status(500).json({
    message: isProd
      ? 'Someting went wrong.Please try again later'
      : err.message,
  });
};
