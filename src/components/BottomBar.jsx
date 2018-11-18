import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

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
    border: '1px solid red',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButton: {

  },
  submitText: {
    color: '#fff',
  },
});

function BottomAppBar(props) {
  // eslint-disable-next-line
  const { classes } = props;
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="fixed" color="primary" className={classes.appBar}>
        {/* <Toolbar className={classes.toolbar}>
          <Button variant="contained" color="secondary" size="large" aria-label="Submit" className={classes.submitButton}>
            <Typography className={classes.submitText}>Submit</Typography>
          </Button>
        </Toolbar> */}
        <div className={classes.toolbar}>
          <Button variant="contained" color="secondary" size="large" aria-label="Submit" className={classes.submitButton}>
            <Typography className={classes.submitText}>Submit</Typography>
          </Button>
        </div>
      </AppBar>
    </React.Fragment>
  );
}

export default withStyles(styles)(BottomAppBar);
