/* eslint-disable no-unused-vars */
import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Divider from '@mui/material/Divider';
import PropTypes from 'prop-types';
import UserAvatar from '../User/UserAvatar';

function TabItem({ name, id }) {
  return (
    <>
      <ListItem>
        <ListItemAvatar>
          <UserAvatar user={name} />
        </ListItemAvatar>
        <ListItemText primary={name} />
      </ListItem>
      <Divider />
    </>
  );
}

TabItem.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
};

TabItem.defaultProps = {
  name: '',
  id: '',
};

export default TabItem;
