import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import AuthModal from './Auth/AuthModal';
import { logout } from './Auth/api';

import { setUser, setAuthModalShown } from './Auth/actions';

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
  onClickLogin = () => {

    const { user } = this.props;
    if (user) {
      logout();
      this.props.setUser(null)
    } else {
      this.props.setAuthModalShown(true)
    }
  }

  closeLogin = () => {
    this.props.setAuthModalShown(false);
  }

  render() {
    const { classes, user, authModalShown } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="fixed" style={{ zIndex: 10000 }}>
          <Toolbar>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              Edison Blvd.
            </Typography>
            <Button
              color="inherit"
              onClick={this.onClickLogin}
            >
              {
                user
                  ? (
                    <div>
                      <img src={user.photo}/>
                      {user.name} - Logout
                    </div>
                  )
                  : 'Login / Register'
              }
            </Button>
          </Toolbar>
        </AppBar>

        {authModalShown && <AuthModal closeLogin={this.closeLogin} />}
      </div>
    );
  }
}

export default connect(
  ({ auth: { user, authModalShown } }) => ({
    user,
    authModalShown,
  }),
  dispatch => bindActionCreators({
    setUser,
    setAuthModalShown,
  }, dispatch)
)(withStyles(styles)(Header));
