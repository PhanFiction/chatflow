/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-shadow */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const messageHandler = require('./messageHandler');

const ioHandler = (io) => (socket) => {
  let users = [];
  console.log('connected ', socket.user);
  for (const [id, socket] of io.of('/').sockets) {
    users.push({
      userID: id,
      user: socket.user,
      connected: socket.connected,
    });
  }
  socket.emit('users', users);

  socket.broadcast.emit('user connected', {
    userID: socket.id,
    user: socket.user,
    connected: socket.connected,
  });

  socket.on('disconnect', () => {
    console.log(socket.user, ' disconnected');
    users = users.filter((user) => user.user !== socket.user);
  });

  socket.emit('user disconnected', users);

  /*   socket.on('disconnect', () => {
    users = users.filter((user) => user.user !== socket.user.data);
    socket.emit({ disconnected: 'user disconnected' });
  }); */

  // socket.broadcast.emit('user disconnected', users);
};

module.exports = ioHandler;
