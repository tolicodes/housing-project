import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import SubmitModal from './SubmitModal';

const styles = theme => ({
  text: {
    paddingTop: theme.spacing.unit * 2,
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
  },
  paper: {
    paddingBottom: 50,
  },
  list: {
    marginBottom: theme.spacing.unit * 2,
  },
  subHeader: {
    backgroundColor: theme.palette.background.paper,
  },
  appBar: {
    top: 'auto',
    bottom: 0,
    paddingRight: '300px',
  },
  toolbar: {
    padding: '10px',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButton: {

  },
  submitText: {
    fontWeight: 'bold',
    color: '#000',
  },
});

class BottomAppBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalOpen: false,
    };
  }

  // eslint-disable-next-line
  onSubmit = () => {
    this.setState({
      modalOpen: true,
    });
  }

  modalClose = () => {
    this.setState({
      modalOpen: false
    })
  }

  render() {
    // eslint-disable-next-line
    const { classes } = this.props;

    const { modalOpen } = this.state;

    return (
      <React.Fragment>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <div className={classes.toolbar}>
            <Button variant="contained" size="large" aria-label="Submit" className={classes.submitButton} onClick={this.onSubmit}>
              <Typography className={classes.submitText}>Submit</Typography>
            </Button>
          </div>
        </AppBar>
        <SubmitModal open={modalOpen} modalClose={this.modalClose} />
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(BottomAppBar);
