import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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
  zoomControl: {
    textAlign: 'right',
  },
  zoomOutButton: {

  }
});

class TextFields extends React.Component {
  state = {
    name: 'Borrower 1',
    preapprovalAmount: "$"
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <Paper style={{ marginTop: '66px', marginRight: '300px' }}>
        <form className={classes.container} noValidate autoComplete="off">
          <TextField
            id="borrower-name"
            label="Borrower Name"
            className={classes.textField}
            value={this.state.name}
            onChange={this.handleChange('borrowerName')}
            margin="normal"
          />
          <TextField
            id="preapproval-amount"
            label="Preapproval Amount"
            className={classes.textField}
            value={this.state.preapprovalAmount}
            placeholder="$"
            onChange={this.handleChange('preapprovalAmount')}
            margin="normal"
          />
        </form>
        <div className={classes.zoomControl}>
          <Button size="small" color="primary" align="right" className={classes.zoomOutButton}>
            Back to L.A.
          </Button>
        </div>
      </Paper>
    );
  }
}

TextFields.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TextFields);