import React, { Component } from 'react';

import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const { REACT_APP_API_ROOT: API_ROOT } = process.env;
const API_URL = API_ROOT + '/users';

const styles = () => ({
  button: {
    width: '230px',
    height: '40px',
    marginBottom: '10px',
    backgroundColor: '#4267b2',
    color: '#fff'
  },
  facebook: {
    backgroundColor: '#4267b2',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#4267b2',
      color: '#fff',
      opacity: .7,
    }
  },
  google: {
    backgroundColor: '#fff',
    color: '#4285F4',
    '&:hover': {
      backgroundColor: '#fff',
      color: '#4285F4',
      opacity: .7,
    }
  },
  linkedin: {
    backgroundColor: '#0077B5',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#0077B5',
      color: '#fff',
      opacity: .7,
    }
  }
});

class OAuth extends Component {
  state = {
    user: {},
  }

  componentDidMount() {
    const { socket, provider } = this.props

    socket.on(provider, user => {
      this.popup.close()
      
      setTimeout(() => this.props.updateUser(user), 100);
    });
  }

  openPopup() {
    const { provider, socket } = this.props
    const width = 600, height = 600
    const left = (window.innerWidth / 2) - (width / 2)
    const top = (window.innerHeight / 2) - (height / 2)
    const url = `${API_URL}/${provider}?socketId=${socket.id}`

    return window.open(url, '',
      `toolbar=no, location=no, directories=no, status=no, menubar=no, 
      scrollbars=no, resizable=no, copyhistory=no, width=${width}, 
      height=${height}, top=${top}, left=${left}`
    )
  }

  startAuth(e) {
    e.preventDefault()
    this.popup = this.openPopup();
  }

  render() {
    const { name } = this.state.user;
    const { provider, classes } = this.props;

    return (
      <div>
        {name
          ? <h4>{`${provider} - Logged In - ${name}`}</h4>
          : (
            <Button
              variant="contained"
              onClick={this.startAuth.bind(this)}
              className={classes.button + ' ' + classes[provider]}
            >
              {provider}
            </Button>
          )
        }
      </div>
    );
  }
}

export default withStyles(styles)(OAuth);
