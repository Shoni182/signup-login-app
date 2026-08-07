//^ Middleware 404 for all routs

export const notFoundHandler = (req, res) => {
  res.status(404).json({ message: 'Route not found' });
};
