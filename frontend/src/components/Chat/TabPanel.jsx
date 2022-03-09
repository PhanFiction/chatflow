/* eslint-disable no-param-reassign */
import React from 'react';
import List from '@mui/material/List';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchUser } from '../../reducers/authReducer';
import socket from '../../socket';
import TabItem from './TabItem';

class TabPanel extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      connectedUsers: [],
    };
  }

  componentDidMount() {
    // eslint-disable-next-line no-shadow
    socket.on('users', (users) => {
      // put the current user first, and then sort by username
      users = users.sort((a, b) => {
        if (a) return -1;
        if (b) return 1;
        if (a.user < b.user) return -1;
        return a.user > b.user ? 1 : 0;
      });
      this.setState({ connectedUsers: users });
    });

    socket.on('user connected', (user) => {
      this.setState((prevState) => ({ connectedUsers: prevState.connectedUsers.concat(user) }));
    });

    socket.on('user disconnected', (users) => {
      this.setState({ connectedUsers: users });
    });
  }

  render() {
    const { connectedUsers } = this.state;
    const { index, value } = this.props;
    return (
      <div hidden={value !== index}>
        {value === index && (
        <List>
          {
            connectedUsers.map((user) => (
              <TabItem name={user.user} id={user.userID} key={user.userID} />
            ))
          }
        </List>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userId: state.user,
});

const mapDispatchToProps = {
  fetchUser,
};

TabPanel.propTypes = {
  value: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  // fetchUser: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(TabPanel);
