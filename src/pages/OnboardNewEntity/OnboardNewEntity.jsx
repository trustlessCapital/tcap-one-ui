//import LgWidgets from '../../components/lgwidgets/LgWidgets'
//import SmWidgets from '../../components/smwidgets/SmWidgets'
//import AiWidgets from '../components/aiWidgets/AiWidgets'
import './newEntity.css';
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

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    flexGrow: 1,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
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

export default function OnboardNewEntity() {
  // userData;
  const classes = useStyles();
  const [entity, setEntity] = useState('');

  const handleChange = (event) => {
    setEntity(event.target.value);
  };

  let initObj = {
    approvalInvoice: [],
    vid: Math.floor(Math.random() * (999 - 100 + 1) + 100),
    cname: '',
    status: '',
    companytype: '',
    address: '',
    website: '',
    ptype: '',
    invct: '',
    duedt: '',
    limitexp: '',
    createdt: '',
    approvallimit: '',
    arrname: '',
    invurl: '',
    reltcap: '',
    pnum: '',
    grnsrnDate: '',
    availablelimit: '',
    gstnum: '',
    ewaybilldt: '',
    cinnum: '',
    ewayapproved: '',
    inccert: '',
    open: false,
    viewOnly: false,
    approveName: '',
    submitapproval: '',
    approve: '',
  };
  const [state, setState] = useState(initObj);
  // Form Events
  // onChangeTid(e) {
  //   this.setState({ tid: e.target.value });
  // }
  const onChangeCname = (e) => {
    setState({ ...state, cname: e.target.value });
  };
  const onChangeApproveName = (e) => {
    setState({ ...state, approveName: e.target.value });
  };
  const onChangeApprove = (e) => {
    setState({ ...state, approve: e.target.value });
  };
  const onChangeStatus = (e) => {
    setState({ ...state, status: e.target.value });
  };
  const onChangeSubmitapproval = (e) => {
    setState({ ...state, submitapproval: e.target.value });
  };
  const onChangeEwaybilldate = (e) => {
    setState({ ...state, ewaybilldt: e.target.value });
  };
  const onChangeAvailablelimit = (e) => {
    setState({ ...state, availablelimit: e.target.value });
  };
  const onChangeInccert = (e) => {
    setState({ ...state, inccert: e.target.value });
  };
  const onChangeEwayapproved = (e) => {
    setState({ ...state, ewayapproved: e.target.value });
  };
  const onChangeCinnum = (e) => {
    setState({ ...state, cinnum: e.target.value });
  };
  const onChangeGstnum = (e) => {
    setState({ ...state, gstnum: e.target.value });
  };
  const onChangeGrnSrnDate = (e) => {
    setState({ ...state, grnsrnDate: e.target.value });
  };
  const onChangeReltcap = (e) => {
    setState({ ...state, reltcap: e.target.value });
  };
  const onChangePnum = (e) => {
    setState({ ...state, pnum: e.target.value });
  };
  const onChangeCompanyType = (e) => {
    setState({ ...state, companytype: e.target.value });
  };
  const onChangeAddress = (e) => {
    setState({ ...state, address: e.target.value });
  };
  const onChangeWebsite = (e) => {
    setState({ ...state, website: e.target.value });
  };
  const onChangePtype = (e) => {
    setState({ ...state, ptype: e.target.value });
  };
  const onChangeIncDt = (e) => {
    setState({ ...state, invct: e.target.value });
  };
  const onChangeDueDt = (e) => {
    setState({ ...state, duedt: e.target.value });
  };
  const onChangeLimitexp = (e) => {
    setState({ ...state, limitexp: e.target.value });
  };
  const onChangeCreateDt = (e) => {
    setState({ ...state, createdt: e.target.value });
  };
  const onChangeApprovallimit = (e) => {
    setState({ ...state, approvallimit: e.target.value });
  };
  const onChangeArrName = (e) => {
    setState({ ...state, arrname: e.target.value });
  };
  const onChangeCibilFile = (e) => {
    setState({ ...state, invurl: e.target.value });
  };
  const onChangePancardFile = (e) => {
    setState({ ...state, invurl: e.target.value });
  };
  const onChangeLoandecFile = (e) => {
    setState({ ...state, invurl: e.target.value });
  };
  const onChangeStatementFile = (e) => {
    setState({ ...state, invurl: e.target.value });
  };

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
        vid: state.vid,
        cname: state.cname,
        status: state.status,
        companytype: state.companytype,
        address: state.address,
        website: state.website,
        ptype: state.ptype,
        invct: state.invct,
        duedt: state.duedt,
        limitexp: state.limitexp,
        createdt: state.createdt,
        approvallimit: state.approvallimit,
        arrname: 'Arranger1',
        invurl: state.invurl,
      });
      setState({
        approvalInvoice: joined,
        vid: Math.floor(Math.random() * (999 - 100 + 1) + 100),
        cname: '',
        status: '',
        companytype: '',
        address: '',
        website: '',
        ptype: '',
        invct: '',
        duedt: '',
        limitexp: '',
        createdt: '',
        approvallimit: '',
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
      <h3 className="addInvPageTitle">Onboard New Entity</h3>
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
                COMPANY DETAILS
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={3}>
                {/* <Grid item xs={12}>
        <h3 className="addInvSectionTitle">Invoice Details</h3>
        </Grid> */}
                <Grid item xs={12}>
                  <form className="addInvForm" onSubmit={handleSubmit} disabled>
                    <Grid container spacing={3}>
                      <Grid item xs={6}>
                        <div className="addInvItem">
                          <label>Buyer ID</label>
                          <input
                            type="text"
                            name="vid"
                            className="addInvInput"
                            readOnly
                            value={state.vid}
                          />
                        </div>
                      </Grid>
                      <Grid item xs={6}>
                        <div className="addInvItem">
                          <label>Company Name</label>
                          <input
                            type="text"
                            name="cname"
                            className="addInvInput"
                            onChange={onChangeCname}
                            required
                            value={state.cname}
                          />
                        </div>
                      </Grid>
                      <Grid item xs={6}>
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
                          <label>Type of Company</label>
                          <select
                            className="addInvInput"
                            name="companytype"
                            onChange={onChangeCompanyType}
                            required
                            value={state.companytype}
                          >
                            <option value="">--Select--</option>
                            <option value="company">Company</option>
                            <option value="LLP">Partnership Firm/LLP</option>
                            <option value="private">Private Ltd</option>
                            <option value="society">Society</option>
                            <option value="trust">Trust</option>
                          </select>
                        </div>
                      </Grid>
                      <Grid item xs={6}>
                        <div className="addInvItem">
                          <label>Relationship with TCAP</label>
                          <select
                            className="addInvInput"
                            name="reltcap"
                            onChange={onChangeReltcap}
                            required
                            value={state.reltcap}
                          >
                            <option value="">--Select--</option>
                            <option value="Buyer1">Seller</option>
                            <option value="Buyer2">Buyer</option>
                            <option value="Buyer3">Seller/Buyer</option>
                          </select>
                        </div>
                      </Grid>
                      <Grid item xs={6}>
                        <div className="addInvItem">
                          <label>Incorporation Certificate</label>
                          <input
                            type="text"
                            className="addInvInput"
                            name="inccert"
                            onChange={onChangeInccert}
                            required
                            value={state.inccert}
                          />
                        </div>
                      </Grid>
                      <Grid item xs={6}>
                        <div className="addInvItem">
                          <label>Address</label>
                          <textarea
                            type="text"
                            className="addInvInput"
                            name="address"
                            onChange={onChangeAddress}
                            required
                            value={state.address}
                          />
                        </div>
                      </Grid>
                      <Grid item xs={6}>
                        <div className="addInvItem">
                          <label>Company Website</label>
                          <input
                            type="text"
                            className="addInvInput"
                            name="website"
                            onChange={onChangeWebsite}
                            required
                            value={state.website}
                          />
                        </div>
                      </Grid>
                      <Grid item xs={6}>
                        <div className="addInvItem">
                          <label>Phone number:</label>
                          <input
                            type="number"
                            className="addInvInput"
                            name="pnum"
                            onChange={onChangePnum}
                            required
                            value={state.pnum}
                          />
                        </div>
                      </Grid>
                      <Grid item xs={6}>
                        <div className="addInvItem">
                          <label>CIN number:</label>
                          <input
                            type="number"
                            className="addInvInput"
                            name="cinnum"
                            onChange={onChangeCinnum}
                            required
                            value={state.cinnum}
                          />
                        </div>
                      </Grid>
                      <Grid item xs={6}>
                        <div className="addInvItem">
                          <label>GST number:</label>
                          <input
                            type="number"
                            className="addInvInput"
                            name="gstnum"
                            onChange={onChangeGstnum}
                            required
                            value={state.gstnum}
                          />
                        </div>
                      </Grid>
                      <Grid item xs={6}>
                        <div className="addInvItem">
                          <label>Incorporation Date</label>
                          <input
                            type="date"
                            className="addInvInput"
                            name="incDt"
                            onChange={onChangeIncDt}
                            required
                            value={state.incDt}
                          />
                        </div>
                      </Grid>
                      <Grid item xs={6}>
                        <div className="addInvItem">
                          <label>Available Limit</label>
                          <input
                            type="number"
                            className="addInvInput"
                            name="availablelimit"
                            onChange={onChangeAvailablelimit}
                            required
                            value={state.availablelimit}
                          />
                        </div>
                      </Grid>
                      <Grid item xs={6}>
                        <div className="addInvItem">
                          <label>Limit Expectation</label>
                          <input
                            type="number"
                            className="addInvInput"
                            name="limitexp"
                            onChange={onChangeLimitexp}
                            required
                            value={state.limitexp}
                          />
                        </div>
                      </Grid>
                      <Grid item xs={6}>
                        <div className="addInvItem">
                          <label>Approval Limit</label>
                          <input
                            type="number"
                            className="addInvInput"
                            name="approvallimit"
                            onChange={onChangeApprovallimit}
                            required
                            value={state.approvallimit}
                          />
                        </div>
                      </Grid>
                      <Grid item xs={6}>
                        <div className="addInvItem">
                          <label>Creation Date</label>
                          <input
                            type="date"
                            className="addInvInput"
                            name="createdt"
                            onChange={onChangeCreateDt}
                            required
                            value={state.createdt}
                          />
                        </div>
                      </Grid>

                      <Grid item xs={12}>
                        <div className="addInvItem">
                          <input
                            className="saveInvBtn"
                            type="submit"
                            value="Submit"
                          />
                        </div>
                      </Grid>
                    </Grid>
                  </form>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="documents"
              id="documents"
            >
              <Typography className={classes.heading}>DOCUMENTS</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <div className="addInvItem">
                    <label>CIBIL Score of the directors</label>
                    <label htmlFor="file" className="labelFile">
                      <Publish />
                      <span>Select File</span>
                    </label>
                    <input
                      type="file"
                      id="file"
                      name="cibilfile"
                      style={{ display: 'none' }}
                      onChange={onChangeCibilFile}
                    />
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div className="addInvItem">
                    <label>PAN Card of the company</label>
                    <label htmlFor="file" className="labelFile">
                      <Publish />
                      <span>Select File</span>
                    </label>
                    <input
                      type="file"
                      id="file"
                      name="pancardfile"
                      style={{ display: 'none' }}
                      onChange={onChangePancardFile}
                    />
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div className="addInvItem">
                    <label>
                      Loan declaration along with the sanction letter for all
                      declared loans
                    </label>
                    <label htmlFor="file" className="labelFile">
                      <Publish />
                      <span>Select File</span>
                    </label>
                    <input
                      type="file"
                      id="file"
                      name="loandecfile"
                      style={{ display: 'none' }}
                      onChange={onChangeLoandecFile}
                    />
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div className="addInvItem">
                    <label>Financial Info (Financial Statement)</label>
                    <label htmlFor="file" className="labelFile">
                      <Publish />
                      <span>Select File</span>
                    </label>
                    <input
                      type="file"
                      id="file"
                      name="statementfile"
                      style={{ display: 'none' }}
                      onChange={onChangeStatementFile}
                    />
                  </div>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
          <Accordion color="primary">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="entity-details"
              id="entity-details"
            >
              <Grid container xs={12}>
                <Grid item xs={11}>
                  <Typography className={classes.heading}>
                    Seller RELATIONSHIPS
                  </Typography>
                </Grid>
                <Grid item xs={1}>
                  <Button variant="text">
                    <Link to="/varelationship">ADD NEW</Link>
                  </Button>
                </Grid>
                {/* <Button variant="contained"> LOOKUP</Button> */}
              </Grid>
            </AccordionSummary>
            <AccordionDetails>
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
                          <div>No Relationship Record</div>
                        )}
                      </div>
                    </Paper>
                  </Grid>
                </Grid>
              </div>
            </AccordionDetails>
          </Accordion>
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
  );
}