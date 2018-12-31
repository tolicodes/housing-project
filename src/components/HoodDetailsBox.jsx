import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    position: 'absolute',
    bottom: '150px',
    left: '60px',
    width: '300px',
    zIndex: '10000',
  },
  show: {
    display: 'block',
  },
  hide: {
    display: 'none',
  },
});

function HoodDetailsBox(props) {
  // eslint-disable-next-line
  const { classes, displayHoodDetails, name } = props;
  const showClass = displayHoodDetails ? classes.show : classes.hide;

  return (
    <div>
      <Paper className={`${classes.root} ${showClass}`} elevation={1}>
        <Typography variant="h5" component="h3">
          {name}
        </Typography>
      </Paper>
    </div>
  );
}

export default withStyles(styles)(HoodDetailsBox);
