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
  const privKey = localStorage.getItem("privKey");
    
    return (
      <div className="mp">
      {props.userData?.userType == "ADMIN" && privKey && 
      <div>
        
      <Button style={{backgroundColor: "#FFAFAF", color: "#FFFFFF", border:"none"}} variant="secondary" className="addnewuser" onClick={() => {setModalShow(true)}}>Add New Entity</Button>
        <AddNewEntityModal
          show={modalShow}
          onHide={() => setModalShow(false)}
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
                                            <th className="heads currencyRight" scope="col">Vendor ID</th>
                                            <th className="heads currencyRight" scope="col" align="right">Organization Name</th>
                                            <th className="heads currencyRight" scope="col" align="right">Relationship with TCAP</th>
                                            <th className="heads currencyRight" scope="col" align="right">Email Address</th>
                                            <th className="heads currencyRight" scope="col" align="right">Email ID</th>
                                            <th className="heads currencyRight" scope="col" align="right">Admin Name</th>
                                            <th className="heads currencyRight" scope="col" align="right">Type of Company</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="mpTd currencyRight">12</td>
                                                <td className="mpTd currencyRight">TCAP</td>
                                                <td className="mpTd currencyRight">Anchor</td>
                                                <td className="mpTd currencyRight">test1@test.com</td>
                                                <td className="mpTd currencyRight">Edit</td>
                                                <td className="mpTd currencyRight">Active</td>
                                                <td className="mpTd currencyRight">xyz</td>
                                                
                                                
                                            </tr>

                                            <tr>
                                                <td className="mpTd currencyRight">18</td>
                                                <td className="mpTd currencyRight">Console Freight</td>
                                                <td className="mpTd currencyRight">Arranger</td>
                                                <td className="mpTd currencyRight">test2@test.com</td>
                                                <td className="mpTd currencyRight">Edit</td>
                                                <td className="mpTd currencyRight">Locked</td>
                                                <td className="mpTd currencyRight">abc</td>
                                                
                                            </tr>


                                            <tr>
                                                <td className="mpTd currencyRight">15</td>
                                                <td className="mpTd currencyRight">Swiggy</td>
                                                <td className="mpTd currencyRight">Vendor</td>
                                                <td className="mpTd currencyRight">test3@test.com</td>
                                                <td className="mpTd currencyRight">Edit</td>
                                                <td className="mpTd currencyRight">Inactive</td>
                                                <td className="mpTd currencyRight">ity</td>
                                                
                                            </tr>

                                            <tr>
                                                <td className="mpTd currencyRight">13</td>
                                                <td className="mpTd currencyRight">Infosys</td>
                                                <td className="mpTd currencyRight">Anchor</td>
                                                <td className="mpTd currencyRight">test3@test.com</td>
                                                <td className="mpTd currencyRight">Edit</td>
                                                <td className="mpTd currencyRight">Active</td>
                                                <td className="mpTd currencyRight">zxc</td>
                                                
                                            </tr>
                                            
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
