import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';

class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      username: '',
      password: '',
      confirmPassword: '',
    };
  }

  render() {
    const {
      username, password, name, confirmPassword,
    } = this.state;
    return (
      <Container>
        <Typography component="h1">
          Register
        </Typography>
        <form>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <TextField
                label="Name"
                defaultValue={name}
                required
                onChange={(e) => this.setState({ name: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Username"
                defaultValue={username}
                required
                onChange={(e) => this.setState({ username: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                defaultValue={password}
                required
                onChange={(e) => this.setState({ name: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Confirm Password"
                defaultValue={confirmPassword}
                required
                onChange={(e) => this.setState({ name: e.target.value })}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </Container>
    );
  }
}

export default SignUp;
