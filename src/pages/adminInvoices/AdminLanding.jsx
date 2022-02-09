import LgWidgets from '../../components/lgwidgets/LgWidgets';
import SmWidgets from '../../components/smwidgets/SmWidgets';
import { Link } from 'react-router-dom';
import './admin.css';
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

export default function AdminLanding(props) {
  
    const privKey = localStorage.getItem("privKey");


  return (
    <div className="adminlanding">




          {props.userData?.user == "abhijit.panda1319@gmail.com" && privKey && (
            <Container fluid>
              <Row className='homey'>
                <Col sm={3}>
                  <Sidebar />
                </Col>
                
              </Row>
            </Container>
            
          )}
        
          
      
    </div>
  );
}
