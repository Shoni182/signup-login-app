import jwt from 'jsonwebtoken';
import createHttpError from 'http-errors';

export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(
      createHttpError(401, 'Authorization header missing or invalid'),
    );
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
    // eslint-disable-next-line no-unused-vars
  } catch (error) {
    return next(createHttpError(401, 'Invalid or expired token'));
  }
};
