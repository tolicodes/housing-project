import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'

import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';
import SocialLogins from './SocialLogins';
import { setUser } from './actions';

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
  state = {
    tabNumber: 0,
  };

  handleChange = (event, tabNumber) => {
    this.setState({ tabNumber });
  };

  handleModalClose = () => {
    // call our close login prop
    this.props.closeLogin();
  }

  render() {
    const { classes } = this.props;
    const { tabNumber } = this.state;

    return (
      <div className={classes.modal}>
        <Button onClick={this.handleModalClose}>x</Button>
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
            <SocialLogins
              setUser={this.props.setUser}
              closeModal={this.handleModalClose}
              />
            <Typography className={classes.or}>OR</Typography>
            <LoginForm
              closeModal={this.handleModalClose}
              setUser={this.props.setUser}
            />
          </>
        }
        {tabNumber === 1 && <RegisterForm
          setUser={this.props.setUser}
          closeModal={this.handleModalClose}
          />}
      </div>
    );
  }
}

export default connect(
  null,
  dispatch => bindActionCreators({
    setUser,
  }, dispatch)
)(withStyles(styles)(AuthModal));

