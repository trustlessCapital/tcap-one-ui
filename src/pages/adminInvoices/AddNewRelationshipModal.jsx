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
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { companyApiProvider } from 'services/api/company/companyService';
import { Link } from 'react-router-dom';
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

export default function AddNewRelationshipModal(props) {
  // userData;
  const classes = useStyles();
  const [entity, setEntity] = useState('');
  const [listUsers, setListUsers] = useState(null);
  const history = useHistory();
  const [view, setView] = useState(history.location.pathname);

  const handleChange = (event) => {
    setEntity(event.target.value);
  };

  let initObj = {
    approvalInvoice: [],
    tid: Math.floor(Math.random() * (999 - 100 + 1) + 100),
    vendorEmail: '',
    anchorEmail: '',
    status: '',
    relationship: '',
    relationshipYears: '',
    anchorContact: '',
    vendorContact: '',
    arrangerEmail: '',
    anchorApproverEmail: '',
    open: false,
    viewOnly: false,
  };
  const [state, setState] = useState(initObj);
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
  const tid = Math.floor(Math.random() * (999 - 100 + 1) + 100);
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
        vendorContact: state.vendorContact,
        anchorContact: state.anchorContact,
        anchorApproverEmail: state.anchorApproverEmail,
        arrangerEmail: state.arrangerEmail,
        // riskscore: state.riskscore
      });
      setState({
        approvalInvoice: joined,
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
  console.log(anchoreEmailVerify,vendoreEmailVerify);
    console.log(JSON.stringify(state.approvalInvoice[id]));
  await companyApiProvider.createCompanyRelationship(state.approvalInvoice[id]).then((response) => {
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
                            value={tid}
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
                            <option value="draft">Draft</option>
                            <option value="notactive">Not Active</option>
                            <option value="uapproval">Under approval</option>
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
                            <option value="Vendor">Vendor</option>
                            <option value="Anchor">Anchor</option>
                            <option value="Vendor/Anchor">Vendor/Anchor</option>
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
                    <input
                      type="text"
                      name="vendorContact"
                      className="addInvInput"
                      onChange={onChangeVendorContact}
                      required
                      value={state.vendorContact}
                    />
                  </div>
                </Grid>
                <Grid item md={6}>
                  <div className="addInvItem">
                    <label>Anchor POC</label>
                    <input
                      type="text"
                      name="anchorContact"
                      className="addInvInput"
                      onChange={onChangeAnchorContact}
                      required
                      value={state.anchorContact}
                    />
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
                                      <td align="center">{tid}</td>
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
                          <div>No Records Found</div>
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
