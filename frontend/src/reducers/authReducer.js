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
  const userInfo = await authService.login(credentials);
  window.sessionStorage.setItem('loggedUser', JSON.stringify(userInfo));
  return dispatch({
    type: 'LOGIN',
    data: {
      user: userInfo.name,
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
  await authService.signUp(credentials);
  dispatch({
    type: 'SIGNUP',
    data: null,
  });
  return 'success';
};

export const fetchUser = () => {
  const loggedUser = JSON.parse(window.sessionStorage.getItem('loggedUser'));
  return (dispatch) => {
    if (loggedUser) {
      return dispatch({
        type: 'FETCH_USER',
        data: loggedUser.name,
      });
    }
    return dispatch({
      type: 'FETCH_USER',
      data: null,
    });
  };
};

export default authReducer;
