/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { connect } from 'react-redux';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import { Navigate, Link } from 'react-router-dom';
import { login } from '../../reducers/authReducer';
import socket from '../../socket';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    const { login } = this.props;
    const loggedUser = await login({ username, password });
    if (loggedUser) {
      const { name, username, userId } = loggedUser.data.user;
      socket.auth = { name, username, userId };
      socket.connect();
    }
  };

  render() {
    const {
      username, password,
    } = this.state;
    const { data } = this.props;
    const user = data ? data.user.name : '';
    return (
      <>
        {user && (<Navigate to="/" />)}
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" onSubmit={this.handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="username"
                name="username"
                autoFocus
                defaultValue={username}
                onChange={(e) => this.setState({ username: e.target.value })}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                defaultValue={password}
                onChange={(e) => this.setState({ password: e.target.value })}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Login
              </Button>
              <Grid container>
                <Grid item>
                  <Link to="/signup">
                    <Typography variant="body1">
                      Don`t have an account? Sign Up
                    </Typography>
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.auth,
});

const mapDispatchToProps = {
  login,
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  data: PropTypes.shape({
    user: PropTypes.shape({
      name: PropTypes.string,
      username: PropTypes.string,
    }),
  }),
};

Login.defaultProps = {
  data: {
    user: {
      name: 'guest',
      username: 'guest',
    },
  },
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
