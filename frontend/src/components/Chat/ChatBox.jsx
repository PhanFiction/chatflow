import React from 'react';
import Grid from '@mui/material/Grid';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchUser } from '../../reducers/authReducer';
import UserAvatar from '../User/UserAvatar';

class ChatBox extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      user: null,
    };
  }

  componentDidMount() {
    // eslint-disable-next-line no-shadow
    const { fetchUser } = this.props;
    const user = fetchUser();
    if (user) {
      this.setState({ user: user.data });
    }
  }

  render() {
    const { user } = this.state;
    // todo
    // user submits a post, this will accept the user who posted it
    // this should contain all the chats
    return (
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
                <h3>{user}</h3>
                <ListItemText primary="This is a place where no man can reach. It's called Narnia. Your kids are special" />
              </Paper>
            </article>
          </Grid>
        </Grid>
      </ListItem>
    );
  }
}

const mapDispatchToProps = {
  fetchUser,
};

ChatBox.propTypes = {
  fetchUser: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(ChatBox);
