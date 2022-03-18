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
    const { id } = userInfo;
    return (
      <div hidden={value !== index} style={{ overflowY: 'scroll', height: '92%' }}>
        {value === 0 && (
        <List>
          <TabItem
            name="Global Chat"
            setRoom={setRoom}
            self={false}
          />
        </List>
        )}
        {value === 1 && (
        <List>
          {
            connectedUsers.map((user) => (
              <TabItem
                name={user.user}
                id={user.userID}
                key={user.userID}
                setRoom={setRoom}
                self={user.userID === id}
              >
                <ListItemAvatar>
                  <UserAvatar user={user.user} />
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
    name: PropTypes.string,
    id: PropTypes.string,
  }).isRequired,
};

TabPanel.defaultProps = {
  connectedUsers: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(TabPanel);
