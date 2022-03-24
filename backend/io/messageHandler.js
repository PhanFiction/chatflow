const Chat = require('../models/Chat');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('../utils/config');

const messageHandler = async (socket, content, to, toUsername) => {
  const user2 = await User.findOne({username: toUsername});
  const token = socket.handshake.headers.cookie.substring(10);
  const userId = await jwt.verify(token, config.SECRET_KEY);
  const user = await User.findById(userId.id);
  // console.log(user2);
  // console.log(userId);
 console.log('user ', user._id.toString());
 console.log('user2 ', user2._id.toString());

  const message = {
    sender: user._id.toString(),
    to: user2._id.toString(),
    body: content,
  };
  // look for chat room contianing user and user2
  const found = await Chat.findOne({
    chatRoom: {
      $all: [user._id.toString(), user2._id.toString()],
    },
  });
  console.log('found ', found); // returns null if not found
  
  if(found) {
    found.messages = await found.messages.concat(message);
    await found.save();
  }else{
    const newChat = await Chat.create({
      chatRoom: [
        user._id.toString(),
        user2._id.toString(),
      ],
      messages: [
        message,
      ]
    })
  }
  // console.log(chatId.toString());

  socket.to(to).emit('send-message', {
    content,
    from: { userID: socket.id, sender: socket.name },
    room: to,
    toUser: toUsername,
  });
};

module.exports = messageHandler;
