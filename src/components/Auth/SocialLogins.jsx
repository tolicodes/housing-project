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
  textField: {
    width: '100%',
  },
};

const PROVIDERS = [
  'facebook',
  'linkedin',
  'google'
]

class SocialLogins extends React.Component {
  state = {};

  socket = getSocket()

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.socialButtonsContainer}>
        {PROVIDERS.map(provider =>
          <OAuth
            provider={provider}
            key={provider}
            socket={this.socket}
          />
        )}
      </div>
    );
  }
}

export default withStyles(styles)(SocialLogins);
