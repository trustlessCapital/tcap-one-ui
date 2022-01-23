//import LgWidgets from '../../components/lgwidgets/LgWidgets'
//import SmWidgets from '../../components/smwidgets/SmWidgets'
//import AiWidgets from '../components/aiWidgets/AiWidgets'
import './investor.css';
//import Select from 'react-select';
import React, { Component, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Publish } from '@material-ui/icons';
// import { Component, useState } from "react";
import Dialog from '@material-ui/core/Dialog';
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
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import EntityList from 'components/EntityList/entityList';
import InvoiceList from 'components/InvoiceList/invoicelist';
import { companyApiProvider } from 'services/api/company/companyService';
import Sidebar from './sidebar';
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import CountUp from 'react-countup';
import Graph from "./Graph";

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

export default function Investor(props) {
  // userData;
  const classes = useStyles();
  const [balance,setBalance] = useState(null);
  const [investmentHistory,setInvestmentHistory] = useState([]);
useEffect(async ()=>{
const investorBalance = await companyApiProvider.getInvestorBalance(props.userData?.walletAddress);
setBalance(investorBalance);
const invHistory = await companyApiProvider.getInvestmentHistory(props.userData?.walletAddress);
setInvestmentHistory(invHistory);
},[])
  return (
    <div className="addInvPage">
      <h1 className="addInvPageTitle">Investor</h1>
      <Container fluid>
      <Row>
        <Col sm={3}>
          <Sidebar />
        </Col>
        <Col>
          <Row>
            <Col className='Balance' sm={5}>
              <Row>
                <h3>Currency: USDC, Balance: </h3>
              </Row>
              <Row className='Point'>

                <CountUp 
                  end={21000} //{balance?.usdc}
                  duration={5} //{balance?.eth}
                />
              </Row>
            </Col>
            
          </Row>
          
          {/* <Grid container spacing={3}>
            <Grid item xs={12}> */}
          {/* <Typography>Please complete you KYC  <Button variant="contained">
            <Link to="#">Complete KYC</Link>
          </Button></Typography> */}
          {/* <Typography>Currency: USDC, Balance: {balance?.usdc}<br></br></Typography>
          <Typography>Currency: ETH, Balance: {balance?.eth} </Typography> <Button variant="contained">
            <Link to="/marketplace">Go to Marketplace</Link>
          </Button>
          </Grid>
          </Grid> */}
          {/* <Button variant="contained">
            <Link to="/onboardentity">Onboard Buyer/Seller</Link>
          </Button>
          <Button variant="contained">
            <Link to="/addinvoices">Upload Invoices</Link>
          </Button>
          <Button variant="contained">
            <Link to="/viewinvoices">View Invoices</Link>
          </Button> */}
          {/* <Grid container xs={12}>
            <Grid item xs={10}>
              <FormControlLabel
                control={
                  <Switch
                    checked={state.viewOnly}
                    onChange={handleViewOnly}
                    name="viewOnly"
                    color="primary"
                  />
                }
                label="View Only"
              />
            </Grid>
            <Grid item xs={2}>
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
            </Grid>
          </Grid> */}
          <div className="addInvPageWrapper">
            {/* <Dialog
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
            </Dialog> */}
            <div className={classes.root}>
              <Accordion color="primary">
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="entity-details"
                  id="entity-details"
                >
                  <Typography className={classes.heading}>INVESTMENT HISTORY</Typography>
                  {/* <Button variant="contained"><Link to="/onboardentity">ADD NEW</Link></Button> */}
                  {/* <Button variant="contained"> LOOKUP</Button> */}
                </AccordionSummary>
                <AccordionDetails>
                  <div className={classes.root}>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <InvoiceList history = {investmentHistory} />
                      </Grid>
                    </Grid>
                  </div>
                </AccordionDetails>
              </Accordion>
              {/* <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="entity-list"
                  id="entity-list"
                >
                  <Typography className={classes.heading}>
                    DEALS
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <div className={classes.root}>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <EntityList />
                      </Grid>
                    </Grid>
                  </div>
                </AccordionDetails>
              </Accordion> */}
            </div>
          </div>
      </Col>
      </Row>
      </Container>
    </div>
    
  );
}
