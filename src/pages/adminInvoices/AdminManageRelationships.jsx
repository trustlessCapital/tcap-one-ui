import './admin.css'
import React, { useEffect,useState } from 'react'
import {VisibilityOutlined}  from "@material-ui/icons"
import { Link} from "react-router-dom";
import base58 from 'bs58';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Button from 'react-bootstrap/Button';
import { TextField } from '@material-ui/core';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DialogTitle from '@material-ui/core/DialogTitle';
import { companyApiProvider } from 'services/api/company/companyService';
import { addToMarketplaceStub } from 'stub/stub';
import { digest } from 'multiformats';
import Marketplace from 'pages/marketplace/Marketplace';
import Sidebar from './Sidebar';
import AddNewRelationshipModal from "./AddNewRelationshipModal"


export default function AdminManageRelationships(props) {
  const [modalShow, setModalShow] = useState(false);
  const [companyRelationship, setCompanyRelationship] = useState([]);
  const [rowData, setRowData] = useState(null);
  const privKey = localStorage.getItem("privKey");

  const handleRowClick= (event)=>{
      const id = event.target.id;
      setRowData(companyRelationship[id]);
      setModalShow(true);
  }
  const handleHide = (event)=>{
      setRowData(null);
      setModalShow(false);
  }
  useEffect(async () => {
      const data = await companyApiProvider.getCompanyRelationship();
      const jData = JSON.stringify(data);
      const companyData = JSON.parse(jData);
      setCompanyRelationship(companyData);
  })

    return (
      <div className="mp"> 
      {props.userData?.userType == "ADMIN" && privKey && 
      <div> 
      <Button style={{backgroundColor: "#FFAFAF", color: "#FFFFFF", border:"none"}} variant="secondary" className="addnewuser" onClick={() => {setModalShow(true)}}>Add New Relationship</Button>
        <AddNewRelationshipModal
          rowData={rowData}
          show={modalShow}
          onHide={handleHide}
        />
    

      
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
                                            <th className="heads currencyRight" scope="col">Relationship ID</th>
                                            <th className="heads currencyRight" scope="col" align="right">Vendor Name</th>
                                            <th className="heads currencyRight" scope="col" align="right">Anchor Name</th>
                                            <th className="heads currencyRight" scope="col" align="right">Relationship</th>
                                            <th className="heads currencyRight" scope="col" align="right">Status</th>
                                            <th className="heads currencyRight" scope="col" align="right">Relationship Years</th>
                                            <th className="heads currencyRight" scope="col" align="right">Arranger</th>
                                            <th className="heads currencyRight" scope="col" align="right">Vendor POC</th>
                                            <th className="heads currencyRight" scope="col" align="right">Anchor POC</th>
                                            
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {companyRelationship.length>0 && companyRelationship.map((item, index) => {
                                                return(
                                                    <tr id={index} onClick={handleRowClick}>
                                                        <td className="mpTd currencyRight">{}</td>
                                                        <td className="mpTd currencyRight">{item.vendorEmail}</td>
                                                        <td className="mpTd currencyRight">{item.anchorEmail}</td>
                                                        <td className="mpTd currencyRight">{item.relationship}</td>
                                                        <td className="mpTd currencyRight">{item.status}</td>
                                                        <td className="mpTd currencyRight">{item.relationshipYears}</td>
                                                        <td className="mpTd currencyRight">{item.arrangerEmail}</td>
                                                        <td className="mpTd currencyRight">{item.vendorContact}</td>
                                                        <td className="mpTd currencyRight">{item.anchorContact}</td>
                                                        
                                                        
                                                        
                                                    </tr>
                                                );
                                            })}
                                            

                                            
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
      }
      </div>
    );
}
