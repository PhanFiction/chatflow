/* eslint-disable no-shadow */
import React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import styled from 'styled-components';
import Header from '../Layout/Header';
import TabPanel from './TabPanel';
import MobileNav from '../Layout/MobileNav';
import ChatBox from './ChatBox';
import socket from '../../socket';

const StyledPaper = styled(Paper)`
  visibility: visible;
  height: calc(100vh - 85px);
  @media only screen and (max-width: 600px){
    visibility: hidden;
    height: 0;
    position: absolute;
  }
`;

class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      selcetedTab: 0,
      room: 'Global Chat',
      receiverId: '',
      connectedUsers: [],
    };
  }

  componentDidMount() {
    // eslint-disable-next-line no-shadow
    socket.on('users', (users) => {
      this.setState({ connectedUsers: users });
    });

    socket.on('user connected', (user) => {
      console.log('user connected');
      this.setState((prevState) => ({ connectedUsers: prevState.connectedUsers.concat(user) }));
    });

    socket.on('user disconnected', (userID) => {
      console.log('user disconnected ', userID);
      this.setState((prevState) => ({
        connectedUsers: prevState.connectedUsers.filter((user) => user.userID !== userID),
      }));
      socket.emit('user disconnected', userID);
    });
  }

  handleTabChange = (_event, value) => {
    this.setState(() => ({ selcetedTab: value }));
  };

  changeRoom = (_event, room, id) => {
    this.setState({ room, receiverId: id.length <= 0 ? 'Global Chat' : id });
  };

  render() {
    const {
      selcetedTab, room, receiverId, connectedUsers,
    } = this.state;
    console.log(connectedUsers);
    return (
      <>
        <Header />
        <Grid container spacing={2}>
          <Grid item xs={1.5} sm={3} md={3}>
            <StyledPaper elevation={5}>
              <Paper elevation={3}>
                <Tabs value={selcetedTab} onChange={this.handleTabChange} variant="fullWidth">
                  <Tab label="Chats" value={0} />
                  <Tab label="Users" value={1} />
                </Tabs>
              </Paper>
              <TabPanel
                value={selcetedTab}
                index={selcetedTab}
                setRoom={this.changeRoom}
                connectedUsers={connectedUsers}
              />
            </StyledPaper>
            <MobileNav>
              <Paper elevation={3} style={{ width: 'inherit' }}>
                <Tabs value={selcetedTab} onChange={this.handleTabChange} variant="fullWidth">
                  <Tab label="Chats" value={0} />
                  <Tab label="Users" value={1} />
                </Tabs>
              </Paper>
              <TabPanel
                value={selcetedTab}
                index={selcetedTab}
                setRoom={this.changeRoom}
                connectedUsers={connectedUsers}
              />
            </MobileNav>
          </Grid>
          <ChatBox room={room} receiverId={receiverId} connectedUsers={connectedUsers} />
        </Grid>
      </>
    );
  }
}

export default Chat;
