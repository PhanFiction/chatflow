const axios = require('axios');

const sendMessage = (message) => {
  axios.post(`${process.env.REACT_APP_DOMAIN}/chat`, message);
};

const getUsers = async () => {
  const response = await axios.get(`${process.env.REACT_APP_DOMAIN}/chat/users`, { withCredentials: true });
  return response.data;
};

module.exports = {
  sendMessage,
  getUsers,
};
