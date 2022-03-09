import socket from '../socket';

const userReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_ID':
      return action.data;
    default:
      return state;
  }
};

export const getId = () => async (dispatch) => {
  await dispatch({
    type: 'GET_ID',
    data: null,
  });
};

export const connectSocket = () => async (dispatch) => {
  socket.on('connect', () => {
    dispatch({
      type: 'SET_ID',
      data: socket.id,
    });
  });
};

export default userReducer;
