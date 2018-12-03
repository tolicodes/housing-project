import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import { getSocket } from './api';
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

  updateUser = ({ name, id, exists }) => {
    if (exists) {
      this.props.setUser({
        name,
        id,
      });
      this.props.closeModal();
    } else {
      alert('You are not registered yet. Go to the register tab');
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.socialButtonsContainer}>
        {PROVIDERS.map(provider =>
          <OAuth
            provider={provider}
            key={provider}
            socket={this.socket}
            updateUser={this.updateUser}
          />
        )}
      </div>
    );
  }
}

export default withStyles(styles)(SocialLogins);
