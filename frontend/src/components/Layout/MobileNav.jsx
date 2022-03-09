/* eslint-disable no-unused-vars */
import React from 'react';
import styled from 'styled-components';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import PropTypes from 'prop-types';

const StyledIconButton = styled(IconButton)`
  @media only screen and (min-width: 600px){
    && {
      display: none;
    }
  }
`;

const StyledDrawer = styled(Drawer)`
  && {
    .MuiDrawer-paper {
      width: 200px;
      align-items: flex-start;
    }
  }
`;

class MobileNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileOpen: false,
    };
    this.handleWindowToggle = this.handleWindowToggle.bind(this);
  }

  handleWindowToggle = () => {
    this.setState((prevState) => ({ mobileOpen: !prevState.mobileOpen }));
  };

  render() {
    const { mobileOpen } = this.state;
    const { children } = this.props;
    return (
      <>
        <StyledIconButton size="large" onClick={this.handleWindowToggle}>
          <MenuIcon />
        </StyledIconButton>
        <StyledDrawer open={mobileOpen} onClose={this.handleWindowToggle}>
          { children }
        </StyledDrawer>
      </>
    );
  }
}

MobileNav.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MobileNav;
