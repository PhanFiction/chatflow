/* eslint-disable react/no-unused-state */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SignUp from './components/Authentication/SignUp';
import Login from './components/Authentication/Login';
import Chat from './components/Chat/Chat';
import PrivateRoute from './components/Authentication/PrivateRoute';
import { connectSocket } from './reducers/userReducer';
import { fetchUser } from './reducers/authReducer';
import socket from './socket';

class App extends React.PureComponent {
  componentDidMount() {
    const { connectSocket, fetchUser } = this.props;
    const fetchedUser = fetchUser();
    const user = fetchedUser.data;
    socket.auth = { user };
    connectSocket();
  }

  render() {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<PrivateRoute><Chat /></PrivateRoute>} />
      </Routes>
    );
  }
}
const mapDispatchToProps = {
  connectSocket,
  fetchUser,
};

App.propTypes = {
  connectSocket: PropTypes.func.isRequired,
  fetchUser: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(App);
