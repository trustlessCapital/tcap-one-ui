//import LgWidgets from '../../components/lgwidgets/LgWidgets'
//import SmWidgets from '../../components/smwidgets/SmWidgets'
//import AiWidgets from '../components/aiWidgets/AiWidgets'
import './seller.css';
//import Select from 'react-select';
import React, { Component, useState } from 'react';
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

export default function Seller() {
  // userData;
  const classes = useStyles();

  return (
    <div className="addInvPage">
      <h3 className="addInvPageTitle">Seller</h3>
      <Grid container spacing={3}>
        <Grid item xs={12}>
      <Typography>Please complete you KYC  <Button variant="contained">
        <Link to="#">Complete KYC</Link>
      </Button></Typography>
      </Grid>
      </Grid>
      <Button variant="contained">
        <Link to="/onboardentity">Onboard Buyer/Seller</Link>
      </Button>
      <Button variant="contained">
        <Link to="/addinvoices">Upload Invoices</Link>
      </Button>
      <Button variant="contained">
        <Link to="/viewinvoices">View Invoices</Link>
      </Button>
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
              <Typography className={classes.heading}>INVOICES</Typography>
              {/* <Button variant="contained"><Link to="/onboardentity">ADD NEW</Link></Button> */}
              {/* <Button variant="contained"> LOOKUP</Button> */}
            </AccordionSummary>
            <AccordionDetails>
              <div className={classes.root}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <InvoiceList />
                  </Grid>
                </Grid>
              </div>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="entity-list"
              id="entity-list"
            >
              <Typography className={classes.heading}>
                BUYERS/SELLERS
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
          </Accordion>
        </div>
      </div>
    </div>
  );
}
