import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

export default function InvoiceList(props) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
    <Table className={classes.table} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>NFT ID</TableCell>
          <TableCell align="right">Amount Invested</TableCell>
          <TableCell align="right">Debt Amount</TableCell>
          <TableCell align="right">Due Date</TableCell>
          <TableCell align="right">Issue Date</TableCell>
          <TableCell align="right">APR</TableCell>
          <TableCell align="right">Redeemed Amount</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {props?.history?.map((row) => (
          <TableRow key={row.nftId}>
            <TableCell component="th" scope="row">
              {row.nftId}
            </TableCell>
            <TableCell align="right">{row.amountInvested}</TableCell>
            <TableCell align="right">{row.debtAmount}</TableCell>
            <TableCell align="right">{new Date(row.dueDate * 1000).toDateString()}</TableCell>
            <TableCell align="right">{new Date(row.issueDate * 1000).toDateString()}</TableCell>
            <TableCell align="right">{row.rate}</TableCell>
            <TableCell align="right">{row.redeemedAmount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  );
}
