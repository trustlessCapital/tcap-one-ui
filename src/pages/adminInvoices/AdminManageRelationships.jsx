//import LgWidgets from '../../components/lgwidgets/LgWidgets'
//import SmWidgets from '../../components/smwidgets/SmWidgets'
//import AiWidgets from '../components/aiWidgets/AiWidgets'
// import "./newEntity.css";
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

export default function AdminManageRelationships(props) {
  // userData;
  const classes = useStyles();
  const [entity, setEntity] = useState('');

  const handleChange = (event) => {
    setEntity(event.target.value);
  };

  let initObj = {
    approvalInvoice: [],
    tid: Math.floor(Math.random() * (999 - 100 + 1) + 100),
    vname: '',
    status: '',
    relationshiptype: '',
    arranger: '',
    website: '',
    ptype: '',
    apprejby: '',
    duedt: '',
    limitexp: '',
    relstartdt: '',
    approvallimit: '',
    arrname: '',
    invurl: '',
    approvaldt: '',
    firstpublished: '',
    yrsofrel: '',
    availablelimit: '',
    gstnum: '',
    aapprover: '',
    vpoc: '',
    aname: '',
    apoc: '',
    open: false,
    viewOnly: false,
    riskmanager: '',
    apprejcomments: '',
    riskscore: '',
  };
  const [state, setState] = useState(initObj);
  // Form Events
  // onChangeTid(e) {
  //   this.setState({ tid: e.target.value });
  // }
  const onChangeVname = (e) => {
    setState({ ...state, vname: e.target.value });
  };
  const onChangeRiskManager = (e) => {
    setState({ ...state, riskmanager: e.target.value });
  };
  const onChangeRiskscore = (e) => {
    setState({ ...state, riskscore: e.target.value });
  };
  const onChangeStatus = (e) => {
    setState({ ...state, status: e.target.value });
  };
  const onChangeApprejcomments = (e) => {
    setState({ ...state, apprejcomments: e.target.value });
  };
  const onChangeAapprover = (e) => {
    setState({ ...state, aapprover: e.target.value });
  };
  const onChangeAvailablelimit = (e) => {
    setState({ ...state, availablelimit: e.target.value });
  };
  const onChangeApoc = (e) => {
    setState({ ...state, apoc: e.target.value });
  };
  const onChangeAname = (e) => {
    setState({ ...state, aname: e.target.value });
  };
  const onChangeVpoc = (e) => {
    setState({ ...state, vpoc: e.target.value });
  };
  const onChangeGstnum = (e) => {
    setState({ ...state, gstnum: e.target.value });
  };
  const onChangeApprovalDt = (e) => {
    setState({ ...state, approvaldt: e.target.value });
  };
  const onChangeRelationshiptype = (e) => {
    setState({ ...state, relationshiptype: e.target.value });
  };
  const onChangeArranger = (e) => {
    setState({ ...state, arranger: e.target.value });
  };
  const onChangeWebsite = (e) => {
    setState({ ...state, website: e.target.value });
  };
  const onChangePtype = (e) => {
    setState({ ...state, ptype: e.target.value });
  };
  const onChangeAppRejBy = (e) => {
    setState({ ...state, apprejby: e.target.value });
  };
  const onChangeDueDt = (e) => {
    setState({ ...state, duedt: e.target.value });
  };
  const onChangeLimitexp = (e) => {
    setState({ ...state, limitexp: e.target.value });
  };
  const onChangeRelStartDt = (e) => {
    setState({ ...state, relstartdt: e.target.value });
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
        tid: state.tid,
        vname: state.vname,
        status: state.status,
        relationshiptype: state.relationshiptype,
        arranger: state.arranger,
        website: state.website,
        ptype: state.ptype,
        apprejby: state.apprejby,
        duedt: state.duedt,
        limitexp: state.limitexp,
        relstartdt: state.relstartdt,
        approvallimit: state.approvallimit,
        arrname: 'Arranger1',
        invurl: state.invurl,
      });
      setState({
        approvalInvoice: joined,
        tid: Math.floor(Math.random() * (999 - 100 + 1) + 100),
        vname: '',
        status: '',
        relationshiptype: '',
        arranger: '',
        website: '',
        ptype: '',
        apprejby: '',
        duedt: '',
        limitexp: '',
        relstartdt: '',
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
    const privKey = localStorage.getItem("privKey");
  return (
    <div className="mp">
      {props.userData?.userType == "ADMIN" && privKey && 
      <Container fluid>
            <Row className='Deals'>
                <Col sm={3}>
                    <Sidebar />
                </Col>
                <Col sm={9}>
    <div className="addInvPage">
      <h3 className="addInvPageTitle">Seller Buyer Relationship</h3>
      <Grid container spacing={2}>
        <Grid item xs={10}></Grid>
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
                GENERAL INFORMATION
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <form className="addInvForm" onSubmit={handleSubmit} disabled>
                    <Grid container spacing={3}>
                      <Grid item xs={6}>
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
                          <label>Buyer Name</label>
                          <input
                            type="text"
                            name="vname"
                            className="addInvInput"
                            onChange={onChangeVname}
                            required
                            value={state.vname}
                          />
                        </div>
                      </Grid>
                      <Grid item xs={6}>
                        <div className="addInvItem">
                          <label>Seller Name</label>
                          <input
                            type="text"
                            name="aname"
                            className="addInvInput"
                            onChange={onChangeAname}
                            required
                            value={state.aname}
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
                          <label>Relationship Type</label>
                          <select
                            className="addInvInput"
                            name="relationshiptype"
                            onChange={onChangeRelationshiptype}
                            required
                            value={state.relationshiptype}
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
                          <label>Relationship start date</label>
                          <input
                            type="date"
                            className="addInvInput"
                            name="relstartdt"
                            onChange={onChangeRelStartDt}
                            required
                            value={state.relstartdt}
                          />
                        </div>
                      </Grid>
                      <Grid item xs={6}>
                        <div className="addInvItem">
                          <label>First Published</label>
                          <input
                            type="text"
                            name="firstpublished"
                            className="addInvInput"
                            // onChange={onChangeAname}
                            required
                            disabled
                            value={state.firstpublished}
                          />
                        </div>
                      </Grid>
                      <Grid item xs={6}>
                        <div className="addInvItem">
                          <label>No. of yrs of relationship</label>
                          <input
                            type="number"
                            name="firstpublished"
                            className="addInvInput"
                            // onChange={onChangeAname}
                            required
                            disabled
                            value={state.yrsofrel}
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
              aria-controls="contactinfo"
              id="contactinfo"
            >
              <Typography className={classes.heading}>
                CONTACT INFORMATION
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <div className="addInvItem">
                    <label>Buyer POC</label>
                    <input
                      type="text"
                      name="vpoc"
                      className="addInvInput"
                      onChange={onChangeVpoc}
                      required
                      value={state.vpoc}
                    />
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div className="addInvItem">
                    <label>Seller POC</label>
                    <input
                      type="text"
                      name="vpoc"
                      className="addInvInput"
                      onChange={onChangeApoc}
                      required
                      value={state.apoc}
                    />
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div className="addInvItem">
                    <label>Seller Approver</label>
                    <input
                      type="text"
                      name="aapprover"
                      className="addInvInput"
                      onChange={onChangeAapprover}
                      required
                      value={state.aapprover}
                    />
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div className="addInvItem">
                    <label>Arranger</label>
                    <input
                      type="text"
                      name="arranger"
                      className="addInvInput"
                      onChange={onChangeArranger}
                      required
                      value={state.arranger}
                    />
                  </div>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
          <Accordion color="primary">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="Buyer-details"
              id="Buyer-details"
            >
              <Grid container xs={12}>
                <Grid item xs={11}>
                  <Typography mt={4} className={classes.heading}>
                    Buyer DETAILS
                  </Typography>
                </Grid>
                <Grid item xs={1}>
                  <Button variant="text">
                    <Link to="/onboardentity">ADD NEW</Link>
                  </Button>
                </Grid>
              </Grid>

              {/* <Button variant="contained"> LOOKUP</Button> */}
            </AccordionSummary>
            <AccordionDetails>
              <div className={classes.root}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <FormControl className={classes.formControl}>
                      <InputLabel id="demo-simple-select-label">
                        Select Buyer
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={state.vname}
                        onChange={handleChange}
                      >
                        <MenuItem value={'Buyer1'}>Buyer 1</MenuItem>
                        <MenuItem value={'Buyer2'}>Buyer 2</MenuItem>
                        <MenuItem value={'Buyer3'}>Buyer 3</MenuItem>
                      </Select>
                    </FormControl>
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
                          <div>No Records Found</div>
                        )}
                      </div>
                    </Paper>
                  </Grid>
                </Grid>
              </div>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="risknapproval"
              id="risknapproval"
            >
              <Typography className={classes.heading}>
                RISK SCORING & APPROVAL
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <div className="addInvItem">
                    <label>Credit Risk Score</label>
                    <input
                      type="number"
                      name="riskscore"
                      className="addInvInput"
                      onChange={onChangeRiskscore}
                      required
                      value={state.riskscore}
                    />
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div className="addInvItem">
                    <label>Credit Risk Manager</label>
                    <input
                      type="text"
                      name="riskmanager"
                      className="addInvInput"
                      onChange={onChangeRiskManager}
                      required
                      value={state.riskmanager}
                    />
                  </div>
                </Grid>

                <Grid item xs={6}>
                  <div className="addInvItem">
                    <label>Approval date</label>
                    <input
                      type="date"
                      className="addInvInput"
                      name="approvaldt"
                      onChange={onChangeApprovalDt}
                      required
                      value={state.approvaldt}
                    />
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div className="addInvItem">
                    <label>Approved/Rejected By</label>
                    <select
                      className="addInvInput"
                      name="apprejby"
                      onChange={onChangeAppRejBy}
                      required
                      value={state.apprejby}
                    >
                      <option value="">--Select--</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                    </select>
                  </div>
                </Grid>

                <Grid item xs={6}>
                  <div className="addInvItem">
                    <label>Approval/Rejection Comments</label>
                    <input
                      type="text"
                      name="apprejcomments"
                      className="addInvInput"
                      onChange={onChangeApprejcomments}
                      required
                      value={state.apprejcomments}
                    />
                  </div>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
          <Accordion color="primary">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="uploaded-invoices"
              id="uploaded-invoices"
            >
              <Typography className={classes.heading}>
                UPLOADED INVOICES
              </Typography>
              <Button variant="text">
                <Link to="/onboardentity"></Link>
              </Button>
              {/* <Button variant="contained"> LOOKUP</Button> */}
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
                          <div>No Records Found</div>
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
    </Col>
    </Row>
    </Container>
      }
      </div>
    
  );
}
