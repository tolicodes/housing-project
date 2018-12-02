import React from 'react';

import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import { Typography, ExpansionPanel } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { Map, GeoJSON } from 'react-leaflet';
import { getCenter, MAPS } from './maps/utils';

import TitleLayer from './maps/TitleLayer';

const drawerWidth = '300px';

const styles = () => ({
  root: {
    display: 'flex',
  },
  heading: {
    fontWeight: 'bold',
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
  map: {
    width: '100%',
    height: 300,
  },
  neighborhoods: {
    flexDirection: 'column',
  },
});

const ZOOM = 11;

function ClippedDrawer(props) {
  // eslint-disable-next-line
  const { classes, borrowers } = props;

  const borrowersHTML = borrowers.map(({
    name,
    preapprovalAmount,
    neighborhoods,
    city,
  }, i) => (
    <ListItem
      key={name}
    >
      <ExpansionPanel className={classes.expansionPanel}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>
            {`Borrower ${i + 1}:`}
              &nbsp;
          </Typography>
          <Typography className={classes.secondaryHeading}>{name}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.neighborhoods}>
          <Typography className={classes.heading}>
              Neighborhoods:
            {' '}
          </Typography>
          {neighborhoods.join(', ')}
        </ExpansionPanelDetails>
        <ExpansionPanelDetails>
          <Typography className={classes.heading}>
              Amount:
            {' '}
          </Typography>
          <Typography>
            {' '}
            {preapprovalAmount}
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

export default withStyles(styles)(connect(
  ({ app: { borrowers } }) => ({
    borrowers,
  }),
)(ClippedDrawer));
