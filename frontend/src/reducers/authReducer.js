/* eslint-disable spaced-comment */
import authService from '../services/auth';
import socket from '../socket';

const authReducer = (state = null, action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.data;
    case 'SIGNUP':
      return action.data;
    case 'LOGOUT':
      return action.data;
    case 'FETCH_USER':
      return state;
    default:
      return state;
  }
};

export const login = (credentials) => async (dispatch) => {
  const user = await authService.login(credentials);
  socket.emit('login', user);
  window.sessionStorage.setItem('loggedUser', JSON.stringify(user));
  return dispatch({
    type: 'LOGIN',
    data: {
      user,
    },
  });
};

export const logout = () => {
  window.sessionStorage.removeItem('loggedUser');
  return async (dispatch) => {
    await authService.logout();
    socket.disconnect();
    return dispatch({
      type: 'LOGOUT',
      data: null,
    });
  };
};

export const signUp = (credentials) => async (dispatch) => {
  const result = await authService.signUp(credentials);
  dispatch({
    type: 'SIGNUP',
    data: null,
  });
  return result;
};

export const fetchUser = () => {
  const loggedUser = JSON.parse(window.sessionStorage.getItem('loggedUser'));
  return (dispatch) => {
    if (loggedUser) {
      return dispatch({
        type: 'FETCH_USER',
        data: loggedUser,
      });
    }
    return dispatch({
      type: 'FETCH_USER',
      data: null,
    });
  };
};

export default authReducer;
