const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http');
const { Server } = require('socket.io');
const config = require('./utils/config');
const authRouter = require('./routes/authRouter');
const chatRouter = require('./routes/chatRouter');
const authorize = require('./middleware/middleware');
const ioHandler = require('./io/ioHandler');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

config.db;

// app.io = io;
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
  credentials: true,
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, _res, next) => {
  req.io = io;
  next();
});
app.use('/auth', authRouter);
app.use('/chat', authorize.authorized, chatRouter);

io.use((socket, next) => {
  // const token = socket.handshake.headers.cookie;
  // console.log('authentication ', token);
  // console.log('auth ', socket.handshake.auth);
  const { name, username, userId } = socket.handshake.auth;
  if (!name) return next(new Error('invalid user'));

  socket.name = name;
  socket.username = username;
  socket.userId = userId;
  next();
}).on('connection', ioHandler(io));

module.exports = {
  server,
};
