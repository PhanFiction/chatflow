const mongoose = require('mongoose');
require('dotenv').config();

const { PORT } = process.env;
const { MONGODB_URI } = process.env;
const { SECRET_KEY } = process.env;

const db = mongoose.connect(MONGODB_URI)
.then(() => console.log('connected successfully to database'))
.catch(() => console.log('failed to connect to database'));

module.exports = {
  PORT,
  MONGODB_URI,
  SECRET_KEY,
  db,
};
