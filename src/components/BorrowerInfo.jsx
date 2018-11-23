import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { updateBorrower } from './App/actions'

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
});

class BorrowerInfo extends React.Component {

  handleChange = name => event => {
    this.props.updateBorrower({
      ...this.props.borrower,
      [name]: event.target.value,
    });
  };

  render() {
    const { classes, borrower: {
      borrowerName,
      borrowerAmount
    } } = this.props;

    return (
      <Paper style={{ marginTop: '64px', marginRight: '300px' }}>
        <form className={classes.container} noValidate autoComplete="off">
          <TextField
            label="Borrower Name"
            className={classes.textField}
            value={borrowerName}
            onChange={this.handleChange('borrowerName')}
            margin="normal"
          />
          <TextField
            label="Preapproval Amount"
            className={classes.textField}
            value={borrowerAmount}
            placeholder="$"
            onChange={this.handleChange('borrowerAmount')}
            margin="normal"
          />
        </form>
      </Paper>
    );
  }
}

export default withStyles(styles)(connect(
  ({ app: { borrowers } }) => {
    return {
      borrower: borrowers[borrowers.length - 1]
    };
  },
  dispatch => bindActionCreators({
    updateBorrower,
  }, dispatch),
)(BorrowerInfo));