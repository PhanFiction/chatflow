import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import PropTypes from 'prop-types';
import UserAvatar from '../User/UserAvatar';

class Message extends React.PureComponent {
  render() {
    const { user, content, fromSelf } = this.props;
    return (
      <>
        {fromSelf === true && (
        <ListItem>
          <Grid container>
            <Grid item xs={9} sm={10} md={10}>
              <article style={{
                display: 'flex',
                marginTop: '3em',
                alignItems: 'center',
              }}
              >
                <ListItemIcon>
                  <UserAvatar user={user} style={{ marginRight: '20px' }} />
                </ListItemIcon>
                <Paper
                  elevation={3}
                  style={{
                    minWidth: '80%', padding: '0.5em', overflowWrap: 'anywhere',
                  }}
                >
                  <h3>{ user }</h3>
                  <ListItemText primary={content} />
                </Paper>
              </article>
            </Grid>
          </Grid>
        </ListItem>
        )}
        {fromSelf === false && (
        <ListItem>
          <Grid container>
            <Grid item xs={9} sm={10} md={10}>
              <article style={{ display: 'flex', marginTop: '3em', alignItems: 'center' }}>
                <Paper
                  elevation={3}
                  style={{
                    minWidth: '80%', padding: '0.5em', overflowWrap: 'anywhere',
                  }}
                >
                  <h3>{user}</h3>
                  <ListItemText primary={content} />
                </Paper>
                <ListItemIcon>
                  <UserAvatar user={user} />
                </ListItemIcon>
              </article>
            </Grid>
          </Grid>
        </ListItem>
        )}
      </>
    );
  }
}

Message.propTypes = {
  user: PropTypes.string,
  content: PropTypes.string,
  fromSelf: PropTypes.bool,
};

Message.defaultProps = {
  user: undefined,
  content: undefined,
  fromSelf: false,
};

export default Message;
