/* eslint-disable no-unused-vars */
const jwt = require('jsonwebtoken');
const config = require('../utils/config');

const authorized = async (req, res, next) => {
  const { userToken } = req.cookies;
  jwt.verify(userToken, config.SECRET_KEY, (error, decoded) => {
    if (error) return res.status(401).send('Unauthorized');
    req.user = decoded;
    return next();
  });
};

module.exports = {
  authorized,
};
