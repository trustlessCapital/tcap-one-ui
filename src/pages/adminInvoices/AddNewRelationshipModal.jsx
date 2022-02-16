//import LgWidgets from '../../components/lgwidgets/LgWidgets'
//import SmWidgets from '../../components/smwidgets/SmWidgets'
//import AiWidgets from '../components/aiWidgets/AiWidgets'
// import "./newEntity.css";
//import Select from 'react-select';
import React, { Component, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Publish } from '@material-ui/icons';
// import { Component, useState } from "react";
import Dialog from '@material-ui/core/Dialog';
import Modal from "react-bootstrap/Modal";
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import 'react-phone-number-input/style.css'
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { companyApiProvider } from 'services/api/company/companyService';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import { getCountries, getCountryCallingCode } from 'react-phone-number-input'
import Button from 'react-bootstrap/Button';
import { useHistory } from "react-router-dom";
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
import Sidebar from './Sidebar';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PhoneInput from 'react-phone-number-input/input'
import en from 'react-phone-number-input/locale/en.json'
import Container from "react-bootstrap/Container"

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    flexGrow: 1,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    verticalAlign: 'center',
    marginTop: theme.typography.pxToRem(8),
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

const CountrySelect = ({ value, onChange, labels, ...rest }) => (
  <select
    {...rest}
    value={value}
    onChange={event => onChange(event.target.value || undefined)}>
    <option value="">
      {labels['ZZ']}
    </option>
    {getCountries().map((country) => (
      <option key={country} value={country}>
        {labels[country]} +{getCountryCallingCode(country)}
      </option>
    ))}
  </select>
)

CountrySelect.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  labels: PropTypes.objectOf(PropTypes.string).isRequired
}

