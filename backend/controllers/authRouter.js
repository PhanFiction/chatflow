const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../utils/config');
const User = require('../models/User');

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const foundUser = await User.findOne({ username }).populate('password');

  const verifyPassword = foundUser === null ? false
    : await bcrypt.compare(password, foundUser.password);

  if (foundUser === null || verifyPassword === false) {
    return res.send({ error: 'password or username is incorrect' });
  }

  const userForToken = {
    id: foundUser.id,
    username: foundUser.username,
  };

  const token = await jwt.sign(userForToken, config.SECRET_KEY);
  // console.log(req.app.io);

  // users[socket.id] = { name: foundUser.name, username: foundUser.username, id: foundUser.id };
  // console.log(users);
  try {
    // req.app.io.emit('all users', users);
    return res.cookie('userToken', token).send({ name: foundUser.name, username: foundUser.username, userId: foundUser.id });
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
    // User.createIndex({ "username": 1 }, { unique: true });
    res.send({ 'success created': savedUser });
  } catch (error) {
    res.send({ error: 'could not create an account' });
  }
};

exports.logout = async (req, res) => {
  try {
    res.clearCookie('userToken', { domain: 'localhost', path: '/' }).send({ success: 'logged out' });
  } catch (error) {
    res.send(error).end();
  }
};
