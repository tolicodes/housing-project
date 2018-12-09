import React, { Component } from 'react';
import axios from 'axios';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Toolbar } from '@material-ui/core';

const styles = {
  root: {
    flexGrow: 1,
    marginTop: '100px',
    paddingLeft: '20px',
    paddingRight: '20px',
  },
  grow: {
    flexGrow: 1,
  },
  table: {
  },
  tableHead: {
    backgroundColor: '#9E9E9E',
  },
  tableHeadCell: {
    color: 'black'
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: '#f5f5f5',
    },
  },
};

class Users extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allUsers: [],
    };
  }

  componentDidMount() {
    this.getAllUsers();
  }

  getAllUsers = async () => {

    const { classes } = this.props;

    const { data: allUsers } = await axios.get('https://localhost:8081/users');
    console.log("Users are: ", allUsers);

    this.setState({ allUsers });
  }

  render() {
    const { classes } = this.props;
    const { allUsers } = this.state;

    console.log(allUsers)

    const displayUsers = allUsers.map((user, i) => {
      return (
        <ExpansionPanel key={i}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>{user.name}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Table className={classes.table}>
              <TableHead className={classes.tableHead}>
                <TableRow>
                  <TableCell className={classes.tableHeadCell}>Name</TableCell>
                  <TableCell className={classes.tableHeadCell}>Email</TableCell>
                  <TableCell className={classes.tableHeadCell}>Company</TableCell>
                  <TableCell className={classes.tableHeadCell}>NMLS #</TableCell>
                  <TableCell className={classes.tableHeadCell}>Phone</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.company}</TableCell>
                  <TableCell>{user.nmls_number}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </ExpansionPanelDetails>
          <ExpansionPanelDetails>
            <Table className={classes.table}>
              <TableHead className={classes.tableHead}>
                <TableRow>
                  <TableCell className={classes.tableHeadCell}>Borrower Name</TableCell>
                  <TableCell className={classes.tableHeadCell}>Neighborhoods</TableCell>
                  <TableCell className={classes.tableHeadCell}>Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {user.borrowers.map((borrower, i) => {
                  return (
                    <TableRow className={classes.row}>
                      <TableCell>{borrower.name}</TableCell>
                      <TableCell>{borrower.borrower_neighborhoods.map(({ name }) => name).join(', ')}</TableCell>
                      <TableCell>{borrower.preapprovalAmount}</TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      )
    })

    return (
      <div className={classes.root}>
        <h3>Users</h3>
        {displayUsers}
      </div>
    );
  }
}

export default withStyles(styles)(Users);
