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
  const privKey = localStorage.getItem("privKey");

    return (
      <div className="mp"> 
      {props.userData?.userType == "ADMIN" && privKey && 
      <div> 
      <Button style={{backgroundColor: "#FFAFAF", color: "#FFFFFF", border:"none"}} variant="secondary" className="addnewuser" onClick={() => {setModalShow(true)}}>Add New Relationship</Button>
        <AddNewRelationshipModal
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
                                            <th className="heads currencyRight" scope="col">User Name</th>
                                            <th className="heads currencyRight" scope="col" align="right">User Type</th>
                                            <th className="heads currencyRight" scope="col" align="right">Company</th>
                                            <th className="heads currencyRight" scope="col" align="right">Email Address</th>
                                            <th className="heads currencyRight" scope="col" align="right">Mobile No.</th>
                                            <th className="heads currencyRight" scope="col" align="right">Active/Inactive</th>
                                            
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="mpTd currencyRight">Kapil</td>
                                                <td className="mpTd currencyRight">Vendor</td>
                                                <td className="mpTd currencyRight">Trustless</td>
                                                <td className="mpTd currencyRight"></td>
                                                <td className="mpTd currencyRight">9999999999</td>
                                                <td className="mpTd currencyRight">Active</td>
                                                
                                                
                                            </tr>

                                            <tr>
                                                <td className="mpTd currencyRight">Abhijit</td>
                                                <td className="mpTd currencyRight">Anchor</td>
                                                <td className="mpTd currencyRight">Company 4</td>
                                                <td className="mpTd currencyRight"></td>
                                                <td className="mpTd currencyRight">9888888888</td>
                                                <td className="mpTd currencyRight">Locked</td>
                                                
                                                
                                            </tr>


                                            <tr>
                                                <td className="mpTd currencyRight">Jakir</td>
                                                <td className="mpTd currencyRight">Admin</td>
                                                <td className="mpTd currencyRight">Trustless</td>
                                                <td className="mpTd currencyRight"></td>
                                                <td className="mpTd currencyRight">9777777777</td>
                                                <td className="mpTd currencyRight">Inactive</td>
                                                
                                                
                                            </tr>

                                            <tr>
                                                <td className="mpTd currencyRight">Nagarjun</td>
                                                <td className="mpTd currencyRight">Arranger</td>
                                                <td className="mpTd currencyRight">Company 3</td>
                                                <td className="mpTd currencyRight"></td>
                                                <td className="mpTd currencyRight">9666666666</td>
                                                <td className="mpTd currencyRight">Active</td>

                                                
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
