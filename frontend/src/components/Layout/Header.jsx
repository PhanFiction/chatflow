/* eslint-disable no-shadow */
import React from 'react';
import styled from 'styled-components';
import AppBar from '@mui/material/AppBar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { logout, fetchUser } from '../../reducers/authReducer';
import UserAvatar from '../User/UserAvatar';

const StyledAppBar = styled(AppBar)`
  && {
    background-color: #2e2d2d;
  }
`;

const StyledTypo = styled(Typography)`
  && {
    color: black;
    font-weight: bold;
  }
`;

const Title = styled.h1`
  position: relative;
  left: 50px;
`;

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      anchorEl: null,
      open: false,
      loggedOut: false,
      user: null,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    const { fetchUser } = this.props;
    const user = fetchUser();
    if (user) {
      this.setState({ user: user.data });
    }
  }

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget, open: Boolean(event.currentTarget) });
  };

  handleClose() {
    this.setState({ anchorEl: null, open: false });
  }

  handleLogout = async () => {
    // eslint-disable-next-line no-shadow
    const { logout } = this.props;
    const loggedOut = await logout();
    if (loggedOut) {
      this.setState({ loggedOut: true });
    }
  };

  render() {
    const {
      anchorEl, open, loggedOut, user,
    } = this.state;
    return (
      <>
        {loggedOut && (<Navigate to="/login" />)}
        <StyledAppBar position="static">
          <Toolbar>
            <Button onClick={this.handleClick}>
              <UserAvatar user={user} />
            </Button>
            <Title>
              Chat App
            </Title>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={this.handleClose}
            >
              <MenuItem onClick={this.handleClose}>
                <StyledTypo>
                  Settings
                </StyledTypo>
              </MenuItem>
              <MenuItem>
                <StyledTypo onClick={this.handleLogout}>
                  Logout
                </StyledTypo>
              </MenuItem>
            </Menu>
          </Toolbar>
        </StyledAppBar>
      </>
    );
  }
}

const mapDispatchToProps = {
  logout,
  fetchUser,
};

Header.propTypes = {
  logout: PropTypes.func.isRequired,
  fetchUser: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Header);
