/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-shadow */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const messageHandler = require('./messageHandler');

const ioHandler = (io) => (socket) => {
  // console.log(socket);
  let users = [];
  // console.log(socket.user, socket.id);
  // console.log('connected ', socket.user);
  for (const [id, socket] of io.of('/').sockets) {
    users.push({
      userID: id,
      user: socket.user,
      messages: [],
    });
  }
  socket.emit('users', users);
  socket.join('Global Chat');

  socket.broadcast.emit('user connected', {
    userID: socket.id,
    user: socket.user,
    messages: [],
  });

  socket.on('disconnect', () => {
    socket.broadcast.emit('user disconnected', socket.id);
    users = users.filter((user) => user.userID !== socket.id);
  });
  // socket.emit('rooms', socket.rooms);

  socket.on('private-message', ({ content, to }) => {
    console.log('private');
    socket.to(to).emit('private-message', {
      content,
      from: socket.id,
      room: to,
    });
  });

  socket.on('send-message', ({ content, to, sender }) => {
    socket.to(to).emit('send-message', {
      content,
      from: { userID: socket.id, sender },
      room: to,
    });
  });

  /*   socket.on('disconnect', () => {
    users = users.filter((user) => user.user !== socket.user.data);
    socket.emit({ disconnected: 'user disconnected' });
  }); */

  // socket.broadcast.emit('user disconnected', users);
};

module.exports = ioHandler;
