import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

import Button from '@material-ui/core/Button';

import {
  saveBorrower,
} from './App/actions';

class SubmitModal extends React.Component {
  onClickFinish = () => {
    this.props.modalClose();
    this.props.saveBorrower();
  }

  render() {
    return (
      <Dialog
        open={this.props.open}
      >
        <DialogTitle>Thank you for your submission!</DialogTitle>
      
        <DialogActions>
          <Button onClick={this.props.modalClose} color="primary" variant="contained">
            Cancel
          </Button>
          <Button onClick={this.props.addNeighborhood} color="primary"  variant="contained">
            Add Another Neighborhood
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