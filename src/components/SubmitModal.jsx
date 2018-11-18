import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import blue from '@material-ui/core/colors/blue';


const styles = {
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
  dialogContentText: {
    marginBottom: '60px',
  }
};

class SubmitModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentWillMount() {
    this.setState({
      open: this.props.open
    })
  }

  // DO SOMETHING WHEN THEY SUBMIT
  handleSubmission = () => {
    console.log("does nothing yet");
  }

  render() {
    return (
      <Dialog
        open={this.props.open}
      >
        <DialogTitle>Thank you for your submission!</DialogTitle>
        <DialogContent>
          <DialogContentText>If you want to add an additional location for the current borrower, click here</DialogContentText>
        </DialogContent>
        <DialogContent>
          <DialogContentText>If you have a new borrower to add, click here</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.modalClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleClose} color="primary" variant="contained">
            I'm Finished
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default SubmitModal;