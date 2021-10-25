//import LgWidgets from '../../components/lgwidgets/LgWidgets'
//import SmWidgets from '../../components/smwidgets/SmWidgets'
//import AiWidgets from '../components/aiWidgets/AiWidgets'
import './newEntity.css';
//import Select from 'react-select';
import React, { Component, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Publish } from '@material-ui/icons';
// import { Component, useState } from "react";

import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { companyApiProvider } from 'services/api/company/companyService';
import { documentApiProvider } from 'services/api/document/documentService';
import DialogWidget from 'components/DialogWideget/DialogWidget';
import {dialogDemoData} from 'stub/stub' ;

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
  const [stepCount,setStepCount] = useState(1);
  const [openDialog,setDialogOpen] = useState(false);
  const [dialogData,setDialogData] = useState(dialogDemoData);
  const [companyCreateSuccessResponse,setCompanyCreateSuccessResponse] = useState({});
  const handleChange = (event) => {
    setEntity(event.target.value);
  };

  let initObj = {
    email:'',
    // approvalInvoice: [],
    vid: Math.floor(Math.random() * (999 - 100 + 1) + 100),
    organisationName: '',
    companyId:'',
    // status: '',
    type: '',
    address: '',
    city:'',
    state:'',
    country:'',
    website: '',
    adminName:'',
    ptype: '',
    invct: '',
    duedt: '',
    limitexp: '',
    createdt: '',
    approvallimit: '',
    arrname: '',
    invurl: '',
    relationship: '',
    pnum: '',
    grnsrnDate: '',
    availablelimit: '',
    gstid: '',
    ewaybilldt: '',
    ewayapproved: '',
    inccert: '',
    viewOnly: false,
    approveName: '',
    submitapproval: '',
    approve: '',
    cibilFile:'',
    panCardFile:'',
    loanDecFile:'',
    statementFile:'',
    otherFiles:''
  };
  const [state, setState] = useState(initObj);
  // Form Events
  // onChangeTid(e) {
  //   this.setState({ tid: e.target.value });
  // }
  const onChangeOrganisationName = (e) => {
    setState({ ...state, organisationName: e.target.value });
  };
  const onChangeCompanyId = (e) => {
    setState({ ...state, companyId: e.target.value });
  };
  const onChangeEmail = (e) => {
    setState({ ...state, email: e.target.value });
  };
  const onChangeApproveName = (e) => {
    setState({ ...state, approveName: e.target.value });
  };
  const onChangeApprove = (e) => {
    setState({ ...state, approve: e.target.value });
  };
  // const onChangeStatus = (e) => {
  //   setState({ ...state, status: e.target.value });
  // };
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
  const onChangeGstId = (e) => {
    setState({ ...state, gstid: e.target.value });
  };
  const onChangeGrnSrnDate = (e) => {
    setState({ ...state, grnsrnDate: e.target.value });
  };
  const onChangerelationship = (e) => {
    setState({ ...state, relationship: e.target.value });
  };
  const onChangePhoneNumber = (e) => {
    setState({ ...state, phoneNumber: e.target.value });
  };
  const onChangeType = (e) => {
    setState({ ...state, type: e.target.value });
  };
  const onChangeAddress = (e) => {
    setState({ ...state, address: e.target.value });
  };
  const onChangeCity = (e) => {
    setState({ ...state, city: e.target.value });
  };
  const onChangeState = (e) => {
    setState({ ...state, state: e.target.value });
  };
  const onChangeCountry = (e) => {
    setState({ ...state, country: e.target.value });
  };
  const onChangeWebsite = (e) => {
    setState({ ...state, website: e.target.value });
  };
  const onChangeAdminName = (e) => {
    setState({ ...state, adminName: e.target.value });
  };
  const onChangeIncDt = (e) => {
    setState({ ...state, invct: e.target.value });
  };
  const onChangeDueDt = (e) => {
    setState({ ...state, duedt: e.target.value });
  };
  const submitCompanyDetails = (e) => {
    companyApiProvider.submitCompany(state).then((response) => {
      if (response.status == 201 || response.status == 'active') {
        setCompanyCreateSuccessResponse(response);
        setStepCount(2);
      } else {
        setDialogData({
          ...dialogData,
          dialogTitle: 'OOPS!',
          dialogText:
            'Please try after sometime. In case issue persists, please contact hello@trustless.capital',
        });
        setDialogOpen(true);
      }
    });
  };
  const submitDocuments = async (e) =>{
      // Create an object of formData
      const documentsList = [{name:'cibilFile',type:'CIBILKYC',description:'Director CIBIL KYC'},{name:'panCardFile',type:'PAN',description:'PAN card'},{name:'statementFile',type:'OTH',description:'Others'},{name:'loanDecFile',type:'LC',description:'Loan declaration'},{name:'otherFiles',type:'OTH',description:'Others'}] ;
      for(let i = 0;i<documentsList.length;i++){
        if(state[documentsList[i].name]!='' && documentsList[i].name!='otherFiles'){
      const documentFormData = new FormData();
      // Update the formData object
      documentFormData.append(
        'document',
        state[documentsList[i].name],
        state[documentsList[i].name].name
      );
       const uploadSuccess = await documentApiProvider.submitDocuments(documentFormData);
       const serverUpload = await documentApiProvider.updateDocumentsToServer({
        //"companyId":companyCreateSuccessResponse.id, // this comes from?
        "companyId":companyCreateSuccessResponse.id,
        "userEmail":companyCreateSuccessResponse.email,
        "contentId":uploadSuccess.contenId,
        "version":"2",// this comes from?
        "type":documentsList[i].type,// what are the other fields 
        "description":documentsList[i].description, // static or getting from some other data?
        "comments":`its a ${documentsList[i].name}`, // this comes from?
        "fileName": state[documentsList[i].name].name,
        "fileKey" : uploadSuccess.fileKey 
    })
    }
    if(documentsList[i].name == 'otherFiles' && state[documentsList[i].name]!=''){
      for(var j=0;j<state[documentsList[i].name].length;j++){
        const documentFormData = new FormData();
      // Update the formData object
      documentFormData.append(
        'document',
        state[documentsList[i].name][j],
        state[documentsList[i].name][j].name
      );
       const uploadSuccess = await documentApiProvider.submitDocuments(documentFormData);
       const serverUpload = await documentApiProvider.updateDocumentsToServer({
        //"companyId":companyCreateSuccessResponse.id, // this comes from?
        "companyId":"432fb6f9-7382-4743-a836-a662b0f53c2a",
        "userEmail":'parthdalal6394@gmail.com',
        "contentId":uploadSuccess.contenId,
        "version":"2",// this comes from?
        "type":documentsList[i].type,// what are the other fields 
        "description":documentsList[i].description, // static or getting from some other data?
        "comments":`its a ${documentsList[i].name}`, // this comes from?
        "fileName": state[documentsList[i].name][j].name,
        "fileKey" : uploadSuccess.fileKey 
    })
      }
    }
    }
    setStepCount(3);
  }
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
    setState({ ...state, cibilFile: e.target.files[0] });
  };
  const onChangePancardFile = (e) => {
    setState({ ...state, panCardFile: e.target.files[0] });
  };
  const onChangeLoandecFile = (e) => {
    setState({ ...state, loanDecFile: e.target.files[0] });
  };
  const onChangeStatementFile = (e) => {
    setState({ ...state, statementFile: e.target.files[0] });
  };
  
  const onChangeOtherFiles = (e) => {
    setState({ ...state, otherFiles: Array.from(e.target.files) });
  };

  const handleViewOnly = () => {
    setState({ ...state, viewOnly: !state.viewOnly });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setDialogData({...dialogData, dialogTitle:'Submit',dialogText:'Are you sure you want to send for approval?',info:false})
    setDialogOpen(true);
    console.log(e.target.value);
  };
  const onHandleDialogClose = (e) => {
    if (e.target.firstChild.data == dialogData.noButtonText || e.target.firstChild.data == 'OK') {
      setDialogOpen(false);
    } else {
      var joined = state.approvalInvoice.concat({
        vid: state.vid,
        organisationName: state.organisationName,
        companyId:state.companyId,
        // status: state.status,
        type: state.type,
        address: state.address,
        city: state.city,
        state: state.state,
        country: state.country,
        website: state.website,
        adminName:state.adminName,
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
        organisationName: '',
        companyId:'',
        // status: '',
        type: '',
        address: '',
        city:'',
        state:'',
        country:'',
        website: '',
        adminName:'',
        ptype: '',
        invct: '',
        duedt: '',
        limitexp: '',
        createdt: '',
        approvallimit: '',
        arrname: '',
        invurl: '',
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
      <Grid container >
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
        <DialogWidget {...dialogData} open = {openDialog} onHandleDialogClose={onHandleDialogClose} />
        <div className={classes.root}>
          <Accordion expanded={stepCount==1}>
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
                  <form className="addInvForm" id="basicDetails" onSubmit={handleSubmit} disabled>
                    <Grid container spacing={3}>
                      <Grid item xs={6}>
                        <div className="addInvItem">
                          <label>Vendor ID</label>
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
                          <label>Email ID <sup className="required">*</sup></label>
                          <input
                            type="email"
                            name="email"
                            className="addInvInput"
                            value={state.email}
                            onChange={onChangeEmail}
                          />
                        </div>
                      </Grid>
                      <Grid item xs={6}>
                        <div className="addInvItem">
                          <label>Organization Name <sup className="required">*</sup></label>
                          <input
                            type="text"
                            name="organisationname"
                            className="addInvInput"
                            onChange={onChangeOrganisationName}
                            required
                            value={state.organisationName}
                          />
                        </div>
                      </Grid>
                      <Grid item xs={6}>
                        <div className="addInvItem">
                          <label>Company ID (PAN/CIN)<sup className="required">*</sup></label>
                          <input
                            type="text"
                            name="companyid"
                            className="addInvInput"
                            onChange={onChangeCompanyId}
                            required
                            value={state.companyId}
                          />
                        </div>
                      </Grid>
                      {/* <Grid item xs={6}>
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
                      </Grid> */}
                      <Grid item xs={6}>
                        <div className="addInvItem">
                          <label>Type of Company <sup className="required">*</sup></label>
                          <select
                            className="addInvInput"
                            name="type"
                            onChange={onChangeType}
                            required
                            value={state.type}
                          >
                            <option value="">--Select--</option>
                            <option value="public">Public</option>
                            <option value="Partnership">Partnership Firm/LLP</option>
                            <option value="One Person Company">One Person Company</option>
                            <option value="Sole Proprietorship">Sole Proprietorship</option>
                            <option value="private">Private Ltd</option>
                            <option value="Limited Liability Partnership">LLP</option>
                            <option value="Non Profit Organization">Non Profit Organization</option>
                          </select>
                        </div>
                      </Grid>
                      <Grid item xs={6}>
                        <div className="addInvItem">
                          <label>Relationship with TCAP</label>
                          <select
                            className="addInvInput"
                            name="relationship"
                            onChange={onChangerelationship}
                            required
                            value={state.relationship}
                          >
                            <option value="">--Select--</option>
                            <option value="anchor">Anchor</option>
                            <option value="vendor">Vendor</option>
                            <option value="arranger">Arranger</option>
                          </select>
                        </div>
                      </Grid>
                      {/* <Grid item xs={6}>
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
                      </Grid> */}
                      <Grid item xs={6}>
                        <div className="addInvItem">
                          <label>Address<sup className="required">*</sup></label>
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
                          <label>City<sup className="required">*</sup></label>
                          <input
                            type="text"
                            className="addInvInput"
                            name="city"
                            onChange={onChangeCity}
                            required
                            value={state.city}
                          />
                        </div>
                      </Grid>
                      <Grid item xs={6}>
                        <div className="addInvItem">
                          <label>State<sup className="required">*</sup></label>
                          <input
                            type="text"
                            className="addInvInput"
                            name="state"
                            onChange={onChangeState}
                            required
                            value={state.state}
                          />
                        </div>
                      </Grid>
                      <Grid item xs={6}>
                        <div className="addInvItem">
                          <label>Country<sup className="required">*</sup></label>
                          <input
                            type="text"
                            className="addInvInput"
                            name="country"
                            onChange={onChangeCountry}
                            required
                            value={state.country}
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
                          <label>Admin Name<sup className="required">*</sup></label>
                          <input
                            type="text"
                            className="addInvInput"
                            name="adminname"
                            onChange={onChangeAdminName}
                            required
                            value={state.adminName}
                          />
                        </div>
                      </Grid>
                      <Grid item xs={6}>
                        <div className="addInvItem">
                          <label>Phone number:<sup className="required">*</sup></label>
                          <input
                            type="number"
                            className="addInvInput"
                            name="phoneNumber"
                            onChange={onChangePhoneNumber}
                            required
                            value={state.phoneNumber}
                          />
                        </div>
                      </Grid>
                     
                      <Grid item xs={6}>
                        <div className="addInvItem">
                          <label>GST number:</label>
                          <input
                            type="number"
                            className="addInvInput"
                            name="gstid"
                            onChange={onChangeGstId}
                            required
                            value={state.gstid}
                          />
                        </div>
                      </Grid>
                      {/* <Grid item xs={6}>
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
                      </Grid> */}
                      {/* <Grid item xs={6}>
                        <div className="addInvItem">
                          <label>Available Limit</label>
                          <input
                          disabled
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
                          disabled
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
                      </Grid> */}

                      <Grid item xs={12}>
                        <div className="addInvItem">
                          <input
                            className="saveInvBtn"
                            type="submit"
                            value="Submit"
                            onClick={submitCompanyDetails}
                          />
                        </div>
                      </Grid>
                    </Grid>
                  </form>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
          {stepCount>1 && <Accordion expanded={stepCount==2}>
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
                    <label htmlFor="cibilfile" className="labelFile">
                      <Publish />
                      <span>Select File</span>
                    </label>
                    <input
                      type="file"
                      id="cibilfile"
                      name="cibilfile"
                      style={{ display: 'none' }}
                      onChange={onChangeCibilFile}
                      accept="application/pdf"
                    />
                  </div>
                  <label style={{float:'right'}}>{state.cibilFile.name}</label>
                </Grid>
                <Grid item xs={6}>
                  <div className="addInvItem">
                    <label>PAN Card of the company</label>
                    <label htmlFor="pancardfile" className="labelFile">
                      <Publish />
                      <span>Select File</span>
                    </label>
                    <input
                      type="file"
                      id="pancardfile"
                      name="pancardfile"
                      style={{ display: 'none' }}
                      onChange={onChangePancardFile}
                      accept="application/pdf"
                    />
                  </div>
                  <label style={{float:'right'}}>{state.panCardFile.name}</label>
                </Grid>
                <Grid item xs={6}>
                  <div className="addInvItem">
                    <label>
                      Loan declaration along with the sanction letter for all
                      declared loans
                    </label>
                    <label htmlFor="loandecfile" className="labelFile">
                      <Publish />
                      <span>Select File</span>
                    </label>
                    <input
                      type="file"
                      id="loandecfile"
                      name="loandecfile"
                      style={{ display: 'none' }}
                      onChange={onChangeLoandecFile}
                      accept="application/pdf"
                    />
                  </div>
                  <label style={{float:'right'}}>{state.loanDecFile.name}</label>
                </Grid>
                <Grid item xs={6}>
                  <div className="addInvItem">
                    <label>Financial Info (Financial Statement)</label>
                    <label htmlFor="statementfile" className="labelFile">
                      <Publish />
                      <span>Select File</span>
                    </label>
                    <input
                      type="file"
                      id="statementfile"
                      name="statementfile"
                      style={{ display: 'none' }}
                      onChange={onChangeStatementFile}
                      accept="application/pdf"
                    />
                  </div>
                  <label style={{float:'right'}}>{state.statementFile.name}</label>
                </Grid>
                <Grid item xs={6}>
                  <div className="addInvItem">
                    <label>Other Documents</label>
                    <label htmlFor="otherfiles" className="otherFiles">
                      <Publish />
                      <span>Select File</span>
                    </label>
                    <input
                      type="file"
                      id="otherfiles"
                      name="otherfiles"
                      style={{ display: 'none' }}
                      onChange={onChangeOtherFiles}
                      accept="application/pdf"
                      multiple
                    />
                  </div>
                  {state.otherFiles.length>0 && state.otherFiles.map((file)=>{
                    return(<label>{file.name}</label>)
                  })}
                </Grid>
                <Grid item xs={12}>
                <div className="addInvItem">
              <input
                            className="saveInvBtn"
                            type="submit"
                            value="Submit"
                            disabled={state.cibilFile==''&&
                            state.panCardFile==''&&
                            state.loanDecFile==''&&
                            state.statementFile==''&&
                            state.otherFiles==''}
                            onClick={submitDocuments}
                          />
                          </div>
              </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>}
          {stepCount>2 && <Accordion color="primary" expanded={stepCount==3}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="entity-details"
              id="entity-details"
            >
              <Grid container >
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
                      {/* <div>
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
                          <div>No Relationship Record</div>
                        )}
                      </div> */}
                    </Paper>
                  </Grid>
                </Grid>
              </div>
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
