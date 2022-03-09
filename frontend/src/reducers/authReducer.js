/* eslint-disable spaced-comment */
import authService from '../services/auth';

const authReducer = (state = null, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { userInfo: action.data };
    case 'SIGNUP':
      return action.data;
    case 'LOGOUT':
      return action.data;
    case 'FETCH_USER':
      return action.data;
    default:
      return state;
  }
};

export const login = (credentials) => async (dispatch) => {
  const loggedUser = await authService.login(credentials);
  window.localStorage.setItem('loggedUser', JSON.stringify(loggedUser));

  return dispatch({
    type: 'LOGIN',
    data: {
      user: loggedUser.name,
    },
  });
};

export const logout = () => {
  window.localStorage.removeItem('loggedUser');
  return async (dispatch) => {
    await authService.logout();
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
  const loggedUser = JSON.parse(window.localStorage.getItem('loggedUser'));

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
