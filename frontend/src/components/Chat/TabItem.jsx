/* eslint-disable no-unused-vars */
import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import Divider from '@mui/material/Divider';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledListItemText = styled(ListItemText)`
  color: #a5a4a4;
`;

function TabItem({
  name, username, id, setRoom, self, socketId, children,
}) {
  return (
    <>
      <ListItem onClick={self ? null : (e) => setRoom(e, name, username, id)} disablePadding>
        <ListItemButton>
          { children }
          {
            socketId
              ? <ListItemText primary={self ? `${name} (you)` : name} />
              : <StyledListItemText primary={name} />
          }
        </ListItemButton>
      </ListItem>
      <Divider />
    </>
  );
}

TabItem.propTypes = {
  name: PropTypes.string,
  username: PropTypes.string,
  id: PropTypes.string,
  socketId: PropTypes.string,
  setRoom: PropTypes.func.isRequired,
  children: PropTypes.node,
  self: PropTypes.bool,
};

TabItem.defaultProps = {
  name: '',
  username: '',
  id: '',
  children: '',
  self: false,
  socketId: null,
};

export default TabItem;
