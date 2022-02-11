//import LgWidgets from '../../components/lgwidgets/LgWidgets'
//import SmWidgets from '../../components/smwidgets/SmWidgets'
//import AiWidgets from '../components/aiWidgets/AiWidgets'
import './newEntity.css';
//import Select from 'react-select';
import React, { Component, useEffect, useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Publish } from '@material-ui/icons';
import { useHistory } from "react-router-dom";
// import { Component, useState } from "react";

import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';
import ReactPhoneInput from 'react-phone-input-material-ui';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/high-res.css'
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { companyApiProvider } from 'services/api/company/companyService';
import { documentApiProvider } from 'services/api/document/documentService';
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
import {
  MDBInputGroup,
  MDBInputGroupText,
  MDBInputGroupElement,
  MDBBtn
} from 'mdb-react-ui-kit'

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



export default function OnboardNewEntity(props) {
  // userData;
  const history = useHistory();
  const classes = useStyles();
  const [entity, setEntity] = useState('');
  const [stepCount,setStepCount] = useState(1);
  const [documentDetails,setDocumentDetails] = useState(null);
  const [openDialog,setDialogOpen] = useState(false);
  const [createRelationshipOpen,setCreateRelationshipOpen] = useState(false);
  const [companyRelationship,setCompanyRelationship] = useState(companyRelationshipDemoData);
  const [dialogData,setDialogData] = useState(dialogDemoData);
  const [companyCreateSuccessResponse,setCompanyCreateSuccessResponse] = useState({});
  const [userType,setUserType] = useState(window.localStorage.getItem('userData').userType);
  const [userData,setUserData] = useState(window.localStorage.getItem('userData'));
  const [openSnackbar,setOpenSnackbar] = useState(false);
  useEffect(()=>{
    if(props.verified?.companyId && props.userData?.type!='arranger')
    history.push('/')
  },[props.verified])
  const handleChange = (event) => {
    setEntity(event.target.value);
  };
  const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  let initObj = {
    email:userData?.email,
    // approvalInvoice: [],
    KYCstat: '',
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
    phoneNumber: userData?.phoneNumber,
    grnsrnDate: '',
    availablelimit: '',
    uploadfile: '',
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
  const [loading,setLoading] = useState(false);
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
  const onChangePhoneNumber = (value) => {
    setState({ ...state, phoneNumber: value });
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
  const onChangeUploadFile = (e) => {
    setState({ ...state, uploadfile: e.target.value });
  };
  const onChangeKYCstat = (e) => {
    setState({ ...state, KYCstat: e.target.value });
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
    setLoading(true);
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
    setLoading(false);
  };
  const submitDocuments = async (e) =>{
      // Create an object of formData
      setLoading(true)
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
        "companyId":companyCreateSuccessResponse.id,
        "userEmail":companyCreateSuccessResponse.email,
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
    setLoading(false);
    alert('Company Onbaording Completed!')
    history.push("/");
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
    // setDialogData({...dialogData, dialogTitle:'Submit',dialogText:'Are you sure you want to send for approval?',info:false})
    // setDialogOpen(true);
    // console.log(e.target.value);
  };
  const onHandleDialogClose = (e) => {
    if (e.target.firstChild.data == dialogData.noButtonText || e.target.firstChild.data == 'OK') {
      setDialogOpen(false);
    } else {
      var joined = state.approvalInvoice.concat({
        vid: state.vid,
        KYC: state.KYCstat,
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
        uploadfile: state.uploadfile,
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
        KYC : '',
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

  const uploadInvoice = async () => {
    
    const documentFormData = new FormData();
    // Update the formData object
    documentFormData.append(
      'document',
      state.uploadfile,
      state.uploadfile.name
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
      "comments":`its a ${state.uploadfile.name}`, // this comes from?
      "fileName": state.uploadfile.name,
      "fileKey" : uploadSuccess.fileKey
    })
    if(serverUpload.fileKey){
      alert('document uploaded successfully!')
      setDocumentDetails(serverUpload);
    }
  }

  // componentWillUpdate(nextProps, nextState) {
  //   // localStorage.setItem("user", JSON.stringify(nextState));
  // }

  return (
    <div className="addInvPage">
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={()=>setOpenSnackbar(false)}>
  <Alert onClose={()=>setOpenSnackbar(false)} severity="success">
    Company relationship created!
  </Alert>
</Snackbar>
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
      {loading && <div className="overlay" >
      <CircularProgress />
      </div>}
      <h3 className="addInvPageTitle">Onboard New Entity</h3>
      {(props.userData?.type=='vendor'|| props.userData?.type=='arranger') && <Button onClick={()=>setCreateRelationshipOpen(true)}>
          Create New Relationship
        </Button>}
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
          <Accordion expanded={stepCount<4}>
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
                          {/* <input
                            type="text"
                            className="addInvInput"
                            name="country"
                            onChange={onChangeCountry}
                            required
                            value={state.country}
                          /> */}
<select
name="country"
onChange={onChangeCountry}
value={state.country}
className="addInvInput"
required
>
<option value="AFG">Afghanistan</option>
	<option value="ALA">Åland Islands</option>
	<option value="ALB">Albania</option>
	<option value="DZA">Algeria</option>
	<option value="ASM">American Samoa</option>
	<option value="AND">Andorra</option>
	<option value="AGO">Angola</option>
	<option value="AIA">Anguilla</option>
	<option value="ATA">Antarctica</option>
	<option value="ATG">Antigua and Barbuda</option>
	<option value="ARG">Argentina</option>
	<option value="ARM">Armenia</option>
	<option value="ABW">Aruba</option>
	<option value="AUS">Australia</option>
	<option value="AUT">Austria</option>
	<option value="AZE">Azerbaijan</option>
	<option value="BHS">Bahamas</option>
	<option value="BHR">Bahrain</option>
	<option value="BGD">Bangladesh</option>
	<option value="BRB">Barbados</option>
	<option value="BLR">Belarus</option>
	<option value="BEL">Belgium</option>
	<option value="BLZ">Belize</option>
	<option value="BEN">Benin</option>
	<option value="BMU">Bermuda</option>
	<option value="BTN">Bhutan</option>
	<option value="BOL">Bolivia, Plurinational State of</option>
	<option value="BES">Bonaire, Sint Eustatius and Saba</option>
	<option value="BIH">Bosnia and Herzegovina</option>
	<option value="BWA">Botswana</option>
	<option value="BVT">Bouvet Island</option>
	<option value="BRA">Brazil</option>
	<option value="IOT">British Indian Ocean Territory</option>
	<option value="BRN">Brunei Darussalam</option>
	<option value="BGR">Bulgaria</option>
	<option value="BFA">Burkina Faso</option>
	<option value="BDI">Burundi</option>
	<option value="KHM">Cambodia</option>
	<option value="CMR">Cameroon</option>
	<option value="CAN">Canada</option>
	<option value="CPV">Cape Verde</option>
	<option value="CYM">Cayman Islands</option>
	<option value="CAF">Central African Republic</option>
	<option value="TCD">Chad</option>
	<option value="CHL">Chile</option>
	<option value="CHN">China</option>
	<option value="CXR">Christmas Island</option>
	<option value="CCK">Cocos (Keeling) Islands</option>
	<option value="COL">Colombia</option>
	<option value="COM">Comoros</option>
	<option value="COG">Congo</option>
	<option value="COD">Congo, the Democratic Republic of the</option>
	<option value="COK">Cook Islands</option>
	<option value="CRI">Costa Rica</option>
	<option value="CIV">Côte d'Ivoire</option>
	<option value="HRV">Croatia</option>
	<option value="CUB">Cuba</option>
	<option value="CUW">Curaçao</option>
	<option value="CYP">Cyprus</option>
	<option value="CZE">Czech Republic</option>
	<option value="DNK">Denmark</option>
	<option value="DJI">Djibouti</option>
	<option value="DMA">Dominica</option>
	<option value="DOM">Dominican Republic</option>
	<option value="ECU">Ecuador</option>
	<option value="EGY">Egypt</option>
	<option value="SLV">El Salvador</option>
	<option value="GNQ">Equatorial Guinea</option>
	<option value="ERI">Eritrea</option>
	<option value="EST">Estonia</option>
	<option value="ETH">Ethiopia</option>
	<option value="FLK">Falkland Islands (Malvinas)</option>
	<option value="FRO">Faroe Islands</option>
	<option value="FJI">Fiji</option>
	<option value="FIN">Finland</option>
	<option value="FRA">France</option>
	<option value="GUF">French Guiana</option>
	<option value="PYF">French Polynesia</option>
	<option value="ATF">French Southern Territories</option>
	<option value="GAB">Gabon</option>
	<option value="GMB">Gambia</option>
	<option value="GEO">Georgia</option>
	<option value="DEU">Germany</option>
	<option value="GHA">Ghana</option>
	<option value="GIB">Gibraltar</option>
	<option value="GRC">Greece</option>
	<option value="GRL">Greenland</option>
	<option value="GRD">Grenada</option>
	<option value="GLP">Guadeloupe</option>
	<option value="GUM">Guam</option>
	<option value="GTM">Guatemala</option>
	<option value="GGY">Guernsey</option>
	<option value="GIN">Guinea</option>
	<option value="GNB">Guinea-Bissau</option>
	<option value="GUY">Guyana</option>
	<option value="HTI">Haiti</option>
	<option value="HMD">Heard Island and McDonald Islands</option>
	<option value="VAT">Holy See (Vatican City State)</option>
	<option value="HND">Honduras</option>
	<option value="HKG">Hong Kong</option>
	<option value="HUN">Hungary</option>
	<option value="ISL">Iceland</option>
	<option value="IND">India</option>
	<option value="IDN">Indonesia</option>
	<option value="IRN">Iran, Islamic Republic of</option>
	<option value="IRQ">Iraq</option>
	<option value="IRL">Ireland</option>
	<option value="IMN">Isle of Man</option>
	<option value="ISR">Israel</option>
	<option value="ITA">Italy</option>
	<option value="JAM">Jamaica</option>
	<option value="JPN">Japan</option>
	<option value="JEY">Jersey</option>
	<option value="JOR">Jordan</option>
	<option value="KAZ">Kazakhstan</option>
	<option value="KEN">Kenya</option>
	<option value="KIR">Kiribati</option>
	<option value="PRK">Korea, Democratic People's Republic of</option>
	<option value="KOR">Korea, Republic of</option>
	<option value="KWT">Kuwait</option>
	<option value="KGZ">Kyrgyzstan</option>
	<option value="LAO">Lao People's Democratic Republic</option>
	<option value="LVA">Latvia</option>
	<option value="LBN">Lebanon</option>
	<option value="LSO">Lesotho</option>
	<option value="LBR">Liberia</option>
	<option value="LBY">Libya</option>
	<option value="LIE">Liechtenstein</option>
	<option value="LTU">Lithuania</option>
	<option value="LUX">Luxembourg</option>
	<option value="MAC">Macao</option>
	<option value="MKD">Macedonia, the former Yugoslav Republic of</option>
	<option value="MDG">Madagascar</option>
	<option value="MWI">Malawi</option>
	<option value="MYS">Malaysia</option>
	<option value="MDV">Maldives</option>
	<option value="MLI">Mali</option>
	<option value="MLT">Malta</option>
	<option value="MHL">Marshall Islands</option>
	<option value="MTQ">Martinique</option>
	<option value="MRT">Mauritania</option>
	<option value="MUS">Mauritius</option>
	<option value="MYT">Mayotte</option>
	<option value="MEX">Mexico</option>
	<option value="FSM">Micronesia, Federated States of</option>
	<option value="MDA">Moldova, Republic of</option>
	<option value="MCO">Monaco</option>
	<option value="MNG">Mongolia</option>
	<option value="MNE">Montenegro</option>
	<option value="MSR">Montserrat</option>
	<option value="MAR">Morocco</option>
	<option value="MOZ">Mozambique</option>
	<option value="MMR">Myanmar</option>
	<option value="NAM">Namibia</option>
	<option value="NRU">Nauru</option>
	<option value="NPL">Nepal</option>
	<option value="NLD">Netherlands</option>
	<option value="NCL">New Caledonia</option>
	<option value="NZL">New Zealand</option>
	<option value="NIC">Nicaragua</option>
	<option value="NER">Niger</option>
	<option value="NGA">Nigeria</option>
	<option value="NIU">Niue</option>
	<option value="NFK">Norfolk Island</option>
	<option value="MNP">Northern Mariana Islands</option>
	<option value="NOR">Norway</option>
	<option value="OMN">Oman</option>
	<option value="PAK">Pakistan</option>
	<option value="PLW">Palau</option>
	<option value="PSE">Palestinian Territory, Occupied</option>
	<option value="PAN">Panama</option>
	<option value="PNG">Papua New Guinea</option>
	<option value="PRY">Paraguay</option>
	<option value="PER">Peru</option>
	<option value="PHL">Philippines</option>
	<option value="PCN">Pitcairn</option>
	<option value="POL">Poland</option>
	<option value="PRT">Portugal</option>
	<option value="PRI">Puerto Rico</option>
	<option value="QAT">Qatar</option>
	<option value="REU">Réunion</option>
	<option value="ROU">Romania</option>
	<option value="RUS">Russian Federation</option>
	<option value="RWA">Rwanda</option>
	<option value="BLM">Saint Barthélemy</option>
	<option value="SHN">Saint Helena, Ascension and Tristan da Cunha</option>
	<option value="KNA">Saint Kitts and Nevis</option>
	<option value="LCA">Saint Lucia</option>
	<option value="MAF">Saint Martin (French part)</option>
	<option value="SPM">Saint Pierre and Miquelon</option>
	<option value="VCT">Saint Vincent and the Grenadines</option>
	<option value="WSM">Samoa</option>
	<option value="SMR">San Marino</option>
	<option value="STP">Sao Tome and Principe</option>
	<option value="SAU">Saudi Arabia</option>
	<option value="SEN">Senegal</option>
	<option value="SRB">Serbia</option>
	<option value="SYC">Seychelles</option>
	<option value="SLE">Sierra Leone</option>
	<option value="SGP">Singapore</option>
	<option value="SXM">Sint Maarten (Dutch part)</option>
	<option value="SVK">Slovakia</option>
	<option value="SVN">Slovenia</option>
	<option value="SLB">Solomon Islands</option>
	<option value="SOM">Somalia</option>
	<option value="ZAF">South Africa</option>
	<option value="SGS">South Georgia and the South Sandwich Islands</option>
	<option value="SSD">South Sudan</option>
	<option value="ESP">Spain</option>
	<option value="LKA">Sri Lanka</option>
	<option value="SDN">Sudan</option>
	<option value="SUR">Suriname</option>
	<option value="SJM">Svalbard and Jan Mayen</option>
	<option value="SWZ">Swaziland</option>
	<option value="SWE">Sweden</option>
	<option value="CHE">Switzerland</option>
	<option value="SYR">Syrian Arab Republic</option>
	<option value="TWN">Taiwan, Province of China</option>
	<option value="TJK">Tajikistan</option>
	<option value="TZA">Tanzania, United Republic of</option>
	<option value="THA">Thailand</option>
	<option value="TLS">Timor-Leste</option>
	<option value="TGO">Togo</option>
	<option value="TKL">Tokelau</option>
	<option value="TON">Tonga</option>
	<option value="TTO">Trinidad and Tobago</option>
	<option value="TUN">Tunisia</option>
	<option value="TUR">Turkey</option>
	<option value="TKM">Turkmenistan</option>
	<option value="TCA">Turks and Caicos Islands</option>
	<option value="TUV">Tuvalu</option>
	<option value="UGA">Uganda</option>
	<option value="UKR">Ukraine</option>
	<option value="ARE">United Arab Emirates</option>
	<option value="GBR">United Kingdom</option>
	<option value="USA">United States</option>
	<option value="UMI">United States Minor Outlying Islands</option>
	<option value="URY">Uruguay</option>
	<option value="UZB">Uzbekistan</option>
	<option value="VUT">Vanuatu</option>
	<option value="VEN">Venezuela, Bolivarian Republic of</option>
	<option value="VNM">Viet Nam</option>
	<option value="VGB">Virgin Islands, British</option>
	<option value="VIR">Virgin Islands, U.S.</option>
	<option value="WLF">Wallis and Futuna</option>
	<option value="ESH">Western Sahara</option>
	<option value="YEM">Yemen</option>
	<option value="ZMB">Zambia</option>
	<option value="ZWE">Zimbabwe</option>
</select>

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
                          {/* <label>Phone number<sup className="required">*</sup></label> */}
                          {/* <input
                            type="number"
                            className="addInvInput"
                            name="phoneNumber"
                            onChange={onChangePhoneNumber}
                            required
                            value={state.phoneNumber}
                          /> */}
                          <Grid container>
                          <Grid item xs={3}><label>Phone number<sup className="required">*</sup></label> </Grid>
                          <Grid item xs={9}>
                          <PhoneInput
  country={'in'}
  value={state.phoneNumber}
  onChange={onChangePhoneNumber}
  required='true'
  inputStyle={{ width: '100%' }}
/>
                          </Grid>
                          </Grid>


{/* <ReactPhoneInput
            defaultCountry={"in"}
            className="addInvInput"
            value={state.phoneNumber}
            onChange={onChangePhoneNumber}
            component={TextField}
            required='true'
          /> */}
         
                        </div>
                      </Grid>
                     
                      <Grid item xs={6}>
                        <div className="addInvItem">
                          <label>GST number</label>
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
                      <Grid item xs={6}>
                        <div className="addInvItem">
                          <label>Upload Attachments</label>
                          <label htmlFor="file" className="labelFile">
                            <Publish />
                            <span>Select File</span>
                          </label>
                          <input
                            type="file"
                            id="file"
                            name="uploadfile"
                            style={{ display: 'none' }}
                            onChange={onChangeUploadFile}
                          />
                         <label style={{float:'right'}}>{state.uploadfile}</label>
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
                      {userType == "Arranger" && <><Grid item xs={6}>
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
                      </Grid> </>}

                      <Grid item xs={12}>
                        <div className="addInvItem">
                          <input
                            className="saveInvBtn"
                            type="submit"
                            value="Submit"
                            disabled={stepCount>1}
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
          {stepCount>1 && <Accordion expanded={stepCount<4}>
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
                            disabled={(state.cibilFile==''&&
                            state.panCardFile==''&&
                            state.loanDecFile==''&&
                            state.statementFile==''&&
                            state.otherFiles=='') || stepCount>2}
                            onClick={submitDocuments}
                          />
                          </div>
              </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>}
          {stepCount>2 && (companyCreateSuccessResponse.tcapRelation=='anchor' || companyCreateSuccessResponse.tcapRelation=='arranger') && <Accordion color="primary" expanded={stepCount<4}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="entity-details"
              id="entity-details"
            >
              <Grid container >
                <Grid item xs={11}>
                  <Typography className={classes.heading}>
                    My BUYERS
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
          {stepCount>2 && (companyCreateSuccessResponse.tcapRelation=='vendor' || companyCreateSuccessResponse.tcapRelation=='arranger') && <Accordion color="primary" expanded={stepCount==3}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="entity-details"
              id="entity-details"
            >
              <Grid container >
                <Grid item xs={11}>
                  <Typography className={classes.heading}>
                    MY SELLERS
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
