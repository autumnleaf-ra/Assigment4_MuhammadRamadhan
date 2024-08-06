const Boom = require('boom');
const jwt = require('jsonwebtoken');
const CommonHelper = require('../helpers/CommonHelper');

const verifyToken = async (req, res, next) => {
  try {
    const token = req.header('Authorization');
    if (!token) {
      return res.send(Boom.unauthorized('Access denied. No token provided'));
    }

    const tokenValue = token.replace('Bearer ', '');

    const decoded = jwt.verify(tokenValue, 'oajdw99201dnds');
    req.password = decoded.password;

    next();
  } catch (error) {
    switch (error.name) {
      case 'JsonWebTokenError':
      case 'InvalidTokenError':
        CommonHelper.log(['Middleware', 'verifyToken', 'ERROR'], { message: `${error}` });
        return res.status(401).send(Boom.unauthorized('Invalid token'));

      case 'TokenExpiredError':
        CommonHelper.log(['Middleware', 'verifyToken', 'ERROR'], { message: `${error}` });
        return res.status(401).send(Boom.unauthorized('Token expired'));

      default:
        CommonHelper.log(['Middleware', 'verifyToken', 'ERROR'], { message: `${error}` });
        return res.status(500).send(CommonHelper.errorResponse(error));
    }
  }
};

module.exports = { verifyToken };
