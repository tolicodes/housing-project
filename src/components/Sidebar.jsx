import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Typography, ExpansionPanel } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  borrowers: {
    paddingTop: '64px',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    paddingTop: '64px',
  },
  drawerPaper: {
    width: drawerWidth,
    paddingTop: '64px',
  },
  expansionPanel: {
    width: '100%',
  },
});

const borrowers = [
  {
    name: 'Sean Miller',
    amount: '50,000',
  },
  {
    name: 'Toli Zaslavskiy',
    amount: '500,000',
  },
];

function ClippedDrawer(props) {
  const { classes } = props;

  const borrowersHTML = borrowers.map(({ name, amount }, i) => (
    <ListItem>
      <ExpansionPanel className={classes.expansionPanel}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>
            {`Borrower ${i + 1}:`}
            &nbsp;
          </Typography>
          <Typography className={classes.secondaryHeading}>{name}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            Amount:
            {' '}
            $
            {amount}
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </ListItem>
  ));

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        anchor="right"
        styles={classes.drawer}
        variant="permanent"
      >
        <List className={classes.borrowers}>
          {borrowersHTML}
        </List>
      </Drawer>
    </div>
  );
}

ClippedDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ClippedDrawer);
