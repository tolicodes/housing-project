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
    zIndex: '10000',
    '@media screen and (max-width: 425px)': {
      height: '10px',
      bottom: '180px',
      left: '20px',
      textAlign: 'left',
      zIndex: '1000',
    },
  },
  name: {
    fontSize: '12px',
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
              <Typography variant="h5" component="h3" className={classes.name}>
                  {name}
                </Typography>
            </Paper>
        </div>
  );
}

export default withStyles(styles)(HoodDetailsBox);
