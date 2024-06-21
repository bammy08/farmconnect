const jwt = require('jsonwebtoken');

module.exports.authMiddleware = (req, res, next) => {
  const { accessToken } = req.cookies;

  if (!accessToken) {
    return res.status(409).json({ error: 'Please you must login first' });
  } else {
    try {
      const decodeToken = jwt.verify(accessToken, process.env.SECRET_KEY);
      req.role = decodeToken.role;
      req.id = decodeToken.id;
      next();
    } catch (error) {
      return res.status(409).json({ error: 'Please you must login first' });
    }
  }
};
