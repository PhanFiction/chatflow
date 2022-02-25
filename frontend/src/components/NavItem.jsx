import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';

class NavItem extends React.Component {
  constructor() {
    super();
    this.state = {
      anchorEl: null,
      open: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget, open: Boolean(event.currentTarget) });
  };

  handleClose() {
    this.setState({ anchorEl: null, open: false });
  }

  render() {
    const { anchorEl, open } = this.state;
    return (
      <div css={css`display: flex; align-items: center; background-color: #111010a0;`}>
        <Button
          onClick={this.handleClick}
        >
          <Avatar>AP</Avatar>
        </Button>
        <div>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={this.handleClose}
          >
            <MenuItem onClick={this.handleClose}>Profile</MenuItem>
            <MenuItem onClick={this.handleClose}>My account</MenuItem>
            <MenuItem onClick={this.handleClose}>Logout</MenuItem>
          </Menu>
        </div>
        <div>
          <h3>Chat App</h3>
        </div>
      </div>
    );
  }
}

export default NavItem;
