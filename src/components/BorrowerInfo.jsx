import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { updateBorrower } from './App/actions'

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import withWidth from '@material-ui/core/withWidth';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
    padding: '0px',
  },
  paper: {
    marginTop: '64px',
    padding: '5px',
    '@media screen and (max-width: 425px)': {
      padding: '0px',
    }
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
    padding: 0,
    '@media screen and (max-width: 425px)': {
      width: '45%',
      marginBottom: '5px',
    }
  }
});

class BorrowerInfo extends React.Component {

  handleChange = name => event => {
    this.props.updateBorrower({
      ...this.props.borrower,
      [name]: event.target.value,
    });
  };

  render() {
    const { width, classes, borrower: {
      name,
      preapprovalAmount,
      purchasePrice
    } } = this.props;

    return (
      <Paper className={classes.paper}
      style={{
        marginRight: (['sm', 'xs'].includes(width)) ? 0 : '300px'
      }}>
        <form className={classes.container} noValidate autoComplete="off">
          <TextField
            label="Borrower Name"
            className={classes.textField}
            value={name}
            onChange={this.handleChange('name')}
            margin={(['sm', 'xs'].includes(width)) ? '' : "normal"}
          />
          <TextField
            label="Pre-approval Amount"
            className={classes.textField}
            value={preapprovalAmount}
            placeholder="$"
            onChange={this.handleChange('preapprovalAmount')}
            margin={(['sm', 'xs'].includes(width)) ? '' : "normal"}
          />
          <TextField
            label="Purchase Price"
            className={classes.textField}
            value={purchasePrice}
            placeholder="$"
            onChange={this.handleChange('purchasePrice')}
            margin={(['sm', 'xs'].includes(width)) ? '' : "normal"}
          />
        </form>
      </Paper>
    );
  }
}

export default withWidth()(withStyles(styles)(connect(
  ({ app: { borrowers, editBorrower } }) => {
    return {
      borrower: editBorrower
        ? borrowers.find(({ id }) => id === editBorrower)
        : borrowers[borrowers.length - 1]
    };
  },
  dispatch => bindActionCreators({
    updateBorrower,
  }, dispatch),
)(BorrowerInfo)));