const mongoose = require('mongoose');
// eslint-disable-next-line prefer-destructuring
const Schema = mongoose.Schema;

/**
 * Create chat room for schema
 * this is a chat documentation that contains the id of the chat holding userId of whose in it and
 * the date when the chat was created
 */
/*
something like
{
  chatRoom: [
    userId: 12091902,
    userId: 12882128,
  ],
  lastMessage: {
    [array of messages]
  }
}
*/
const chatSchema = new Schema({
  chatRoom: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Users',
    },
  ],
  lastMessage: {
    type: String,
  },
  date: {
    type: String,
    default: Date.now,
  },
});

const Chat = mongoose.model('Chats', chatSchema);

module.exports = Chat;
