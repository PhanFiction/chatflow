import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
    };
  }

  render() {
    const {
      username, password,
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
                onChange={(e) => this.setState({ password: e.target.value })}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
        </form>
      </Container>
    );
  }
}

export default Profile;
