import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import withWidth from '@material-ui/core/withWidth';

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
    padding: '10px',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullWidth: {
    paddingRight: 0,
  },
  submitButton: {
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

  addNeighborhood = () => { 
    this.modalClose();
    this.props.addNeighborhood();
  }

  render() {
    // eslint-disable-next-line
    const { classes, width } = this.props;
    const { modalOpen } = this.state;

    const fullWidth = (['sm', 'xs'].includes(width)) ? classes.fullWidth : '';

    return (
      <React.Fragment>
        <AppBar position="fixed" className={classes.appBar + ' ' + fullWidth}>
          <Button
            variant="contained"
            size="large"
            className={classes.submitButton}
            onClick={this.onSubmit}
          >
            Submit
          </Button>
        </AppBar>

        <SubmitModal
          open={modalOpen}
          modalClose={this.modalClose}
          addNeighborhood={this.addNeighborhood}
        />
      </React.Fragment>
    );
  }
}

export default withWidth()(withStyles(styles)(BottomAppBar));
