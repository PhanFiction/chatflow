import React from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

class PrivateRoute extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: JSON.parse(window.sessionStorage.getItem('loggedUser')),
    };
  }

  render() {
    const { children } = this.props;
    const { user } = this.state;
    return user ? (
      children
    ) : (
      <Navigate to="/login" />
    );
  }
}

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
