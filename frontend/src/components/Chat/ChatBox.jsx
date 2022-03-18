/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
import React from 'react';
import Grid from '@mui/material/Grid';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/SendRounded';
import Fab from '@mui/material/Fab';
import Typography from '@mui/material/Typography';
import socket from '../../socket';
import Message from './Message';

class ChatBox extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      user: null,
      userMessages: [],
      receiveMessages: [],
      textMessage: '',
    };
  }

  componentDidMount() {
    // eslint-disable-next-line no-shadow
    const { userInfo } = this.props;
    const { name } = userInfo;
    // console.log(foundUser);
    if (name) {
      this.setState({ user: name });
    }

    socket.on('private message', ({ content, from }) => {
      const { connectedUsers, receiverId } = this.props;
      for (let i = 0; i < connectedUsers.length; i += 1) {
        const user = connectedUsers[i];
        if (user.userID === from) {
          const message = [{ content, fromSelf: true }];

          this.setState((prevState) => ({
            chatMessages: prevState.connectedUsers.user.userID.messages === undefined
              ? message
              : prevState.connectedUsers.user.userID.messages.concat(message),
          }));
          if (user.userID !== receiverId) {
            user.hasNewMessages = true;
          }
          break;
        }
      }
    });

    socket.on('send-message', (message) => {
      // console.log('send message', message);
      this.setState((prevState) => ({
        receiveMessages:
        prevState.receiveMessages.concat(message),
      }));
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const {
      textMessage, chatMessages, user,
    } = this.state;
    const { room, receiverId } = this.props;
    // eslint-disable-next-line no-shadow
    // console.log(receiverId);
    socket.emit('send-message', {
      content: textMessage,
      to: receiverId === undefined ? 'Global Chat' : receiverId,
      sender: user,
      room: receiverId === undefined ? 'Global Chat' : receiverId,
    });

    this.setState((prevState) => ({
      textMessage: '',
      userMessages: prevState.userMessages.concat({
        textMessage,
        fromSelf: true,
        room: receiverId === undefined ? 'Global Chat' : receiverId,
      }),
    }));
  };

  render() {
    const {
      user, userMessages, receiveMessages, textMessage,
    } = this.state;
    const {
      room, receiverId, connectedUsers, children,
    } = this.props;
    // console.log('connected Users ', connectedUsers);
    // console.log('receiver id ', receiverId);
    // console.log(receiveMessages);
    return (
      <Grid item xs={10} sm={9} md={9}>
        <Grid item xs={10}>
          <Typography variant="h4">
            { room }
          </Typography>
          <Divider />
        </Grid>
        <List style={{ height: '69vh', overflowY: 'scroll' }}>
          {
            userMessages.map((message, index) => message.room === room && (
              <Message
                user={user}
                content={message.textMessage}
                key={index}
                fromSelf={message.fromSelf}
              />
            ))
          }
          {
            receiveMessages.map((message, index) => message.room === room && (
              <Message
                user={message.from.sender}
                content={message.content}
                key={index}
              />
            ))
          }
        </List>
        <Grid container style={{ padding: '15px' }} spacing={2} alignItems="center">
          <Grid item xs={10}>
            <TextField label="type something" value={textMessage} onChange={(e) => { this.setState({ textMessage: e.target.value }); }} fullWidth />
          </Grid>
          <Grid item xs={1}>
            <Fab color="primary" size="small" onClick={this.handleSubmit}><SendIcon /></Fab>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  userInfo: state.user,
});

ChatBox.propTypes = {
  room: PropTypes.string,
  children: PropTypes.string,
  receiverId: PropTypes.string,
  connectedUsers: PropTypes.arrayOf(PropTypes.object),
  userInfo: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.string,
  }).isRequired,
};

ChatBox.defaultProps = {
  room: '',
  children: '',
  receiverId: '',
  connectedUsers: [],
};

export default connect(mapStateToProps)(ChatBox);
