//import LgWidgets from '../../components/lgwidgets/LgWidgets'
//import SmWidgets from '../../components/smwidgets/SmWidgets'
//import AiWidgets from '../components/aiWidgets/AiWidgets'
//import Select from 'react-select';
import "./profile.css";
import React, { Component, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { companyApiProvider } from 'services/api/company/companyService';
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Sidebar from "../adminInvoices/Sidebar"
import Button from "react-bootstrap/Button"
import ProfileModal from "./ProfileModal"

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

export default function Profile(props) {
  // userData;
  const classes = useStyles();
  const [modalShow, setModalShow] = useState(false);
  const [userProfile, setUserProfile] = useState();
  
  const userData = props.userData;
    // useEffect(async ()=>{
    //     const data = companyApiProvider.postUserProfile;
    //     setUserProfile(data);
    // },[])
    const handleRowClick= async (event)=>{
      const id = event.target.id;
      console.log(event.target);
      
      setModalShow(true);
  }
  const handleHide = async (event)=>{
     window.location.reload();
      setModalShow(false);
  }
    console.log("users", userData);
  return (
    <div className="mp">
    
    <div className="addInvPage">
      {/* <h1 className="addInvPageTitle">Investor</h1> */}
      <Container fluid>
      <Row>
        <Col sm={3}>
          <Sidebar />
        </Col>
        <Col>
          <Row>
            <div class="col-lg-4">
                <div class="card mb-4">
                <div class="card-body text-center">
                    <img src="https://png.pngtree.com/png-clipart/20190924/original/pngtree-user-vector-avatar-png-image_4830521.jpg" alt="avatar" class="rounded-circle img-fluid" style={{width: "250px", height: "250px"}}/>
                    {userProfile && userProfile.filter(profile => profile.email===userData.email).map((item) =>{
                        return (
                            <h5 class="my-3">{item.firstName} {item.lastName}</h5>
                        );
                    })}
                    <h5 class="my-3">{userData.firstName} {userData.lastName}</h5>
                    <p class="text-muted mb-1">Admin, TCAP One</p>
                    <p class="text-muted mb-4">Sundergarh, Odisha</p>
                    {/* <div class="d-flex justify-content-center mb-2">
                        <button type="button" class="btn btn-primary">Follow</button>
                        <button type="button" class="btn btn-outline-primary ms-1">Message</button>
                    </div> */}
                </div>
                </div>
            </div>

            <div class="col-lg-8">
                <div class="card mb-4">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-sm-3">
                                <p class="mb-0">Full Name</p>
                            </div>
                            <div class="col-sm-9">
                                <p class="text-muted mb-0">{userData.firstName} {userData.lastName}</p>
                            </div>
                        </div>
                        <hr />
                        <div class="row">
                            <div class="col-sm-3">
                                <p class="mb-0">Email</p>
                            </div>
                            <div class="col-sm-9">
                                <p class="text-muted mb-0">{userData.user}</p>
                            </div>
                        </div>
                        <hr />
                        <div class="row">
                            <div class="col-sm-3">
                                <p class="mb-0">Phone</p>
                            </div>
                            <div class="col-sm-9">
                                <p class="text-muted mb-0">{userData.phone}</p>
                            </div>
                        </div>
                        <hr />
                        <div class="row">
                            <div class="col-sm-3">
                                <p class="mb-0">Wallet Address</p>
                            </div>
                            <div class="col-sm-9">
                                <p class="text-muted mb-0">{userData.walletAddress}</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-10">
                                
                            </div>
                            <div class="col-sm-2">
                            <Button style={{backgroundColor: "#FFAFAF", color: "#FFFFFF"}} variant="secondary" className="addnewuser" onClick={() => {setModalShow(true)}}>Edit</Button>
                              {modalShow ? <ProfileModal 
                                userdata={userData}
                                setModalShow={handleHide}
                                show={modalShow}
                                onHide={handleHide}
                              /> : null}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </Row>
          
          
        </Col>
      </Row>
      </Container>
    </div>
    </div>
    
  );
}
