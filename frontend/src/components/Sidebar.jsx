import React from 'react';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import NavItem from './NavItem';

const drawerWidth = 280;

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileOpen: false,
      win: undefined,
    };
  }

  handleDrawerToggle = () => {
    this.setState((prevState) => ({ mobileOpen: !prevState.mobileOpen }));
  };

  render() {
    const { mobileOpen, win } = this.state;
    const container = win !== undefined ? () => window().document.body : undefined;
    return (
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}
          css={css`align-items: center; background-color: #111010a0;`}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={this.handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h4" textAlign="center">
              Chat App
            </Typography>
          </Toolbar>
        </AppBar>
        <Box
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 }, boxShadow: 3 }}
        >
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={this.handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { width: drawerWidth },
            }}
          >
            <div css={css`display: flex; background-color: #111010a0;`}>
              <NavItem />
            </div>
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': { width: drawerWidth, borderRight: 0 },
            }}
            open
            PaperProps={{ elevation: 10 }}
          >
            <div css={css`display: flex; flex-direction: column;`}>
              <NavItem />
              <span css={css`display: flex; justify-content: space-around; color: black;`}>
                <Tabs value="0">
                  <Tab label="Chats" value="0" />
                  <Tab label="Users" value="1" />
                </Tabs>
              </span>
              <Divider />
              <List>
                <ListItem alignItems="center">
                  <ListItemAvatar>
                    <Avatar>PT</Avatar>
                  </ListItemAvatar>
                  <ListItemText style={{ marginLeft: '10%' }}>
                    <Typography variant="body1">
                      Andy Phan
                    </Typography>
                  </ListItemText>
                </ListItem>
                <ListItem alignItems="center">
                  <ListItemAvatar>
                    <Avatar>MT</Avatar>
                  </ListItemAvatar>
                  <ListItemText style={{ marginLeft: '10%' }}>
                    Muhammad Tamirez
                  </ListItemText>
                </ListItem>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar>JS</Avatar>
                  </ListItemAvatar>
                  <ListItemText style={{ marginLeft: '10%' }}>
                    <p>Jessica Sanchez</p>
                  </ListItemText>
                </ListItem>
              </List>
            </div>
          </Drawer>
        </Box>
      </Box>
    );
  }
}

export default Sidebar;
