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
import Input from '@material-ui/core/Input';

const { REACT_APP_API_ROOT: API_ROOT } = process.env;

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
  search: {
    width: '100%',
    marginBottom: '10px',
  }
};

class Users extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allUsers: [],
      search: '',
      filteredUsers: [],
    };
  }

  componentDidMount() {
    this.getAllUsers();
  }

  getAllUsers = async () => {
    const { data: allUsers } = await axios.get(API_ROOT + '/users');

    this.setState({
      allUsers,
      filteredUsers: [...allUsers]
    });
  }

  onChangeSearch = ({ target: {value} }) => {
    const { allUsers } = this.state;
    const filteredUsers = allUsers.filter(user => {
      const search = value.toLowerCase();
      return (
        user.name.toLowerCase().includes(search) ||
        user.email.toLowerCase().includes(search) ||
        user.company.toLowerCase().includes(search) ||
        user.nmls_number.toLowerCase().includes(search) ||
        user.phone.toLowerCase().includes(search)
      );
    });

    this.setState({
      search: value,
      filteredUsers: value ? filteredUsers : allUsers,
    })
  }

  render() {
    const { classes } = this.props;
    const { filteredUsers, search } = this.state;

    const displayUsers = filteredUsers.map((user, i) => {
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
                  <TableCell className={classes.tableHeadCell}>Preapproval Amount</TableCell>
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
        <Input
          className={classes.search}
          value={search}
          onChange={this.onChangeSearch}
          placeholder="Search users by name, email, company, nmls, or phone"
        />
        {displayUsers}
      </div>
    );
  }
}

export default withStyles(styles)(Users);
