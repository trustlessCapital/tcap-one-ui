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
import Sidebar from "./Sidebar";
import { documentApiProvider } from 'services/api/document/documentService';
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import CountUp from "react-countup";

export default function Home(props) {
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
    <div className="home">
       <Dialog open={uploadEvidenceOpen} onClose={()=>setUploadEvidenceOpen(false)}>
        <DialogTitle>
         Add Evidence</DialogTitle>
        <DialogContent>
          <DialogContentText>
            please upload document
          </DialogContentText>
          <Grid container spacing={3}  justifyContent="center">
                  <Grid item xs={12}>
                        <div className="addInvItem">
                          <label>Upload Invoice Verification Evidence</label>
                          <label htmlFor="invoiceverificationfile" className="labelFile">
                            <Publish />
                            <span>Select File</span>
                          </label>
                          <input
                            type="file"
                            id="invoiceverificationfile"
                            name="invoiceverificationfile"
                            style={{ display: 'none' }}
                            onChange={onChangeInvVerificationFile}
                          />
                         <label style={{float:'right'}}>{invoiceEvidence?.name}</label>
                        </div>
                      </Grid>
                </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>setUploadEvidenceOpen(false)} >Cancel</Button>
          <Button onClick={uploadInvoiceVerification}>Upload</Button>
        </DialogActions>
      </Dialog>
      <div className="homeWidgets">
        <div style={{ flexGrow: '1' }}>
          {/* <h1>Welcome {props?.userData?.user}</h1> */}
        </div>
        {/* <SmWidgets/>
                <LgWidgets/> */}

        {!props.verified?.companyId &&
          !(
            props.userData?.user == 'lingraj@trustless.capital' ||
            props.userData?.user == 'kapil@trustless.capital' ||
            props.userData?.user == 'nagarjun@trustless.capital' ||
            props.userData?.user == 'hello@trustless.capital'
          ) && (
            <>
              <br></br>
              <div className='KYC'>
                Please verify you KYC &nbsp;
                <Link to="/onboardentity">Verify</Link>
              </div>
              <div></div>
            </>
          )}













          {userDataDetails?.tcapRelation == 'vendor' && (
            <Container fluid>
              <Row className='homey'>
                <Col sm={3}>
                  <Sidebar />
                </Col>
                <Col className='Balance' sm={4}>
                  <Row className='balhead'>
                    <h3 className='balheadval'>Currency: USDC, Borrowed: </h3>
                  </Row>
                  <Row className='Point'>

                    <CountUp 
                      end={21000} //{balance?.usdc}
                      duration={5} //{balance?.eth}
                    />
                  </Row>
                </Col>
              </Row>
            </Container>
            
          )}



  




        {props?.userData?.type == 'company' &&
          userDataDetails.tcapRelation == 'vendor' && (
            <div>
              <h1>Clients</h1>
              <div>
                <TableContainer component={Paper}>
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Anchor Approver Email</TableCell>
                        <TableCell align="right">Anchor Contact</TableCell>
                        <TableCell align="right">Anchor Email</TableCell>
                        <TableCell align="right">Arranger Email</TableCell>
                        <TableCell align="right">Relationship</TableCell>
                        <TableCell align="right">
                          Relationship in Years
                        </TableCell>
                        <TableCell align="right">Status</TableCell>
                        <TableCell align="right">Vendor Contact</TableCell>
                        <TableCell align="right">Vendor Email</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {relationships.map((relationship) => {
                        return (
                          <TableRow
                            key={relationship.id}
                            sx={{
                              '&:last-child td, &:last-child th': { border: 0 },
                            }}
                          >
                            <TableCell component="th" scope="row">
                              {relationship.anchorApproverEmail}
                            </TableCell>
                            <TableCell align="right">
                              {relationship.anchorContact}
                            </TableCell>
                            <TableCell align="right">
                              {relationship.anchorEmail}
                            </TableCell>
                            <TableCell align="right">
                              {relationship.arrangerEmail}
                            </TableCell>
                            <TableCell align="right">
                              {relationship.relationship}
                            </TableCell>
                            <TableCell align="right">
                              {relationship.relationshipYears}
                            </TableCell>
                            <TableCell align="right">
                              {relationship.status}
                            </TableCell>
                            <TableCell align="right">
                              {relationship.vendorContact}
                            </TableCell>
                            <TableCell align="right">
                              {relationship.vendorEmail}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </div>
          )}
      </div>
    </div>
  );
}
