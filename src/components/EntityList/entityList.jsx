import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { companyApiProvider } from 'services/api/company/companyService';
import { Grid } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';

const columns = [
  { id: 'id', label: 'Company ID', minWidth: 100 },
  { id: 'organisationName', label: 'Company Name', minWidth: 170 },
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
  const [page, setPage] = useState(0);
  const [open, setOpen] = React.useState(false);
  const [anchorList,setAnchorList] = useState([]);
  const [vendorList,setVendorList] = useState([]);
  const [arrangerList,setArrangerList] = useState([]);
  const [selectedCompany,setSelectedCompany] = useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  useEffect(async ()=>{
const companyData = await companyApiProvider.getCompanyList();
setAnchorList(companyData.filter((company)=>company.tcapRelation=='anchor'))
setVendorList(companyData.filter((company)=>company.tcapRelation=='vendor'))
setArrangerList(companyData.filter((company)=>company.tcapRelation=='arranger'))
  },[])
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
const handleRowClick = (event,rowData) =>{
  setSelectedCompany(rowData);
  setOpen(true);
}
  return (
    <>
    <Modal
  open={open}
  onClose={()=>setOpen(false)}
  aria-labelledby="simple-modal-title"
  aria-describedby="simple-modal-description"
>
  <div  style={{top:'50%',left:'50%',transform: 'translate(-50%, -50%)', position: 'absolute',width: '400',backgroundColor:'lightgrey',padding:'10px'}}>
    <h2>{selectedCompany.organisationName}</h2>
    <h5>Address:{selectedCompany.address}</h5>
    <h5>Admin Name:{selectedCompany.adminName}</h5>
    <h5>TCAP Relationship{selectedCompany.tcapRelation}</h5>
    <h5>type:{selectedCompany.type}</h5>
    <h5>website:{selectedCompany.website}</h5>
    <h5>email:{selectedCompany.email}</h5>
    <h5>Approved Limi:{selectedCompany.approvedLimit}</h5>
    <h5>Available Limit:{selectedCompany.availableLimit}</h5>
    <h5>Expected Limit:{selectedCompany.expectedLimit}</h5>
  </div>
</Modal>
    <Grid container>
      <Grid item xs={6}>
        <h3>Anchors</h3>
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
            {anchorList
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id} onClick={(event) => handleRowClick(event, row)}>
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
        count={anchorList.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
    </Grid>
    <Grid item xs={6}>
    <h3>Vendors</h3>
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
            {vendorList
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id} onClick={(event) => handleRowClick(event, row)}>
                    {columns.map((column,index) => {
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
        count={vendorList.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
    </Grid>
    </Grid>
    </>
  );
}
