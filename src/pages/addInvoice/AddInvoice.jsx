//import LgWidgets from '../../components/lgwidgets/LgWidgets'
//import SmWidgets from '../../components/smwidgets/SmWidgets'
//import AiWidgets from '../components/aiWidgets/AiWidgets'
import './addInvoice.css';
//import Select from 'react-select';
import React, { Component, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Publish } from '@material-ui/icons';
// import { Component, useState } from "react";
import { useHistory } from "react-router-dom";
import Dialog from '@material-ui/core/Dialog';
import { Document, Page, pdfjs } from 'react-pdf';
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
import Sidebar from "../adminInvoices/Sidebar.jsx"
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { documentApiProvider } from 'services/api/document/documentService';
import { companyApiProvider } from 'services/api/company/companyService';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
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

export default function AddInvoice(props) {
  // userData;
  const userData = props.userData;
  const history = useHistory();
  const classes = useStyles();
  const [entity, setEntity] = useState('');

  const handleChange = (event) => {
    setEntity(event.target.value);
  };

  let initObj = {
    approvalInvoice: [],
    tid: Math.floor(Math.random() * (999 - 100 + 1) + 100),
    invno: undefined,
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
    supplierGSTIN:'',
    anchorGSTIN:'',
    anchorApprover: '',
    invurl: '',
    invverificationurl: '',
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
    comment:''
  };
  const [state, setState] = useState(initObj);
  const [steps,setSteps] = useState(1);
  const [documentDetails,setDocumentDetails] = useState(null);
  const [anchorList,setAnchorList] = useState([]);
  const [listUsers, setListUsers] = useState(null);
  const [vendorList,setVendorList] = useState([]);
  const [invoices,setInvoices] = useState([]);
  const [arrangerList,setArrangerList] = useState([]);
  const [url, setUrl] = useState('');
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  
  // Form Events
  // onChangeTid(e) {
  //   this.setState({ tid: e.target.value });
  // }

  useEffect(async ()=>{
    console.log(props.verified);
    const companyData = await companyApiProvider.getCompanyList();
    setAnchorList(companyData.filter((company)=>company.tcapRelation=='anchor'))
    setVendorList(companyData.filter((company)=>company.tcapRelation=='vendor'))
    setArrangerList(companyData.filter((company)=>company.tcapRelation=='arranger'))
      },[])

      useEffect(async ()=>{
       if(props){ 
         if((props.verified?.tcapRelation!='vendor' && props.verified?.tcapRelation!='arranger'))
        {}
        else
        {
          const invoicesData = await companyApiProvider.getVendorInvoices(props.verified?.id);
          setInvoices(invoicesData);
        }
}
      },[props.verified])
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
  const onChangeSupplierGSTIN = (e) => {
    setState({ ...state, supplierGSTIN: e.target.value });
  };
  const onChangeAnchorGSTIN = (e) => {
    setState({ ...state, anchorGSTIN: e.target.value });
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
  const onChangeComment = (e) => {
    setState({ ...state, comment: e.target.value });
  };
  const onChangeDueDt = (e) => {
    setState({ ...state, duedt: e.target.value });
  };
  const onChangeInvAmt = (e) => {
    setState({ ...state, invamt: e.target.value });
  };
  const onChangeVendorEmail = (e) => {
    setState({ ...state, vendorEmail: e.target.value });
  };
  const onChangePayDt = (e) => {
    setState({ ...state, paydt: e.target.value });
  };
  const onChangeIRate = (e) => {
    setState({ ...state, irate: e.target.value });
  };
  const onChangeAnchorApprover = (e) => {
    setState({ ...state, anchorApprover: e.target.value });
  };
  const onChangeInvFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    files.length > 0 && setUrl(URL.createObjectURL(files[0]));
    setState({ ...state, invurl: e.target.files[0]});
    
  };
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  // const onChangeInvFile = (e) => {
  //   console.log("Files", e.target.files[0]);
  //   setState({ ...state, invurl: e.target.files[0]});
  // };
  const onChangeInvVerificationFile = (e) => {
    setState({ ...state, invverificationurl: e.target.files[0]});
  };
  const uploadInvoice = async () => {
    const documentFormData = new FormData();
    // Update the formData object
    console.log('state', state.invurl.name);
    documentFormData.append(
      'document',
      state.invurl,
      state.invurl.name
    );
    // console.log('Document', documentFormData);
    console.log(documentFormData);
     const uploadSuccess = await documentApiProvider.submitDocuments(documentFormData);
     console.log(JSON.stringify(uploadSuccess));
     
     console.log('Userdata ID', userData.userId);
     console.log('Userdata Email', userData.user);
   

     
    //  console.log("Check", isJSONString(obj));
    const obj={
      //"companyId":companyCreateSuccessResponse.id, // this comes from?
      "companyId":state.vendorEmail,
       "userEmail":userData.user,
       "contentId":uploadSuccess.fileKey,
       "version":"2",
       "type":"PAN",
       "description": "PAN card",
       "comments":"its a pan card",
       "fileKey" : uploadSuccess.fileKey
     };

   
     console.log("Object", obj);
     const serverUpload = await documentApiProvider.updateDocumentsToServer(obj);
    console.log("Error", JSON.stringify(serverUpload));
    if(serverUpload.fileKey){
      alert('document uploaded successfully!')
      setDocumentDetails(serverUpload);
      setSteps(2);
    }
  }
  useEffect(async ()=>{
    if(!listUsers){
    const Data = await companyApiProvider.getCompanyList();
    const jData = JSON.stringify(Data);
    const companyData = JSON.parse(jData);
    setListUsers(companyData);
    console.log("company Data", companyData);
    }
},[listUsers]);
  const uploadInvoiceDetails = async () => {
    let userData = JSON.parse(localStorage.getItem('userData'));
    const inv={
      "invoiceNumber":state.invno,
      "commodityType":state.ctype,
      "invoiceAmount":state.invamt,
      "dueDate":state.duedt,
      "transactionDate":state.invdt,
      "poLineItemNo":state.polinenum,
      "payoutDate":state.paydt,
      "productType" : state.ptype,
      "poPiNo":state.popinum,
      "grnSrnNo":state.grnsrnnum,
      "grnSrnDate":state.grnsrnDate,
      "commodity":state.commodity,
      "ewayBill":state.ewaynum,
      "ewayBillDate":state.ewaybilldt,
      "ewayApproved":state.ewayapproved,
      "supplierGSTIN":state.supplierGSTIN,
      "anchorGSTIN":state.anchorGSTIN,
      "contentId":documentDetails.contentId,
      "anchorId":state.aname,
      "vendorId":state.vname,
      "status":"pending",
      "anchorApprover":state.anchorApprover,
      "tcapApprover":"hello@trustless.capital",
      "comments":state.comment
  }
  console.log("Invoice", inv);
     const invoiceUpload = await companyApiProvider.uploadInvoiceDetails(inv);
    if(invoiceUpload.invoiceNumber){
      alert('Invoice uploaded successfully');
      setState({
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
        supplierGSTIN:'',
        anchorGSTIN:'',
        anchorApprover: '',
        invurl: '',
        invverificationurl: '', 
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
        comment:''
      });
      setSteps(3);
    }
  }
  const handleViewOnly = () => {
    setState({ ...state, viewOnly: !state.viewOnly });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // alert('are you sure you want to send for approval?');
     setState({ ...state, open: true });
  };

  const onHandleClose = (e) => {
    if (e.target.firstChild.data == 'No') {
      setState({ ...state, open: false });
    } else {
      // var joined = state.approvalInvoice.concat({
      //   tid: state.tid,
      //   invno: state.invno,
      //   vname: state.vname,
      //   aname: state.aname,
      //   supplierGSTIN: state.supplierGSTIN,
      //   anchorGSTIN: state.anchorGSTIN,
      //   vloc: state.vloc,
      //   aloc: state.aloc,
      //   ptype: state.ptype,
      //   invdt: state.invdt,
      //   duedt: state.duedt,
      //   invamt: state.invamt,
      //   paydt: state.paydt,
      //   irate: state.irate,
      //   anchorApprover: state.anchorApprover,
      //   invurl: state.invurl,
      // });
      uploadInvoiceDetails();
    }
  };

  // componentWillUpdate(nextProps, nextState) {
  //   // localStorage.setItem("user", JSON.stringify(nextState));
  // }

  return (
  <Container fluid>
  <Row>
  <Col  className="box" sm={3}><Sidebar /></Col>
    <Col className="box1" sm={9}>
    <div className="addInvPage">
    
    
    
      <h3 className="addInvPageTitle">Upload New Invoice</h3>
      {/* <Button>
          <Link to="/marketplace">Market Place</Link>
        </Button> */}
      <Grid container spacing={3} justifyContent="center">
        
        {/* <Grid item xs={2}>
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
        </Grid> */}
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
                <Grid container spacing={3}  justifyContent="center">
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
                            accept=".pdf"
                            name="invurl"
                            style={{ display: 'none' }}
                            onChange={onChangeInvFile}
                          />
                         <label className="LabelFile" style={{float:'right', marginLeft: "1rem"}}>{state.invurl.name}</label>
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
                            {listUsers && listUsers.map((user)=>{
                              return(
                                <option value={user.id}>{user.organisationName}</option>
                              )
                            })}
                          </select>
                        </div>
                      </Grid>
                      <Grid item md={12}>
                      <div style={{ height: '650px' }}>
                        {url ? (
                          <div style={{
                        border: '1px solid rgba(0, 0, 0, 0.3)',
                        height: '100%',
                    }}>
                          <Document file={url} onLoadSuccess={onDocumentLoadSuccess}>
                            <Page pageNumber={pageNumber} />
                          </Document>
                          <br />
                          <h2 className="Page">
                            <strong>PREVIEW</strong>
                          </h2>
                          </div>
                        ): <div
                    style={{
                        alignItems: 'center',
                        border: '2px dashed rgba(0, 0, 0, .3)',
                        display: 'flex',
                        fontSize: '2rem',
                        height: '100%',
                        justifyContent: 'center',
                        width: '100%',
                    }}
                >
                    Preview Area
                </div>}
                        </div>
                    </Grid>
                      <Grid item xs={10}>
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
              <Grid container spacing={3}  justifyContent="center">
                <Grid item xs={12}>
                  <h3 className="addInvSectionTitle">Invoice Details</h3>
                </Grid>
                <Grid item xs={12}>
                  <form className="addInvForm" onSubmit={handleSubmit} disabled>
                    <Grid container spacing={3}  justifyContent="center">
                      <Grid item xs={6} >
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
                            type="number"
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
                          <label>Vendor Name</label>
                          <select
                            className="addInvInput"
                            name="vname"
                            onChange={onChangeVname}
                            required
                            value={state.vname}
                          >
                            <option value="NA">--Select--</option>
                            {anchorList && vendorList.map((vendor)=>{
                              return (<option key={vendor.id} value={vendor.id}>{vendor.organisationName}</option>)
                            })}
                          </select>
                        </div>
                      </Grid>
                      <Grid item xs={6}>
                        <div className="addInvItem">
                          <label>Anchor Name</label>
                          <select
                            className="addInvInput"
                            name="aname"
                            onChange={onChangeAname}
                            required
                            value={state.aname}
                          >
                            <option value="NA">--Select--</option>
                            {anchorList && anchorList.map((anchor)=>{
                              return (<option key={anchor.id} value={anchor.id}>{anchor.organisationName}</option>)
                            })}
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
                            <option value="Agriculture">Agriculture</option>
                            <option value="Metals and materials">Metals and materials</option>
                            <option value="Precious metals and materials">Precious metals and materials</option>
                            <option value="Energy">Energy</option>
                            <option value="Services">Services</option>
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
                          <label>Supplier GSTIN</label>
                          <input
                            type="text"
                            className="addInvInput"
                            name="supplierGSTIN"
                            onChange={onChangeSupplierGSTIN}
                            required
                            value={state.supplierGSTIN}
                          />
                        </div>
                      </Grid>
                      <Grid item xs={6}>
                        <div className="addInvItem">
                          <label>Anchor GSTIN</label>
                          <input
                            type="text"
                            className="addInvInput"
                            name="anchorGSTIN"
                            onChange={onChangeAnchorGSTIN}
                            required
                            value={state.anchorGSTIN}
                          />
                        </div>
                      </Grid>
                      {/* <Grid item xs={6}>
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
                      </Grid> */}
                      {/* <Grid item xs={6}>
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
                      </Grid> */}
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
                      {/* <Grid item xs={6}>
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
                      </Grid> */}
                      <Grid item xs={6}>
                        <div className="addInvItem">
                          <label>Anchor Approver</label>
                          <input
                            type="email"
                            className="addInvInput"
                            name="anchorApprover"
                            value={state.anchorApprover}
                            onChange={onChangeAnchorApprover}
                            required
                          />
                        </div>
                      </Grid>
                      <Grid item xs={12}>
                        <div className="addInvItem">
                          <label>Comment</label>
                          <textarea
                            className="addInvInput"
                            name="comment"
                            value={state.comment}
                            onChange={onChangeComment}
                            required
                          ></textarea>
                        </div>
                      </Grid>
                      {/* <Grid item xs={12}>
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
                      </Grid> */}
                      <Grid item xs={6}>
                        <div className="addInvItem">
                          <input
                            className="saveInvBtn"
                            type="submit"
                            value="Submit"
                           
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
          {/* {steps>2 && <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="Seller-approval"
              id="Seller-approval"
            >
              <Typography className={classes.heading}>
                INVOICE VERIFICATION EVIDENCE
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
            
            </AccordionDetails>
          </Accordion>} */}
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="Seller-approval"
              id="Seller-approval"
            >
              <Typography className={classes.heading}>
                INVOICES
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
            <Grid container spacing={3}  justifyContent="center">
                  <Grid item xs={12}>
                  {invoices?.invoices?.length>0 && <div>
            {/* <h1>Invoices</h1> */}
            <div>

            <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell align="right">Commodity Type</TableCell>
            <TableCell align="right">Due Date</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Transaction Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>

        {invoices.invoices.map((invoice)=>{
                return(
               <TableRow key={invoice.invoiceNumber}>
              <TableCell component="th" scope="row">
                {invoice.invoiceNumber}
              </TableCell>
              <TableCell align="right">{invoice.commodityType}</TableCell>
              <TableCell align="right">{invoice.dueDate}</TableCell>
              <TableCell align="right">{invoice.status}</TableCell>
              <TableCell align="right">{invoice.transactionDate}</TableCell>
            </TableRow>
                )
               }) }
        </TableBody>
      </Table>
    </TableContainer>
               
            </div>
            </div>}
                      </Grid>
                      
                </Grid>
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
    </Col>
    </Row>
    </Container>
  );
}
