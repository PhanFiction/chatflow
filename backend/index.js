/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
const http = require('http');
const { Server } = require('socket.io');
const app = require('./app');
const config = require('./utils/config');

const server = http.createServer(app);
const io = new Server(server);
const ioHandler = require('./io/ioHandler');

io.use((socket, next) => {
  // const token = socket.handshake.headers.cookie;
  // console.log('authentication ', token);
  const { user } = socket.handshake.auth;
  if (!user) {
    return next(new Error('invalid user'));
  }
  socket.user = user;
  next();
}).on('connection', ioHandler(io));

server.listen(config.PORT, () => console.log(`connected to server ${config.PORT}`));
