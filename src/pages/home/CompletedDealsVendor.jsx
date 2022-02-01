import LgWidgets from '../../components/lgwidgets/LgWidgets';
import SmWidgets from '../../components/smwidgets/SmWidgets';
import { Link } from 'react-router-dom';
import './home.css';
import { React, useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import { Publish } from '@material-ui/icons';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { companyApiProvider } from 'services/api/company/companyService';
import { Grid } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Sidebar from "./Sidebar";
import { documentApiProvider } from 'services/api/document/documentService';

export default function CompletedDealsVendor(props) {
  const [relationships, setRelationships] = useState([]);
  const [userDataDetails, setUserDetails] = useState([]);
  const [vendorInvoices, setVendorInvoices] = useState({invoices:[],anchors:[]});
  const [uploadEvidenceOpen, setUploadEvidenceOpen] = useState(false);
  const [invoiceEvidence,setInvoiceEvidence] = useState(null);
  const [selectedInvoice,setSelectedInvoice] = useState(null);
  const [DocumentIvoiceVerificationDetails,setDocumentIvoiceVerificationDetails] = useState(null);
  useEffect(async () => {
    let relationshipsData = [];
    let vendorInvoices = [];
    const userDataDetails = await companyApiProvider.verifyEmail(
      props?.userData?.user
    );
    setUserDetails(userDataDetails);
    if (userDataDetails.tcapRelation == 'vendor')
      {relationshipsData = await companyApiProvider.getVendorRelationships(
        props?.userData?.user
      );
      vendorInvoices = await companyApiProvider.getVendorInvoices(userDataDetails.id);
    }
    else if (userDataDetails.tcapRelation == 'anchor')
     { relationshipsData = await companyApiProvider.getAnchorRelationships(
        props?.userData?.user
      );
    }
    await setRelationships(relationshipsData);
    await setVendorInvoices(vendorInvoices);
  }, [props]);

  const uploadInvoiceVerification = async (invoice) => {
    const documentFormData = new FormData();
    // Update the formData object
    documentFormData.append(
      'document',
      invoiceEvidence,
      invoiceEvidence.name
    );
     const uploadSuccess = await documentApiProvider.submitDocuments(documentFormData);
     let userData = JSON.parse(localStorage.getItem('userData'));
     if(uploadSuccess.contenId)
     {const serverUpload = await documentApiProvider.updateDocumentsToServer({
      //"companyId":companyCreateSuccessResponse.id, // this comes from?
      "companyId":userData.id,
      "userEmail":userData.email,
      "contentId":uploadSuccess.contenId,
      "version":"1",// this comes from?
      "type":'OTH',// what are the other fields 
      "description":`Others`, // static or getting from some other data?
      "comments":`evidence-${selectedInvoice.id}`, // this comes from?
      "fileName": invoiceEvidence.name,
      "fileKey" : uploadSuccess.fileKey
    })
    if(serverUpload.fileKey){
      setDocumentIvoiceVerificationDetails(serverUpload);
      setUploadEvidenceOpen(false);
      setInvoiceEvidence(null);
      alert("Invoice verification document uploaded successfully");
    }}
    else{
      alert('something wrong with document upload . please try again!!');
    }
  }
  const onChangeInvVerificationFile = (e) => {
    setInvoiceEvidence(e.target.files[0]);
  };
  const uploadEvidenceFunc = (invoice) => {
    setUploadEvidenceOpen(true);
    setSelectedInvoice(invoice);
  }

  return (
    <div className='homeWidgets'>




        {userDataDetails?.tcapRelation == 'vendor' && (
        <Container fluid >
        <Row  className='Deals'>
            <Col sm={3}>
                <Sidebar />
            </Col>
            <Col sm={9}>
            <Grid container>
                <Grid item xs={12}>
                <h3>Approved/Completed Deals</h3>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                        <TableCell>Invoice Number</TableCell>
                        <TableCell align="right">Anchor Name</TableCell>
                        <TableCell align="right">Invoice Value</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {vendorInvoices.invoices.filter((invoice)=>invoice.status=='approved').map((row) => (
                        <TableRow key={row.invoiceNumber}>
                            <TableCell component="th" scope="row">
                            {row.invoiceNumber}
                            </TableCell>
                            <TableCell align="right">{row.anchorId}</TableCell>
                            <TableCell align="right">{row.invoiceAmount}</TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                    </Table>
                </TableContainer>
                </Grid>
            </Grid>
          </Col>
          </Row>
          </Container>
        )}





      </div>
  );
}
