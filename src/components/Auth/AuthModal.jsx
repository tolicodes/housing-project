import { withStyles } from '@material-ui/core/styles';
import React from 'react';

import Button from '@material-ui/core/Button';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import CloseIcon from '@material-ui/icons/Close';
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
  },
  closeButton: {
    position: 'absolute',
    top: '5px',
    right: '5px',
    color: 'red',
  }
};

class AuthModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 0,
    };
  }

  handleChange = (event, value) => {
    console.log("EVENT IS: ", event, "VALUE IS: ", value)
    this.setState({ value });
  };

  handleModalClose = () => {
    // call our close login prop
    this.props.closeLogin();
  }

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.modal}>
        <Tabs
          value={value}
          onChange={this.handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Login" />
          <Tab label="Register" />
        </Tabs>
        {value === 0 &&
          <div>
            <SocialLogins />
            <Typography className={classes.or}>OR</Typography>
            <LoginForm />
          </div>
        }
        {value === 1 && <RegisterForm />}

        <Button variant="transparent" mini aria-label="Close" className={classes.closeButton} onClick={this.handleModalClose}>
          <CloseIcon />
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(AuthModal);
