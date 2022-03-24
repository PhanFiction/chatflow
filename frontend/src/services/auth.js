const axios = require('axios');

const login = async (credentials) => {
  const response = await axios.post(`${process.env.REACT_APP_DOMAIN}/auth/login`, credentials, {
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });
  return response.data;
};

const signUp = async (credentials) => {
  const response = await axios.post(`${process.env.REACT_APP_DOMAIN}/auth/signup`, credentials);
  return response.data;
};

const logout = async () => {
  const response = await axios.post(`${process.env.REACT_APP_DOMAIN}/auth/logout`, {}, { withCredentials: true });
  return response.data;
};

module.exports = {
  login,
  signUp,
  logout,
};
