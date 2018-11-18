import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import { Typography, ExpansionPanel } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const drawerWidth = '300px';

const styles = () => ({
  root: {
    display: 'flex',
  },
  borrowers: {
    paddingTop: '64px',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
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
];

function ClippedDrawer(props) {
  // eslint-disable-next-line
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
      <Drawer
        anchor="right"
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <List className={classes.borrowers}>
          {borrowersHTML}
        </List>
      </Drawer>
    </div>
  );
}

export default withStyles(styles)(ClippedDrawer);
