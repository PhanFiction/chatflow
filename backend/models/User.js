const mongoose = require('mongoose');
// eslint-disable-next-line prefer-destructuring
const Schema = mongoose.Schema;

/**
 * Create user for schema
 */
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
  },
  username: {
    type: String,
    required: true,
    minlength: 5,
  },
  password: {
    type: String,
    required: true,
    minlength: 4,
  },
});

const User = mongoose.model('Users', userSchema);

module.exports = User;
