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
import chat from '../../services/chat';

const StyledPaper = styled(Paper)`
  visibility: visible;
  height: calc(100vh - 85px);
  @media only screen and (max-width: 600px) {
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
      receiverUsername: '',
      connectedUsers: [],
    };
  }

  componentDidMount() {
    socket.on('users', async (users) => {
      const allUsers = await chat.getUsers();

      await allUsers.forEach((user) => {
        if (users[user._id]) {
          user.socketId = users[user._id].socketId;
        }
      });
      this.setState({ connectedUsers: allUsers });
    });

    socket.on('user connected', (user) => {
      const { connectedUsers } = this.state;
      const newConnectedUsers = connectedUsers.map((u) => {
        if (u._id === user.userId) {
          u.socketId = user.socketId;
        }
        return u;
      });
      this.setState({ connectedUsers: newConnectedUsers });
    });

    socket.on('user disconnected', (socketId) => {
      const { connectedUsers } = this.state;
      const updatedUsers = connectedUsers.map((user) => {
        if (user.socketId === socketId) delete user.socketId;
        return user;
      });
      this.setState({ connectedUsers: updatedUsers });
    });
  }

  componentWillUnmount() {
    socket.disconnect();
  }

  handleTabChange = (_event, value) => {
    this.setState(() => ({ selcetedTab: value }));
  };

  changeRoom = (_event, room, receiverUsername, id) => {
    this.setState({
      room,
      receiverUsername,
      receiverId: id.length <= 0 ? 'Global Chat' : id,
    });
  };

  render() {
    const {
      selcetedTab, room, receiverUsername, receiverId, connectedUsers,
    } = this.state;
    return (
      <>
        <Header />
        <Grid container spacing={2}>
          <Grid item xs={1.5} sm={3} md={3}>
            <StyledPaper elevation={5}>
              <Paper elevation={3}>
                <Tabs
                  value={selcetedTab}
                  onChange={this.handleTabChange}
                  variant="fullWidth"
                >
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
                <Tabs
                  value={selcetedTab}
                  onChange={this.handleTabChange}
                  variant="fullWidth"
                >
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
          <ChatBox
            room={room}
            receiverUsername={receiverUsername}
            receiverId={receiverId}
            connectedUsers={connectedUsers}
          />
        </Grid>
      </>
    );
  }
}

export default Chat;
