import React from 'react';

import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';

const styles = {};

const Admin = () => {

};

export default withStyles(styles)(connect(
  ({ app: { users } }) => ({
    users,
  }),
)(Admin));
