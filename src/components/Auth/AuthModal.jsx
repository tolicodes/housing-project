import { withStyles } from '@material-ui/core/styles';
import React from 'react';

// import LoginForm from './LoginForm';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Typography } from '@material-ui/core';

import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';
import SocialLogins from './SocialLogins';

const styles = {
  modal: {
    position: 'fixed',
    zIndex: 10000,
    width: 600,
    height: 600,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#f5f5f5',
    border: '1px solid #c2c2c2',
    padding: 20,
  },
  textField: {
    width: '100%',
  },
  or: {
    textAlign: 'center',
    fontWeight: 'bold'
  }
};

class AuthModal extends React.Component {
  state = {
    tabNumber: 0,
  };

  handleChange = (event, tabNumber) => {
    this.setState({ tabNumber });
  };

  render() {
    const { classes } = this.props;
    const { tabNumber } = this.state;

    return (
      <div className={classes.modal}>
        <Tabs
          value={tabNumber}
          onChange={this.handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Login" />
          <Tab label="Register" />
        </Tabs>
        {tabNumber === 0 &&
          <>
            <SocialLogins />
            <Typography className={classes.or}>OR</Typography>
            <LoginForm />
          </>
        }
        {tabNumber === 1 && <RegisterForm />}
      </div>
    );
  }
}

export default withStyles(styles)(AuthModal);
