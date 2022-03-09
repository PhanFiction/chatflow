const mongoose = require('mongoose');
// eslint-disable-next-line prefer-destructuring
const Schema = mongoose.Schema;

// accepts who sent it, body containing message, and date of when message is sent
const globalChatSchema = new Schema({
  sender: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
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

const GlobalChat = mongoose.model('GlobalChat', globalChatSchema);

module.export = GlobalChat;
