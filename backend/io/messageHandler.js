const messageHandler = (socket) => {
  socket.on('send-message', (message) => {
    console.log(message);
  });
};
module.exports = messageHandler;
