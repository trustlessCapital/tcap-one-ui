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
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';
import ReactPhoneInput from 'react-phone-input-material-ui';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/high-res.css'
import Modal from '@material-ui/core/Modal';
import DialogWidget from 'components/DialogWideget/DialogWidget';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import { dialogDemoData } from 'stub/stub' ;
import { companyRelationshipDemoData } from 'stub/stub';

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

export default function EntityList(props) {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [open, setOpen] = React.useState(false);
  const [anchorList,setAnchorList] = useState([]);
  const [vendorList,setVendorList] = useState([]);
  const [arrangerList,setArrangerList] = useState([]);
  const [openSnackbar,setOpenSnackbar] = useState(false);
  const [selectedCompany,setSelectedCompany] = useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [openDialog,setDialogOpen] = useState(false);
  const [createRelationshipOpen,setCreateRelationshipOpen] = useState(false);
  const [companyRelationship,setCompanyRelationship] = useState(companyRelationshipDemoData);

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
const createRelationship = async () =>{
  const anchoreEmailVerify = await companyApiProvider.verifyEmail(companyRelationship.anchorEmail);
  const vendoreEmailVerify = await companyApiProvider.verifyEmail(companyRelationship.vendorEmail);
  console.log(anchoreEmailVerify,vendoreEmailVerify);
  await companyApiProvider.createCompanyRelationship(companyRelationship).then((response) => {
    if(response.id){
     setOpenSnackbar(true);
     setCreateRelationshipOpen(false);
    }
    else
    {
      alert('something went wrong. please retry');
      setCreateRelationshipOpen(false);
     }
  })
 }
  return (
    <>
    <Button onClick={()=>setCreateRelationshipOpen(true)}>
          Create New Relationship
        </Button>
    <Dialog open={createRelationshipOpen} onClose={()=>setCreateRelationshipOpen(false)}>
        <DialogTitle>Create Relationship</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To create relationship between two companies, please enter valid email address for anchor and vendor.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="vendoremail"
            label="Vendor Email Address"
            type="email"
            fullWidth
            variant="standard"
            onChange={(e)=>setCompanyRelationship({...companyRelationship,vendorEmail:e.target.value})}
          />
          <TextField
            autoFocus
            margin="dense"
            id="anchoremail"
            label="Anchor Email Address"
            type="email"
            fullWidth
            variant="standard"
            onChange={(e)=>setCompanyRelationship({...companyRelationship,anchorEmail:e.target.value})}
          />
          <TextField id="relationshipyears" type='number' label="Relationship in Years" value={companyRelationship.relationshipYears} onChange={(e)=>setCompanyRelationship({...companyRelationship,relationshipYears:e.target.value})}/>
          <br></br>
<FormControl >
        <InputLabel htmlFor="relationship">Relationship</InputLabel>
        <Select
          native
          value={companyRelationship.relationship}
          onChange={(e)=>setCompanyRelationship({...companyRelationship,relationship:e.target.value})}
          inputProps={{
            name: 'relationship',
            id: 'relationship',
          }}
        >
          <option value='anchor'>Anchor</option>
          <option value='vendor'>Vendor</option>
          <option value='arranger'>Arranger</option>
        </Select>
      </FormControl>
      <br></br>
      <FormControl >
        <InputLabel htmlFor="status">Status</InputLabel>
        <Select
          native
          value={companyRelationship.relationship}
          onChange={(e)=>setCompanyRelationship({...companyRelationship,status:e.target.value})}
          inputProps={{
            name: 'status',
            id: 'status',
          }}
        >
          <option value='active'>Active</option>
          <option value='inactive'>Inactive</option>
        </Select>
      </FormControl><br></br>
      
      <label>Vendor Contact<sup className="required">*</sup></label> 
      <PhoneInput
  country={'in'}
  value={companyRelationship.vendorContact}
  onChange={(value)=>setCompanyRelationship({...companyRelationship,vendorContact:value})}
  required='true'
  inputStyle={{ width: '100%' }}
/>
<label>Anchor Contact<sup className="required">*</sup></label> 
<PhoneInput
  country={'in'}
  value={companyRelationship.anchorContact}
  onChange={(value)=>setCompanyRelationship({...companyRelationship,anchorContact:value})}
  required='true'
  inputStyle={{ width: '100%' }}
/>
<TextField
            autoFocus
            margin="dense"
            id="anchorapproveremail"
            label="Anchor Approver Email"
            type="email"
            fullWidth
            variant="standard"
            onChange={(e)=>setCompanyRelationship({...companyRelationship,anchorApproverEmail:e.target.value})}
          />
          <TextField
            autoFocus
            margin="dense"
            id="arrangeremail"
            label="Arranger Email"
            type="email"
            fullWidth
            variant="standard"
            onChange={(e)=>setCompanyRelationship({...companyRelationship,arrangerEmail:e.target.value})}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>setCreateRelationshipOpen(false)}>Cancel</Button>
          <Button onClick={createRelationship}>Create</Button>
        </DialogActions>
      </Dialog>
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
