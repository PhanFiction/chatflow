/* eslint-disable react/no-unused-prop-types */
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
import { setUser } from './reducers/userReducer';
import { fetchUser } from './reducers/authReducer';
import socket from './socket';

class App extends React.PureComponent {
  componentDidMount() {
    const { setUser, fetchUser } = this.props;
    const foundUser = fetchUser();
    const user = foundUser.data;
    socket.auth = { user };

    socket.on('connect', () => {
      socket.emit('join-room', 'Global Chat');
      setUser(user === null ? user : socket.auth.user, socket.id);
    });
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
  setUser,
  fetchUser,
};

App.propTypes = {
  setUser: PropTypes.func.isRequired,
  fetchUser: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(App);
