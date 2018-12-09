import React, { Component } from 'react';

import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';

import Header from './components/Header';
import Users from './components/Users';

const styles = {};

class Admin extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <Header />
        <Users />
      </div>

    );
  }
}

export default withStyles(styles)(connect(
  ({ app: { users } }) => ({
    users,
  }),
)(Admin));
