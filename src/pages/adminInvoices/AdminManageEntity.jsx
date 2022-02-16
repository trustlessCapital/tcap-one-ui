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
import AddNewEntityModal from './AddNewEntityModal';

export default function AdminManageUsers(props) {
  const [modalShow, setModalShow] = useState(false);
  const [companyList, setCompanyList] = useState([]);
  const [rowData, setRowData] = useState(null);
  const privKey = localStorage.getItem("privKey");
    
  const handleRowClick= async (event)=>{
      const id = event.target.id;
      console.log(event.target);
      setRowData(companyList[id]);
      setModalShow(true);
  }
  const handleHide = async (event)=>{
      setRowData(null);
      setModalShow(false);
  }
  useEffect(async () => {
      const data = await companyApiProvider.getCompanyList();
      const jData = JSON.stringify(data);
      const companyData = JSON.parse(jData);
      setCompanyList(companyData);
  })
    return (
      <div className="mp">
      {props.userData?.userType == "ADMIN" && privKey && 
      <div>
        
      <Button style={{backgroundColor: "#FFAFAF", color: "#FFFFFF", border:"none"}} variant="secondary" className="addnewuser" onClick={() => {setModalShow(true)}}>Add New Entity</Button>
        {modalShow ? <AddNewEntityModal
          rowData={rowData}
          show={modalShow}
          onHide={handleHide}
        /> : null}

      
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
                                            <th className="heads currencyRight" scope="col">Vendor ID</th>
                                            <th className="heads currencyRight" scope="col" align="right">Organization Name</th>
                                            <th className="heads currencyRight" scope="col" align="right">Relationship with TCAP</th>
                                            <th className="heads currencyRight" scope="col" align="right">Email Address</th>
                                            <th className="heads currencyRight" scope="col" align="right">Admin Name</th>
                                            <th className="heads currencyRight" scope="col" align="right">Type of Company</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {companyList.length>0 && companyList.map((item, index) => {
                                                return(
                                            <tr onClick={handleRowClick}>
                                                <td id={index} className="mpTd currencyRight">{item.companyId.charCodeAt(0)}</td>
                                                <td id={index} className="mpTd currencyRight">{item.organisationName}</td>
                                                <td id={index} className="mpTd currencyRight">{item.tcapRelation}</td>
                                                <td id={index} className="mpTd currencyRight">{item.email}</td>
                                                <td id={index} className="mpTd currencyRight">{item.adminName}</td>
                                                <td id={index} className="mpTd currencyRight">{item.type}</td>
                                                
                                                
                                            </tr>
                                        )})}
                                            
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
