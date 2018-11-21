import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import LoginModal from './Auth/LoginModal';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class Header extends Component {
  state = {
    showLogin: false,
  }

  onClickLogin = () => {
    this.setState({
      showLogin: true,
    })
  }

  render() {
    const { classes } = this.props;
    const { showLogin } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="fixed" style={{ zIndex: 10000 }}>

          <Toolbar>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              Danniels App
            </Typography>
            <Button
              color="inherit"
              onClick={this.onClickLogin}
            >
              Login

            </Button>
          </Toolbar>
        </AppBar>

        { showLogin && <LoginModal/> }
      </div>
    );
  }
}

export default withStyles(styles)(Header);
