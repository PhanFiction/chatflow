/* eslint-disable no-unused-vars */
/* eslint-disable import/no-mutable-exports */
import { io } from 'socket.io-client';
// import socket from '../socket';

const socketReducer = (state = '', action) => {
  switch (action.type) {
    case 'SEND':
      return action.data;
    default:
      return state;
  }
};

export const sendMessage = () => {
  io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
      console.log(`message: ${msg}`);
    });
  });
};

export default socketReducer;
