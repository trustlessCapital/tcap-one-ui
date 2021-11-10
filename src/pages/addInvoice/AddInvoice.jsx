//import LgWidgets from '../../components/lgwidgets/LgWidgets'
//import SmWidgets from '../../components/smwidgets/SmWidgets'
//import AiWidgets from '../components/aiWidgets/AiWidgets'
import './addInvoice.css';
//import Select from 'react-select';
import React, { Component, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Publish } from '@material-ui/icons';
// import { Component, useState } from "react";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import { documentApiProvider } from 'services/api/document/documentService';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    flexGrow: 1,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  buttonMargin: {
    margin: theme.spacing(2),
  },
}));

export default function AddInvoice() {
  // userData;
  const classes = useStyles();
  const [entity, setEntity] = useState('');

  const handleChange = (event) => {
    setEntity(event.target.value);
  };

  let initObj = {
    approvalInvoice: [],
    tid: Math.floor(Math.random() * (999 - 100 + 1) + 100),
    invno: '',
    vname: '',
    aname: '',
    vloc: '',
    aloc: '',
    ptype: '',
    invdt: '',
    duedt: '',
    invamt: '',
    paydt: '',
    irate: '',
    arrname: '',
    invurl: '',
    ctype: '',
    polinenum: '',
    grnsrnDate: '',
    grnsrnnum: '',
    ewaynum: '',
    ewaybilldt: '',
    popinum: '',
    ewayapproved: '',
    commodity: '',
    open: false,
    viewOnly: false,
    approveName: '',
    submitapproval: '',
    approve: '',
  };
  const [state, setState] = useState(initObj);
  const [steps,setSteps] = useState(1);
  const [documentDetails,setDocumentDetails] = useState(null);
  // Form Events
  // onChangeTid(e) {
  //   this.setState({ tid: e.target.value });
  // }
  const onChangeInvNo = (e) => {
    setState({ ...state, invno: e.target.value });
  };
  const onChangeApproveName = (e) => {
    setState({ ...state, approveName: e.target.value });
  };
  const onChangeApprove = (e) => {
    setState({ ...state, approve: e.target.value });
  };
  const onChangeVname = (e) => {
    setState({ ...state, vname: e.target.value });
  };
  const onChangeSubmitapproval = (e) => {
    setState({ ...state, submitapproval: e.target.value });
  };
  const onChangeEwaybilldate = (e) => {
    setState({ ...state, ewaybilldt: e.target.value });
  };
  const onChangeGrnsrnnum = (e) => {
    setState({ ...state, grnsrnnum: e.target.value });
  };
  const onChangeCommodity = (e) => {
    setState({ ...state, commodity: e.target.value });
  };
  const onChangeEwayapproved = (e) => {
    setState({ ...state, ewayapproved: e.target.value });
  };
  const onChangePopinum = (e) => {
    setState({ ...state, popinum: e.target.value });
  };
  const onChangeEwaynum = (e) => {
    setState({ ...state, ewaynum: e.target.value });
  };
  const onChangeGrnSrnDate = (e) => {
    setState({ ...state, grnsrnDate: e.target.value });
  };
  const onChangeCtype = (e) => {
    setState({ ...state, ctype: e.target.value });
  };
  const onChangePOlinenum = (e) => {
    setState({ ...state, polinenum: e.target.value });
  };
  const onChangeAname = (e) => {
    setState({ ...state, aname: e.target.value });
  };
  const onChangeVloc = (e) => {
    setState({ ...state, vloc: e.target.value });
  };
  const onChangeAloc = (e) => {
    setState({ ...state, aloc: e.target.value });
  };
  const onChangePtype = (e) => {
    setState({ ...state, ptype: e.target.value });
  };
  const onChangeInvDt = (e) => {
    setState({ ...state, invdt: e.target.value });
  };
  const onChangeDueDt = (e) => {
    setState({ ...state, duedt: e.target.value });
  };
  const onChangeInvAmt = (e) => {
    setState({ ...state, invamt: e.target.value });
  };
  const onChangePayDt = (e) => {
    setState({ ...state, paydt: e.target.value });
  };
  const onChangeIRate = (e) => {
    setState({ ...state, irate: e.target.value });
  };
  const onChangeArrName = (e) => {
    setState({ ...state, arrname: e.target.value });
  };
  const onChangeInvFile = (e) => {
    setState({ ...state, invurl: e.target.files[0]});
  };
  const uploadInvoice = async () => {
    const documentFormData = new FormData();
    // Update the formData object
    documentFormData.append(
      'document',
      state.invurl,
      state.invurl.name
    );
     const uploadSuccess = await documentApiProvider.submitDocuments(documentFormData);
     let userData = JSON.parse(localStorage.getItem('userData'));
     const serverUpload = await documentApiProvider.updateDocumentsToServer({
      //"companyId":companyCreateSuccessResponse.id, // this comes from?
      "companyId":userData.id,
      "userEmail":userData.email,
      "contentId":uploadSuccess.contenId,
      "version":"1",// this comes from?
      "type":'INV',// what are the other fields 
      "description":`invoice`, // static or getting from some other data?
      "comments":`its a ${state.invurl.name}`, // this comes from?
      "fileName": state.invurl.name,
      "fileKey" : uploadSuccess.fileKey
    })
    if(serverUpload.fileKey){
      setDocumentDetails(serverUpload);
      setSteps(2);
    }
  }
  const uploadInvoiceDetails = async () => {
    // const documentFormData = new FormData();
    // // Update the formData object
    // documentFormData.append(
    //   'document',
    //   state.invurl,
    //   state.invurl.name
    // );
    //  const uploadSuccess = await documentApiProvider.submitDocuments(documentFormData);
    //  let userData = JSON.parse(localStorage.getItem('userData'));
    //  const serverUpload = await documentApiProvider.updateDocumentsToServer({
    //   //"companyId":companyCreateSuccessResponse.id, // this comes from?
    //   "companyId":userData.id,
    //   "userEmail":userData.email,
    //   "contentId":uploadSuccess.contenId,
    //   "version":"1",// this comes from?
    //   "type":'INV',// what are the other fields 
    //   "description":`invoice`, // static or getting from some other data?
    //   "comments":`its a ${state.invurl.name}`, // this comes from?
    //   "fileName": state.invurl.name,
    //   "fileKey" : uploadSuccess.fileKey
    // })
    // if(serverUpload.fileKey){
    //   setSteps(2);
    // }
  }
  const handleViewOnly = () => {
    setState({ ...state, viewOnly: !state.viewOnly });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('are you sure you want to send for approval?');
    setState({ ...state, open: true });
    console.log(e.target.value);
  };

  const onHandleClose = (e) => {
    if (e.target.firstChild.data == 'No') {
      setState({ ...state, open: false });
    } else {
      var joined = state.approvalInvoice.concat({
        tid: state.tid,
        invno: state.invno,
        vname: state.vname,
        aname: state.aname,
        vloc: state.vloc,
        aloc: state.aloc,
        ptype: state.ptype,
        invdt: state.invdt,
        duedt: state.duedt,
        invamt: state.invamt,
        paydt: state.paydt,
        irate: state.irate,
        arrname: 'Arranger1',
        invurl: state.invurl,
      });
      setState({
        approvalInvoice: joined,
        tid: Math.floor(Math.random() * (999 - 100 + 1) + 100),
        invno: '',
        vname: '',
        aname: '',
        vloc: '',
        aloc: '',
        ptype: '',
        invdt: '',
        duedt: '',
        invamt: '',
        paydt: '',
        irate: '',
        arrname: '',
        invurl: '',
        open: false,
        viewOnly: false,
      });
    }
  };

  // componentWillUpdate(nextProps, nextState) {
  //   // localStorage.setItem("user", JSON.stringify(nextState));
  // }

  return (
    <div className="addInvPage">
      <h3 className="addInvPageTitle">Upload New Invoice</h3>
      {/* <Button>
          <Link to="/marketplace">Market Place</Link>
        </Button> */}
      <Grid container xs={12}>
        <Grid item xs={10}>
          <FormControlLabel
            control={
              <Switch
                checked={state.viewOnly}
                onChange={handleViewOnly}
                name="viewOnly"
                color="primary"
              />
            }
            label="View Only"
          />
        </Grid>
        <Grid item xs={2}>
          <Button variant="contained" className={classes.buttonMargin}>
            SAVE
          </Button>
          <Button
            variant="contained"
            color="primary"
            className={classes.buttonMargin}
          >
            SAVE AND CLOSE
          </Button>
        </Grid>
      </Grid>
      <div className="addInvPageWrapper">
        <Dialog
          open={state.open}
          onClose={onHandleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{'Submit Invoice?'}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to submit the invoice?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={onHandleClose} color="primary">
              No
            </Button>
            <Button onClick={onHandleClose} color="primary" autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
        <div className={classes.root}>
          {steps>0 && <Accordion color="primary">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="entity-details"
              id="entity-details"
            >
              <Typography className={classes.heading}>
                UPLOAD INVOICE
              </Typography>
              {/* <Button variant="contained"><Link to="/onboardentity">ADD NEW</Link></Button> */}
              {/* <Button variant="contained"> LOOKUP</Button> */}
            </AccordionSummary>
            <AccordionDetails>
              <div className={classes.root}>
                <Grid container spacing={3}>
                  {/* <Grid item xs={12} justifyContent="flex-end">
                     <Paper className={classes.paper}> 
                    <FormControl className={classes.formControl}>
                      <InputLabel id="demo-simple-select-label">
                        Select Entity
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={entity}
                        onChange={handleChange}
                      >
                        <MenuItem value={'Entity1'}>Entity 1</MenuItem>
                        <MenuItem value={'Entity2'}>Entity 2</MenuItem>
                        <MenuItem value={'Entity3'}>Entity 3</MenuItem>
                      </Select>
                    </FormControl>
                     </Paper> 
                  </Grid>
                  <Grid item xs={12}>
                    <Paper className={classes.paper}>
                      <div>
                        {state.approvalInvoice.length > 0 ? (
                          <table>
                            <tbody>
                              <tr>
                                <td>
                                  <thead>Tracking ID:</thead>
                                </td>
                                <td>
                                  <thead>Buyer Name:</thead>
                                </td>
                                <td>
                                  <thead>Product Type:</thead>
                                </td>
                                <td>
                                  <thead>Inv Date:</thead>
                                </td>
                                <td>
                                  <thead>Invoice Amt:</thead>
                                </td>
                                <td>
                                  <thead>Interest Rate:</thead>
                                </td>
                                <td>
                                  <thead>Action</thead>
                                </td>
                              </tr>

                              {state.approvalInvoice.length > 0 &&
                                state.approvalInvoice.map((invoice, index) => {
                                  return (
                                    <tr key={index}>
                                      <td>{invoice.tid}</td>
                                      <td>{invoice.vname}</td>
                                      <td>{invoice.ptype}</td>
                                      <td>{invoice.invdt}</td>
                                      <td>{invoice.invamt}</td>
                                      <td>{invoice.irate}</td>
                                      <td>
                                        <Button>Approve</Button>
                                      </td>
                                    </tr>
                                  );
                                })}
                            </tbody>
                          </table>
                        ) : (
                          <div>No Entity Selected</div>
                        )}
                      </div>
                    </Paper>
                  </Grid> */}
                  <Grid item xs={6}>
                        <div className="addInvItem">
                          <label>Upload Invoice</label>
                          <label htmlFor="file" className="labelFile">
                            <Publish />
                            <span>Select File</span>
                          </label>
                          <input
                            type="file"
                            id="file"
                            name="invfile"
                            style={{ display: 'none' }}
                            onChange={onChangeInvFile}
                          />
                         <label style={{float:'right'}}>{state.invurl.name}</label>
                        </div>
                      </Grid>
                      <Grid item xs={6}>
                        <div className="addInvItem">
                          <input
                            className="saveInvBtn"
                            type="submit"
                            value="Submit"
                            onClick={uploadInvoice}
                          />
                        </div>
                      </Grid>
                </Grid>
              </div>
            </AccordionDetails>
          </Accordion>}
          {steps>1 && <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="company-details"
              id="company-details"
            >
              <Typography className={classes.heading}>
                GENERAL INFORMATION
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <h3 className="addInvSectionTitle">Invoice Details</h3>
                </Grid>
                <Grid item xs={12}>
                  <form className="addInvForm" onSubmit={handleSubmit} disabled>
                    <Grid container spacing={3}>
                      <Grid item xs={6} justifyContent="flex-end">
                        <div className="addInvItem">
                          <label>Tracking ID</label>
                          <input
                            type="text"
                            name="tid"
                            className="addInvInput"
                            readOnly
                            value={state.tid}
                          />
                        </div>
                      </Grid>
                      <Grid item xs={6}>
                        <div className="addInvItem">
                          <label>Invoice No</label>
                          <input
                            type="text"
                            name="invNo"
                            className="addInvInput"
                            onChange={onChangeInvNo}
                            required
                            value={state.invno}
                          />
                        </div>
                      </Grid>
                      <Grid item xs={6}>
                        <div className="addInvItem">
                          <label>Buyer Name</label>
                          <select
                            className="addInvInput"
                            name="vname"
                            onChange={onChangeVname}
                            required
                            value={state.vname}
                          >
                            <option value="">--Select--</option>
                            <option value="Buyer1">Buyer1</option>
                            <option value="Buyer2">Buyer2</option>
                            <option value="Buyer3">Buyer3</option>
                          </select>
                        </div>
                      </Grid>
                      <Grid item xs={6}>
                        <div className="addInvItem">
                          <label>Seller Name</label>
                          <select
                            className="addInvInput"
                            name="aname"
                            onChange={onChangeAname}
                            required
                            value={state.aname}
                          >
                            <option value="">--Select--</option>
                            <option value="Seller1">Seller1</option>
                            <option value="Seller2">Seller2</option>
                            <option value="Seller3">Seller3</option>
                          </select>
                        </div>
                      </Grid>
                      <Grid item xs={6}>
                        <div className="addInvItem">
                          <label>Commodity Type</label>
                          <select
                            className="addInvInput"
                            name="ctype"
                            onChange={onChangeCtype}
                            required
                            value={state.ctype}
                          >
                            <option value="">--Select--</option>
                            <option value="Buyer1">Type 1</option>
                            <option value="Buyer2">Type 2</option>
                            <option value="Buyer3">Type 3</option>
                          </select>
                        </div>
                      </Grid>
                      <Grid item xs={6}>
                        <div className="addInvItem">
                          <label>Commodity</label>
                          <input
                            type="text"
                            className="addInvInput"
                            name="commodity"
                            onChange={onChangeCommodity}
                            required
                            value={state.commodity}
                          />
                        </div>
                      </Grid>
                      <Grid item xs={6}>
                        <div className="addInvItem">
                          <label>Buyer Location</label>
                          <input
                            type="text"
                            className="addInvInput"
                            name="vloc"
                            onChange={onChangeVloc}
                            required
                            value={state.vloc}
                          />
                        </div>
                      </Grid>
                      <Grid item xs={6}>
                        <div className="addInvItem">
                          <label>Seller Location</label>
                          <input
                            type="text"
                            className="addInvInput"
                            name="aloc"
                            onChange={onChangeAloc}
                            required
                            value={state.aloc}
                          />
                        </div>
                      </Grid>
                      <Grid item xs={6}>
                        <div className="addInvItem">
                          <label>PO Line Item number:</label>
                          <input
                            type="number"
                            className="addInvInput"
                            name="polinenum"
                            onChange={onChangePOlinenum}
                            required
                            value={state.polinenum}
                          />
                        </div>
                      </Grid>
                      <Grid item xs={6}>
                        <div className="addInvItem">
                          <label>PO/PI number:</label>
                          <input
                            type="number"
                            className="addInvInput"
                            name="popinum"
                            onChange={onChangePopinum}
                            required
                            value={state.popinum}
                          />
                        </div>
                      </Grid>
                      <Grid item xs={6}>
                        <div className="addInvItem">
                          <label>EWay bill number:</label>
                          <input
                            type="number"
                            className="addInvInput"
                            name="ewaynum"
                            onChange={onChangeEwaynum}
                            required
                            value={state.ewaynum}
                          />
                        </div>
                      </Grid>
                      <Grid item xs={6}>
                        <div className="addInvItem">
                          <label>EWay Bill Date</label>
                          <input
                            type="date"
                            className="addInvInput"
                            name="ewaybilldate"
                            onChange={onChangeEwaybilldate}
                            required
                            value={state.ewaybilldt}
                          />
                        </div>
                      </Grid>
                      <Grid item xs={6}>
                        <div className="addInvItem">
                          <label>Is EWay approved?</label>
                          <select
                            className="addInvInput"
                            name="ewayapproved"
                            onChange={onChangeEwayapproved}
                            required
                            value={state.ewayapproved}
                          >
                            <option value="">--Select--</option>
                            <option value="Y">Yes</option>
                            <option value="N">No</option>
                          </select>
                        </div>
                      </Grid>
                      <Grid item xs={6}>
                        <div className="addInvItem">
                          <label>Product Type</label>
                          <select
                            className="addInvInput"
                            name="ptype"
                            onChange={onChangePtype}
                            required
                            value={state.ptype}
                          >
                            <option value="">--Select--</option>
                            <option value="Hardware">Hardware</option>
                            <option value="Software">Software</option>
                            <option value="Food Items">Food Items</option>
                            <option value="Pharmaceuticals">
                              Pharmaceuticals
                            </option>
                            <option value="Services">Services</option>
                          </select>
                        </div>
                      </Grid>
                      <Grid item xs={6}>
                        <div className="addInvItem">
                          <label>Transaction Date</label>
                          <input
                            type="date"
                            className="addInvInput"
                            name="invDt"
                            onChange={onChangeInvDt}
                            required
                            value={state.invdt}
                          />
                        </div>
                      </Grid>
                      <Grid item xs={6}>
                        <div className="addInvItem">
                          <label>GRN/SRN Date</label>
                          <input
                            type="date"
                            className="addInvInput"
                            name="grnsrndate"
                            onChange={onChangeGrnSrnDate}
                            required
                            value={state.grnsrnDate}
                          />
                        </div>
                      </Grid>
                      <Grid item xs={6}>
                        <div className="addInvItem">
                          <label>GRN/SRN Number</label>
                          <input
                            type="number"
                            className="addInvInput"
                            name="grnsrnnum"
                            onChange={onChangeGrnsrnnum}
                            required
                            value={state.grnsrnnum}
                          />
                        </div>
                      </Grid>
                      <Grid item xs={6}>
                        <div className="addInvItem">
                          <label>Invoice Due Date</label>
                          <input
                            type="date"
                            className="addInvInput"
                            name="dueDt"
                            onChange={onChangeDueDt}
                            required
                            value={state.duedt}
                          />
                        </div>
                      </Grid>
                      <Grid item xs={6}>
                        <div className="addInvItem">
                          <label>Invoice Amount</label>
                          <input
                            type="number"
                            className="addInvInput"
                            name="invAmt"
                            onChange={onChangeInvAmt}
                            required
                            value={state.invamt}
                          />
                        </div>
                      </Grid>
                      <Grid item xs={6}>
                        <div className="addInvItem">
                          <label>Payout Date</label>
                          <input
                            type="date"
                            className="addInvInput"
                            name="payDt"
                            onChange={onChangePayDt}
                            required
                            value={state.paydt}
                          />
                        </div>
                      </Grid>
                      <Grid item xs={6}>
                        <div className="addInvItem">
                          <label>Interest Rate</label>
                          <input
                            type="number"
                            className="addInvInput"
                            name="iRate"
                            onChange={onChangeIRate}
                            required
                            value={state.irate}
                          />
                        </div>
                      </Grid>
                      <Grid item xs={6}>
                        <div className="addInvItem">
                          <label>Arranger</label>
                          <input
                            type="text"
                            value="Arranger1"
                            className="addInvInput"
                            readOnly
                            style={{ cursor: 'no-drop' }}
                            name="arrName"
                            value="Arranger1"
                            onChange={onChangeArrName}
                            required
                          />
                        </div>
                      </Grid>
                      <Grid item xs={12}>
                        <div className="addInvItem">
                          <label>Submit for approval</label>
                          <select
                            className="addInvInput"
                            name="submitapproval"
                            onChange={onChangeSubmitapproval}
                            required
                            value={state.submitapproval}
                          >
                            <option value="">--Select--</option>
                            <option value="Y">Yes</option>
                            <option value="N">No</option>
                          </select>
                        </div>
                      </Grid>
                      <Grid item xs={6}>
                        <div className="addInvItem">
                          <input
                            className="saveInvBtn"
                            type="submit"
                            value="Submit"
                            onClick={uploadInvoiceDetails}
                          />
                        </div>
                      </Grid>
                      {/* <Grid item xs={6}>
        <div className="addInvItem">
                <label>Upload Invoice</label>
                <label htmlFor="file" className="labelFile">
                  <Publish />
                  <span>Select File</span>
                </label>
                <input
                  type="file"
                  id="file"
                  name="invfile"
                  style={{ display: "none" }}
                  onChange={onChangeInvFile}
                />
              </div>
        </Grid> */}
                    </Grid>
                  </form>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>}
          {steps>2 && <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="Seller-approval"
              id="Seller-approval"
            >
              <Typography className={classes.heading}>
                Seller APPROVAL
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <div className="addInvItem">
                  <label>Invoice No</label>
                  <input
                    type="text"
                    name="approveName"
                    className="addInvInput"
                    onChange={onChangeApproveName}
                    required
                    value={state.approveName}
                  />
                </div>
              </Typography>
              <Typography>
                <div className="addInvItem">
                  <label>Invoice No</label>
                  <input
                    type="text"
                    name="approve"
                    className="addInvInput"
                    onChange={onChangeApprove}
                    required
                    value={state.approve}
                  />
                </div>
              </Typography>
            </AccordionDetails>
          </Accordion>}
        </div>

        {/* <h3 className="addInvSectionTitle">Approval Section</h3>
          {state.approvalInvoice.length > 0 ? (
            <table>
              <tbody>
                <tr>
                  <td>
                    <thead>Tracking ID:</thead>
                  </td>
                  <td>
                    <thead>Vendor Name:</thead>
                  </td>
                  <td>
                    <thead>Product Type:</thead>
                  </td>
                  <td>
                    <thead>Inv Date:</thead>
                  </td>
                  <td>
                    <thead>Invoice Amt:</thead>
                  </td>
                  <td>
                    <thead>Interest Rate:</thead>
                  </td>
                  <td>
                    <thead>Action</thead>
                  </td>
                </tr>

                {state.approvalInvoice.length > 0 &&
                  state.approvalInvoice.map((invoice, index) => {
                    return (
                      <tr key={index}>
                        <td>{invoice.tid}</td>
                        <td>{invoice.vname}</td>
                        <td>{invoice.ptype}</td>
                        <td>{invoice.invdt}</td>
                        <td>{invoice.invamt}</td>
                        <td>{invoice.irate}</td>
                        <td>
                          <Button>Approve</Button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          ) : (
            <div>No Invoices for approval</div> 
          )}*/}
      </div>
    </div>
  );
}
