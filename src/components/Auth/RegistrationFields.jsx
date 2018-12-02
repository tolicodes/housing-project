import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { register, getSocket } from './api';
import OAuth from './OAuth';

const styles = {
  socialButtonsContainer: {
    marginTop: '40px',
    marginBottom: '30px',
    textAlign: 'center',
  },
  completeRegistration: {
    marginTop: '30px',
    textAlign: 'center',
    border: '1px solid blue',
  },
  textField: {
    width: '100%',
  },
  submit: {
    marginTop: '20px'
  }
};

const PROVIDERS = [
  'facebook',
  'linkedin',
  'google'
]

class RegistrationFields extends React.Component {
  state = {
    isLoggedInWithSocial: false,
  }

  socket = getSocket()

  updateRegistrationView = () => {
    console.log("OK THAT SEEMS TO MAKE SENSE")
    this.setState({
      isLoggedInWithSocial: !this.state.isLoggedInWithSocial
    })
  }

  render() {
    const { classes } = this.props;
    const { name, email, password, confirmPassword, mlsNumber, phone } = this.state;

    const Auth = PROVIDERS.map(provider =>
      <OAuth
        provider={provider}
        key={provider}
        socket={this.socket}
        update={this.updateRegistrationView}
      />
    );

    const { isLoggedInWithSocial } = this.state;

    const display = isLoggedInWithSocial ? (
      <div className={classes.completeRegistration}>
        <p>Nice! Please fill in the rest of the required fields to finish registering.</p>
        <TextField
          className={classes.textField}
          label="Email"
          value={email}
          onChange={this.props.handleChange('email')}
        />
        <TextField
          className={classes.textField}
          label="MLS #"
          value={mlsNumber}
          onChange={this.props.handleChange('mlsNumber')}
        />
        <TextField
          className={classes.textField}
          label="Phone"
          value={phone}
          onChange={this.props.handleChange('phone')}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={this.props.onClickSubmit}
          className={classes.submit}
        >
          Submit
        </Button>
      </div>
    ) : (
        <div>
          <div className={classes.socialButtonsContainer}>
            {Auth}
          </div>
          <TextField
            className={classes.textField}
            label="Name"
            value={name}
            onChange={this.props.handleChange('name')}
          />
          <TextField
            className={classes.textField}
            label="Email"
            value={email}
            onChange={this.props.handleChange('email')}
          />
          <TextField
            className={classes.textField}
            label="Password"
            type="password"
            value={password}
            onChange={this.props.handleChange('password')}
          />
          <TextField
            className={classes.textField}
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={this.props.handleChange('confirmPassword')}
          />
          <TextField
            className={classes.textField}
            label="MLS #"
            value={mlsNumber}
            onChange={this.props.handleChange('mlsNumber')}
          />
          <TextField
            className={classes.textField}
            label="Phone"
            value={phone}
            onChange={this.props.handleChange('phone')}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={this.props.onClickSubmit}
            className={classes.submit}
          >
            Submit
            </Button>
        </div>
      );

    return (
      display
    );
  }
}

export default withStyles(styles)(RegistrationFields);