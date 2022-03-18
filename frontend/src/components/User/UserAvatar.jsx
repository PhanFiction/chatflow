import React from 'react';
import PropTypes from 'prop-types';
import { Avatar } from '@mui/material';

class UserAvatar extends React.PureComponent {
  render() {
    const { user } = this.props;
    const splitName = user ? user.split(' ') : 'Guest';
    return (
      <Avatar style={{ marginLeft: '20px', marginRight: '20px' }}>
        {
          splitName.length < 2 ? `${splitName[0][0].toUpperCase()} ${splitName[0][0].toUpperCase()}`
            : `${splitName[0][0].toUpperCase()} ${splitName[1][0].toUpperCase()}`
        }
      </Avatar>
    );
  }
}
UserAvatar.propTypes = {
  user: PropTypes.string,
};
UserAvatar.defaultProps = {
  user: 'guest',
};

export default UserAvatar;
