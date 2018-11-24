import { withStyles } from '@material-ui/core/styles';
import React from 'react';

// import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const styles = {
  modal: {
    position: 'fixed',
    zIndex: 10000,
    width: 600,
    height: 600,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    padding: 20,
  },
  textField: {
    width: '100%',
  },
};

class AuthModal extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.modal}>
        <RegisterForm />
      </div>
    );
  }
}

export default withStyles(styles)(AuthModal);