export default function AddNewRelationshipModal(props) {
  // userData;
  const classes = useStyles();
  const [entity, setEntity] = useState('');
  const [listUsers, setListUsers] = useState(null);
  const history = useHistory();
  const [view, setView] = useState(history.location.pathname);
  const [anchorCountry, setAnchorCountry] = useState('IN')
  const [vendorCountry, setVendorCountry] = useState('IN')
  

  const handleChange = (event) => {
    setEntity(event.target.value);
  };
  
  const data = props.rowData;
  const initObj = {
    approvalInvoice: [],
    tid : '',
    vendorEmail: data?.vendorEmail,
    anchorEmail: data?.anchorEmail,
    status: data?.status,
    relationship: data?.relationship,
    relationshipYears: data?.relationshipYears,
    anchorContact: data?.anchorContact,
    vendorContact: data?.vendorContact,
    arrangerEmail: data?.arrangerEmail,
    anchorApproverEmail: data?.anchorApproverEmail,
    open: false,
    viewOnly: false,
  };
  
  const [state, setState] = useState(initObj);
  const [valueVendor, setValueVendor] = useState(data?.vendorContact);
  const [valueAnchor, setValueAnchor] = useState(data?.anchorContact);

  // Form Events
  // onChangeTid(e) {
  //   this.setState({ tid: e.target.value });
  // }
  const onChangeVendorEmail = (e) => {
    setState({ ...state, vendorEmail: e.target.value });
  };
  const onChangeStatus = (e) => {
    setState({ ...state, status: e.target.value });
  };
  const onChangeAnchorContact = (e) => {
    setState({ ...state, anchorContact: e.target.value });
  };
  const onChangeRelationshipYears = (e) => {
    setState({ ...state, relationshipYears: e.target.value });
  };
  const onChangeAnchorApproverEmail = (e) => {
    setState({ ...state, anchorApproverEmail: e.target.value });
  };
  const onChangeVendorContact = (e) => {
    setState({ ...state, vendorContact: e.target.value });
  };
  const onChangeAnchorEmail = (e) => {
    setState({ ...state, anchorEmail: e.target.value });
  };
  const onChangeRelationship = (e) => {
    setState({ ...state, relationship: e.target.value });
  };
  const onChangeArrangerEmail = (e) => {
    setState({ ...state, arrangerEmail: e.target.value });
  };
  const onChangeRiskscore = (e) => {
    setState({ ...state, riskscore: e.target.value });
  };

  const handleViewOnly = () => {
    setState({ ...state, viewOnly: !state.viewOnly });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setState({ ...state, open: true });
    console.log(e.target.value);
  };
 
  const onHandleClose = (e) => {
    if (e.target.firstChild.data == 'No') {
      setState({ ...state, open: false });
    } else {
      var joined = state.approvalInvoice.concat({
        vendorEmail: state.vendorEmail,
        anchorEmail: state.anchorEmail,
        relationship: state.relationship,
        status: state.status,
        relationshipYears: state.relationshipYears,
        vendorContact: valueVendor,
        anchorContact: valueAnchor,
        anchorApproverEmail: state.anchorApproverEmail,
        arrangerEmail: state.arrangerEmail,
        // riskscore: state.riskscore
      });
      setValueAnchor('');
      setValueVendor('');
      setState({
        approvalInvoice: joined,
        tid :  Math.floor(Math.random() * (999 - 100 + 1) + 100),
        vendorEmail: '',
        anchorEmail: '',
        // riskscore: '',
        status: '',
        relationship: '',
        vendorContact: '',
        anchorContact: '',
        anchorApproverEmail: '',
        arrangerEmail: '',
        relationshipYears: '',
        open: false,
        viewOnly: false,
      });
    }
  };
  const onClickDone = () => {
    history.push('/');
  }
  const createRelationship = async (event) =>{
    const id = event.target.id;
    const anchoreEmailVerify = await companyApiProvider.verifyEmail(state.approvalInvoice[id].anchorEmail);
    const vendoreEmailVerify = await companyApiProvider.verifyEmail(state.approvalInvoice[id].vendorEmail);

    console.log('Request', JSON.stringify(state.approvalInvoice[id]));
  await companyApiProvider.createCompanyRelationship(state.approvalInvoice[id]).then((response) => {
    console.log('Response', JSON.stringify(response));
    if(response.id){
     alert("Relationship Created!!!");
    }
    else
    {
      alert('something went wrong. please retry');
     }
  })
 };
  useEffect(() => {
    return history.listen((location) => {
      setView(location.pathname);
    });
  }, [history]);
  useEffect(async ()=>{
      const Data = await companyApiProvider.getCompanyList();
      const jData = JSON.stringify(Data);
      const companyData = JSON.parse(jData);
      setListUsers(companyData);
      console.log("company Data", companyData);
  },[]);
  // componentWillUpdate(nextProps, nextState) {
  //   // localStorage.setItem("user", JSON.stringify(nextState));
  // }
    const privKey = localStorage.getItem("privKey");
  return (

    <Modal
        {...props}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add New Relationship
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
    <div className="mp"> 
    <div className="addInvPage">
      <h3 className="addInvPageTitle">Seller Buyer Relationship</h3>
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
              Are you sure you want to submit the Entity?
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
          <Accordion>
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
                <Grid item md={12}>
                  <form className="addInvForm" >
                    <Grid container spacing={3}>
                      <Grid item xs={6}>
                        <div className="addInvItem">
                          <label>Relationship ID</label>
                          <input
                            type="text"
                            name="tid"
                            className="addInvInput"
                            readOnly
                            value={state.tid}
                          />
                        </div>
                      </Grid>
                      <Grid item md={6}>
                        <div className="addInvItem">
                          <label>Vendor Name</label>
                          <select
                            className="addInvInput"
                            name="vnameEmail"
                            onChange={onChangeVendorEmail}
                            required
                            value={state.vendorEmail}
                          >
                            <option value="">--Select--</option>
                            {listUsers && listUsers.filter(user => user.tcapRelation === "vendor").map((user)=>{
                              return(
                                <option value={user.email}>{user.organisationName}</option>
                              )
                            })}
                          </select>
                        </div>
                      </Grid>
                      <Grid item md={6}>
                        <div className="addInvItem">
                          <label>Anchor Name</label>
                          <select
                            className="addInvInput"
                            name="anchorEmail"
                            onChange={onChangeAnchorEmail}
                            required
                            value={state.anchorEmail}
                          >
                            <option value="">--Select--</option>
                            {listUsers && listUsers.filter(user => user.tcapRelation === "anchor").map((user)=>{
                              return(
                                <option value={user.email}>{user.organisationName}</option>
                              )
                            })}
                          </select>
                        </div>
                      </Grid>
                      <Grid item md={6}>
                        <div className="addInvItem">
                          <label>Status</label>
                          <select
                            className="addInvInput"
                            name="status"
                            onChange={onChangeStatus}
                            required
                            value={state.status}
                          >
                            <option value="">--Select--</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                            <option value="open">Open</option>
                            <option value="close">Close</option>
                            <option value="approved">Approved</option>
                            <option value="rejected">Rejected</option>
                            <option value="pending">Pending</option>
                          </select>
                        </div>
                      </Grid>
                      <Grid item xs={6}>
                        <div className="addInvItem">
                          <label>Relationship Type</label>
                          <select
                            className="addInvInput"
                            name="relationshiptype"
                            onChange={onChangeRelationship}
                            required
                            value={state.relationship}
                          >
                            <option value="">--Select--</option>
                            <option value="vendor">Vendor</option>
                            <option value="anchor">Anchor</option>
                            <option value="arranger">Arranger</option>
                          </select>
                        </div>
                      </Grid>
                      <Grid item md={6}>
                        <div className="addInvItem">
                          <label>No. of yrs of relationship</label>
                          <input
                            type="number"
                            name="firstpublished"
                            className="addInvInput"
                            onChange={onChangeRelationshipYears}
                            required
                            value={state.relationshipYears}
                          />
                        </div>
                      </Grid>
                      {/* <Grid item md={6}>
                        <div className="addInvItem">
                          <label>Credit Risk Score</label>
                          <input
                            type="text"
                            name="riskscore"
                            className="addInvInput"
                            onChange={onChangeRiskscore}
                            required
                            value={state.riskscore}
                          />
                        </div>
                      </Grid> */}
                    </Grid>
                  </form>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="contactinfo"
              id="contactinfo"
            >
              <Typography className={classes.heading}>
                CONTACT INFORMATION
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={3}>
                <Grid item md={6}>
                  <div className="addInvItem">
                    <label>Vendor POC</label>
                    <CountrySelect
                      labels={en}
                      value={vendorCountry}
                      onChange={setVendorCountry}/>
                    <PhoneInput
                      country={vendorCountry}
                      name="vendorContact"
                      value={valueVendor}
                      onChange={setValueVendor}/>
                  </div>
                </Grid>
                <Grid item md={6}>
                  <div className="addInvItem">
                    <label>Anchor POC</label>
                    <CountrySelect
                      labels={en}
                      value={anchorCountry}
                      onChange={setAnchorCountry}/>
                    <PhoneInput
                      country={anchorCountry}
                      name="anchorContact"
                      value={valueAnchor}
                      onChange={setValueAnchor}/>
                  </div>
                </Grid>
                <Grid item md={6}>
                  <div className="addInvItem">
                    <label>Anchor Approver Email</label>
                    <input
                      type="text"
                      name="aapprover"
                      className="addInvInput"
                      onChange={onChangeAnchorApproverEmail}
                      required
                      value={state.anchorApproverEmail}
                    />
                  </div>
                </Grid>
                <Grid item md={6}>
                  <Grid item md={6}>
                    <div className="addInvItem">
                      <label>Arranger Email</label>
                          <select
                            className="addInvInput"
                            name="arrangerEmial"
                            onChange={onChangeArrangerEmail}
                            required
                            value={state.arrangerEmail}
                          >
                            <option value="">--Select--</option>
                            {listUsers && listUsers.filter(user => user.tcapRelation === "arranger").map((user)=>{
                              return(
                                <option value={user.email}>{user.email}</option>
                              )
                            })}
                          </select>
                        </div>
                      </Grid>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
          <div className={classes.root}>
                <Grid container spacing={3}>
                  <Grid item xs={12}></Grid>
                  <Grid item xs={12}>
                    <Paper className={classes.paper}>
                      <div>
                        {state.approvalInvoice.length > 0 ? (
                          <table>
                            <tbody>
                              <tr>
                                <td>
                                  <thead>Relationship ID</thead>
                                </td>
                                <td>
                                  <thead>Vendor Name</thead>
                                </td>
                                <td>
                                  <thead>Anchor Name</thead>
                                </td>
                                <td>
                                  <thead>Status</thead>
                                </td>
                                {/* <td>
                                  <thead>Credit Risk Score</thead>
                                </td> */}
                                <td>
                                  <thead>Arranger</thead>
                                </td>
                                <td>
                                  <thead>Vendor POC</thead>
                                </td>
                                <td>
                                  <thead>Anchor POC</thead>
                                </td>
                              </tr>

                              {state.approvalInvoice.length > 0 &&
                                state.approvalInvoice.map((invoice, index) => {
                                  return (
                                    <tr key={index}>
                                      <td align="center">{state.tid}</td>
                                      {listUsers && listUsers.filter(user => user.email === invoice.vendorEmail).map((user)=>{
                                        return(
                                          <td>{user.organisationName}</td>
                                        )
                                      })}
                                      {listUsers && listUsers.filter(user => user.email === invoice.anchorEmail).map((user)=>{
                                        return(
                                          <td>{user.organisationName}</td>
                                        )
                                      })}
                                      <td>{invoice.status}</td>
                                      {/* <td>{invoice.riskscore}</td> */}
                                      <td>{invoice.arrangerEmail}</td>
                                      <td>{invoice.vendorContact}</td>
                                      <td>{invoice.anchorContact}</td>
                                      <td>
                                        <Button id={index} onClick={createRelationship} variant="danger">Approve</Button>
                                      </td>
                                    </tr>
                                  );
                                })}
                            </tbody>
                          </table>
                        ) : (
                          <div>No Records Added</div>
                        )}
                      </div>
                    </Paper>
                  </Grid>
                </Grid>
              </div>
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
            <div>No Invoices for approval</div> 
          )}*/}
          
      </div>
    </div>
      </div>
      </Modal.Body>
        <Modal.Footer>
          <Button className="Add" onClick={handleSubmit} type='submit'>Add</Button>
          <Button className="Done" onClick={onClickDone} type='submit'>Done</Button>
      </Modal.Footer>
    </Modal>
  );
}
