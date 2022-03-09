const mongoose = require('mongoose');
// eslint-disable-next-line prefer-destructuring
const Schema = mongoose.Schema;

// whose the receiver, the sender, what channel is it from, the message, and the date
const messageSchema = new Schema({
  sender: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
  },
  receiver: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
  },
  channel: {
    type: Schema.Types.ObjectId,
    ref: 'Chats',
  },
  body: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    default: Date.now,
  },
});

const Message = mongoose.model('Messages', messageSchema);

module.exports = Message;
