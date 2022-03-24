const Chat = require('../models/Chat');
const User = require('../models/User');

exports.getChats = async (req, res, next) => {
  const { user } = req;
  const userChats = await Chat.find({ chatRoom: user.id }).populate('messages.sender messages.to', 'username name');
  res.send(userChats);
  next();
};

exports.getUsers = async (req, res, next) => {
  const allUsers = await User.find({}).populate('name', '-password');
  // console.log(req.io.sockets);
  res.send(allUsers);
  next();
};
