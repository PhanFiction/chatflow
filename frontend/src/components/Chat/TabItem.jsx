/* eslint-disable no-unused-vars */
import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import Divider from '@mui/material/Divider';
import PropTypes from 'prop-types';

function TabItem({
  name, id, setRoom, self, children,
}) {
  return (
    <>
      <ListItem onClick={self ? null : (e) => setRoom(e, name, id)} disablePadding>
        <ListItemButton>
          { children }
          <ListItemText primary={self ? `${name} (you)` : name} />
        </ListItemButton>
      </ListItem>
      <Divider />
    </>
  );
}

TabItem.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  setRoom: PropTypes.func.isRequired,
  children: PropTypes.node,
  self: PropTypes.bool,
};

TabItem.defaultProps = {
  name: '',
  id: '',
  children: '',
  self: false,
};

export default TabItem;
