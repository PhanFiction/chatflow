const mongoose = require('mongoose');
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./utils/config');
const authRouter = require('./routes/authRouter');

const app = express();

app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
  credentials: true,
}));

mongoose.connect(config.MONGODB_URI)
  .then(() => console.log('connected successfully to database'))
  .catch(() => console.log('failed to connect to database'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/auth', authRouter);

module.exports = app;
