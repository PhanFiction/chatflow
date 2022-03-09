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
        <ListItemText primary="This is a place where no man can reach. It's called Narnia. Your kids are special." />
      </Paper>
    </article>
  </Grid>
</Grid>
</ListItem>
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
        <UserAvatar style={{ marginRight: '20px' }} />
      </ListItemIcon>
      <Paper
        elevation={3}
        style={{
          minWidth: '80%', padding: '0.5em', overflowWrap: 'anywhere',
        }}
      >
        <h3>{user}</h3>
        <ListItemText primary="WorldHello WorldHello WorldHello WorldWorldHello WorldHello" />
      </Paper>
    </article>
  </Grid>
</Grid>
</ListItem>
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
        <h3>User</h3>
        <ListItemText primary="WorldHello WorldHello WorldHello WorldWorldHello WorldHello" />
      </Paper>
      <ListItemIcon>
        <Avatar style={{ marginLeft: '20px' }}>PT</Avatar>
      </ListItemIcon>
    </article>
  </Grid>
</Grid>
</ListItem>