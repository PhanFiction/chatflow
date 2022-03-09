import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Navigate, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { signUp } from '../../reducers/authReducer';

class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      username: '',
      password: '',
      confirmPassword: '',
      created: false,
    };
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password, name } = this.state;
    // eslint-disable-next-line no-shadow
    const { signUp } = this.props;
    const success = await signUp({ username, name, password });
    if (success) this.setState({ created: true });
  };

  render() {
    const {
      username, password, name, confirmPassword, created,
    } = this.state;
    const { user } = this.props;
    return (
      <>
        {created && (<Navigate to="/login" />)}
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
              Sign up
            </Typography>
            <Box component="form" noValidate onSubmit={this.handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={4}>
                <Grid item xs={12} md={12}>
                  <TextField
                    label="Name"
                    fullWidth
                    defaultValue={name}
                    required
                    onChange={(e) => this.setState({ name: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <TextField
                    label="Username"
                    fullWidth
                    defaultValue={username}
                    required
                    onChange={(e) => this.setState({ username: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <TextField
                    label="Password"
                    fullWidth
                    defaultValue={password}
                    required
                    onChange={(e) => this.setState({ password: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <TextField
                    label="Confirm Password"
                    fullWidth
                    defaultValue={confirmPassword}
                    required
                    onChange={(e) => this.setState({ confirmPassword: e.target.value })}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link to="/login">
                    <Typography variant="body1">
                      Already have an account? Sign in
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
  user: state.user,
});

const mapDispatchToProps = {
  signUp,
};

SignUp.propTypes = {
  signUp: PropTypes.func.isRequired,
  user: PropTypes.string,
};

SignUp.defaultProps = {
  user: null,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
