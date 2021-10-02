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

const columns = [
  { id: 'code', label: 'Buyer ID', minWidth: 100 },
  { id: 'name', label: 'Company Name', minWidth: 170 },
  {
    id: 'population',
    label: 'Type of Company',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'GST',
    label: 'GST Number',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'Relationship',
    label: 'Relationship with TCAP',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'ApprovedLimit',
    label: 'Approved Limit',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
];

function createData(name, code, population, GST,Relationship,ApprovedLimit) {
  return { name, code, population, GST, Relationship,ApprovedLimit };
}

const rows = [
  createData('Wipro', '123','Company','u12hg3uh21uyg3u', 'Buyer', 3287263),
  createData('Tcs', '234','Company','u12hg3uh21uyg3u', 'Buyer', 9596961),
  createData('Infosys', '235','Company', 'u12hg3uh21uyg3u','Buyer', 301340),
  createData('Tcs States', '1245','Company','u12hg3uh21uyg3u', 'Buyer', 9833520),
  createData('Tcs', '73','Company', 'u12hg3uh21uyg3u','Buyer', 9984670),
  createData('Infosys', '2','Company', 'u12hg3uh21uyg3u','Buyer', 7692024),
  createData('Wipro', '5342','Company','u12hg3uh21uyg3u', 'Buyer', 357578),
  createData('Wipro', '423','Partnerhip LLP','u12hg3uh21uyg3u', 'Buyer', 70273),
  createData('Tcs', '12','Company', 'u12hg3uh21uyg3u','Buyer', 1972550),
  createData('Infosys', '34','Company', 'u12hg3uh21uyg3u','Buyer', 377973),
  createData('France', '76','Company', 'u12hg3uh21uyg3u','Seller', 640679),
  createData('Infosys ', '765','Company', 'u12hg3uh21uyg3u','Seller', 242495),
  createData('Infosys', '8','Company', 'u12hg3uh21uyg3u','Seller', 17098246),
  createData('Wipro', '8765','Company', 'u12hg3uh21uyg3u','Buyer/Seller', 923768),
  createData('Wipro', '234','Company', 'u12hg3uh21uyg3u','Buyer/Seller', 8515767),
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

export default function EntityList() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
