/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-shadow */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const messageHandler = require('./messageHandler');

const ioHandler = (io) => (socket) => {
  const users = {};

  // fetch users from room and send to client
  for (const [id, socket] of io.of('/').sockets) {
    users[socket.userId] = {
      socketId: id,
    };
  }

  // user logs in we store the socket id
  socket.on('login', (data) => {
    users[data.userId] = {
      socketId: socket.id,
    };
  });

  socket.emit('users', users);
  socket.join('Global Chat');

  socket.broadcast.emit('user connected', {
    socketId: socket.id,
    userId: socket.userId,
  });

  socket.on('disconnect', () => {
    console.log('disconnected ', socket.id);
    delete users[socket.userId];
    socket.broadcast.emit('user disconnected', socket.id);
  });
  // socket.emit('rooms', socket.rooms);

  socket.on('send-message', ({ content, to, toUsername }) => {
    // console.log('message ', content, to, toUsername);
    messageHandler(socket, content, to, toUsername);
  });
};

module.exports = ioHandler;
