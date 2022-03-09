/* eslint-disable react/no-unused-state */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
import React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import SendIcon from '@mui/icons-material/SendRounded';
import Fab from '@mui/material/Fab';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TabPanel from './TabPanel';
import Header from '../Layout/Header';
import MobileNav from '../Layout/MobileNav';
import ChatBox from './ChatBox';
import { sendMessage } from '../../reducers/socketReducer';
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
  constructor(props) {
    super(props);
    this.state = {
      selcetedTab: 0,
      message: '',
      users: [],
    };
  }

  handleTabChange = (_event, value) => {
    this.setState(() => ({ selcetedTab: value }));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { message } = this.state;
    // eslint-disable-next-line no-shadow
    const { sendMessage } = this.props;
    socket.emit('send-message', message);
  };

  render() {
    const { selcetedTab, users } = this.state;
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
              <TabPanel value={selcetedTab} index={1} />
            </StyledPaper>
            <MobileNav>
              <Paper elevation={3} style={{ width: 'inherit' }}>
                <Tabs value={selcetedTab} onChange={this.handleTabChange} variant="fullWidth">
                  <Tab label="Chats" value={0} />
                  <Tab label="Users" value={1} />
                </Tabs>
              </Paper>
              <TabPanel value={selcetedTab} index={1} />
            </MobileNav>
          </Grid>
          <Grid item xs={10} sm={9} md={9}>
            <List style={{ height: '70vh', overflowY: 'scroll' }}>
              <ChatBox />
            </List>
            <Grid container style={{ padding: '15px' }} spacing={2} alignItems="center">
              <Grid item xs={10}>
                <TextField label="type something" onChange={(e) => { this.setState({ message: e.target.value }); }} fullWidth />
              </Grid>
              <Grid item xs={1}>
                <Fab color="primary" size="small" onClick={this.handleSubmit}><SendIcon /></Fab>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </>
    );
  }
}

const mapDispatchToProps = {
  sendMessage,
};

Chat.propTypes = {
  sendMessage: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Chat);
