import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

import Button from '@material-ui/core/Button';

import {
  saveBorrower,
} from './App/actions';

class SubmitModal extends React.Component {
  onClickFinish = () => {
    this.props.saveBorrower();
  }

  render() {
    return (
      <Dialog
        open={this.props.open}
      >
        <DialogTitle>Thank you for your submission!</DialogTitle>
        
        <DialogContent>
          <DialogContentText>If you want to add an additional location for the current borrower, click here</DialogContentText>
          <DialogContentText>If you have a new borrower to add, click here</DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={this.props.modalClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.onClickFinish} color="primary" variant="contained">
            I'm Finished
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default connect(
  null,
  dispatch => bindActionCreators({
    saveBorrower,
  }, dispatch),
)(SubmitModal);