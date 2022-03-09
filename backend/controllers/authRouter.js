const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../utils/config');
const User = require('../models/User');

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const foundUser = await User.findOne({ username });

  const verifyPassword = foundUser === null ? false
    : await bcrypt.compare(password, foundUser.password);

  if (foundUser === null || verifyPassword === false) {
    return res.send({ error: 'password or username is incorrect' });
  }

  const userForToken = {
    user: foundUser.id,
    username: foundUser.username,
  };

  const token = await jwt.sign(userForToken, config.SECRET_KEY);

  try {
    return res.cookie('loggedUser', token).send({ name: foundUser.name, username: foundUser.username });
  } catch (error) {
    return res.send({ error });
  }
};

exports.signUp = async (req, res) => {
  try {
    const { username, name, password } = req.body;

    const saltRounds = 10;

    const passwordHash = await bcrypt.hash(password, saltRounds);

    const newUser = User({
      username,
      name,
      password: passwordHash,
    });

    const savedUser = await newUser.save();
    res.send({ 'success created': savedUser });
  } catch (error) {
    res.send({ error: 'could not create an account' });
  }
};

exports.logout = async (req, res) => {
  try {
    res.clearCookie('loggedUser', { domain: 'localhost', path: '/' }).send({ success: 'logged out' });
  } catch (error) {
    res.send(error).end();
  }
};
