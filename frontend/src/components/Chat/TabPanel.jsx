import React from 'react';
import List from '@mui/material/List';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import TabItem from './TabItem';
import UserAvatar from '../User/UserAvatar';

class TabPanel extends React.PureComponent {
  render() {
    const {
      index, value, setRoom, connectedUsers, userInfo,
    } = this.props;
    const { userId } = userInfo;
    // console.log('user ', userInfo);
    // console.log('connect ', connectedUsers);
    return (
      <div hidden={value !== index} style={{ overflowY: 'scroll', height: '92%' }}>
        {value === 0 && (
        <List>
          <TabItem
            name="Global Chat"
            setRoom={setRoom}
            self={false}
            socketId="Global Chat"
          />
        </List>
        )}
        {value === 1 && (
        <List>
          {
            connectedUsers.map((u) => (
              <TabItem
                name={u.name}
                id={u._id}
                socketId={u.socketId}
                key={u.username}
                username={u.username}
                setRoom={setRoom}
                self={u._id === userId}
              >
                <ListItemAvatar>
                  <UserAvatar user={u.name} />
                </ListItemAvatar>
              </TabItem>
            ))
          }
        </List>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userInfo: state.user,
});

const mapDispatchToProps = {
};

TabPanel.propTypes = {
  value: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  setRoom: PropTypes.func.isRequired,
  connectedUsers: PropTypes.arrayOf(PropTypes.object),
  // fetchUser: PropTypes.func.isRequired,
  userInfo: PropTypes.shape({
    userId: PropTypes.string,
  }).isRequired,
};

TabPanel.defaultProps = {
  connectedUsers: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(TabPanel);
