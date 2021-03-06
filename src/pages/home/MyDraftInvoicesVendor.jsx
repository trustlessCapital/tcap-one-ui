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
import { documentApiProvider } from 'services/api/document/documentService';
import Sidebar from "./Sidebar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


function MyDraftInvoicesVendor(props){
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
            <Container fluid>
                <Row className='Deals'>
                    <Col sm={3}>
                        <Sidebar />
                    </Col>
                    <Col sm={9}>
                    <div class="container-fluid">
                        <div class="row justify-content-center">
                            <div class="col-12">
                            <div class="table-responsive table-scroll bg-white table-hover" data-mdb-perfect-scrollbar="true" style={{position: "relative", height: "700px"}}>
                                <table class="table">
                                        <thead class="table-dark" style={{position: "sticky", top: "0"}}>
                                            <tr>
                                            <th class="heads" scope="col">Invoice Number</th>
                                            <th class="heads" scope="col" align="right">Anchor Name</th>
                                            <th class="heads" scope="col" align="right">Invoice Value</th>
                                            <th class="heads" scope="col" align="right">Evidence</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {vendorInvoices.invoices.map((row,index) => (
                                            <tr key={row.invoiceNumber}>
                                                <th scope="row">
                                                {row.invoiceNumber}
                                                </th>
                                                <td align="right">{vendorInvoices.anchors[index][1]}</td>
                                                <td align="right">{row.invoiceAmount}</td>
                                                <td align="right">
                                                <button className="investBtn investBtnLink" onClick={()=>uploadEvidenceFunc(row)}>
                                                    Upload
                                                </button>
                                                </td>
                                            </tr>
                                            ))}
                                        </tbody>
                                        </table>
                                </div>
                                </div>
                            </div>
                        </div>
                        
                    </Col>
            
            </Row>
            </Container>
        </div>
    );
}

export default MyDraftInvoicesVendor;