import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import DoneIcon from '@material-ui/icons/Done';

import {
  saveBorrower,
} from './App/actions';

const styles = (theme) => ({
  modal: {
    padding: '20px'
  },
  actions: {
    marginTop: '30px'
  },
  iconLeft: {
    marginRight: '5px'
  }
});

class SubmitModal extends React.Component {
  onClickFinish = () => {
    this.props.modalClose();
    this.props.saveBorrower();
  }

  render() {
    const { classes } = this.props;

    return (
      <Dialog
        open={this.props.open}
      >
        <div className={classes.modal}>
          <DialogTitle>Thank you. Click "I'm Finished" to complete your submission.</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Click "+ Neighborhood" to add another location for this borrower.
            </DialogContentText>
            <DialogContentText>
              You will be able to add another borrower after finishing this one.
            </DialogContentText>
          </DialogContent>
          <DialogActions className={classes.actions}>
            <Button onClick={this.props.modalClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.props.addNeighborhood} variant="contained">
              <AddIcon mini className={classes.iconLeft} />
              Neighborhood
            </Button>
            <Button onClick={this.onClickFinish} color="primary" variant="contained">
              <DoneIcon mini className={classes.iconLeft} />
              I'm Finished
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    );
  }
}

export default withStyles(styles)(connect(
  null,
  dispatch => bindActionCreators({
    saveBorrower,
  }, dispatch),
)(SubmitModal));