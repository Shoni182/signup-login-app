export const authorize = (allowedRoles) => {
  return (req, res, next) => {
    const { role } = req.user;

    if (!allowedRoles.includes(role)) {
      return res
        .status(403)
        .json({ message: 'Forbidden: insufficient permissions' });
    }

    next();
  };
};
