const mongoose = require('mongoose');
// eslint-disable-next-line prefer-destructuring
const Schema = mongoose.Schema;

const chatSchema = new Schema({
  chatRoom:
  [
    {
      type: Schema.Types.ObjectId,
      ref: 'Users',
    },
  ],
  messages: [
    {
      sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
      },
      to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
      },
      body: String,
      date: {
        type: String,
        default: Date(),
      },
    },
  ],
  date: {
    type: String,
    default: Date(),
  },
});

const Chat = mongoose.model('Chats', chatSchema);

module.exports = Chat;
