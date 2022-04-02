import "./admin.css";
import React, { useEffect, useState } from "react";
import { VisibilityOutlined } from "@material-ui/icons";
import { Link } from "react-router-dom";
import base58 from "bs58";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import MUIButton from '@material-ui/core/Button';
import Button from "react-bootstrap/Button";
import { TextField } from "@material-ui/core";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import { companyApiProvider } from "services/api/company/companyService";
import { addToMarketplaceStub } from "stub/stub";
import { digest } from "multiformats";
import Marketplace from "pages/marketplace/Marketplace";
import Sidebar from "./Sidebar";
import AddNewUserModal from "./AddNewUserModal";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
// import { checkTargetForNewValues } from "framer-motion";
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import AadharForm from "components/KYCForm/AadharForm";
import PassportForm from "components/KYCForm/PassportForm";
import PANCardForm from "components/KYCForm/PancardForm";
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/core/styles';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const KYCMenu = ({phoneNumber, email}) => {
  const [open, setOpen] = useState(false);
  const [kycStatus, setKycStatus] = useState({
    aadhar: false,
    pancard: false,
    passport: false,
  })

  const handleClick = () => {
    setOpen(true);
  };

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const updateKYCStatus = (type, status) => {
    setKycStatus((prev) => ({
      ...prev,
      [type]: status,
    }))
  }

  const updateKYC = () => {
    const data = {
      email,
      phoneNumber,
      kyc: "approved"
    }

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      body: JSON.stringify(data)
    };

    fetch(process.env.REACT_APP_BASE_URL + '/api/user/update', requestOptions)
      .then(response => console.log(response))
      .catch(error => console.log(error));
  }

  return (
    <div>
      <MUIButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        Verify
      </MUIButton>
      <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
        <DialogTitle id="simple-dialog-title" onClose={handleClose}>
          KYC Document Verfication
        </DialogTitle>
        <DialogContent>
          <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
            <Tab label="Aadhar" {...a11yProps(0)} />
            <Tab label="PAN Card " {...a11yProps(1)} />
            <Tab label="Passport" {...a11yProps(2)} />
          </Tabs>
          <TabPanel value={value} index={0}>
            <AadharForm updateKYCStatus={(status) => updateKYCStatus('aadhar', status)}/>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <PANCardForm updateKYCStatus={(status) => updateKYCStatus('pancard', status)}/>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <PassportForm updateKYCStatus={(status) => updateKYCStatus('passport', status)}/>
          </TabPanel>
          {
            kycStatus.aadhar && kycStatus.pancard && (
              <MUIButton type='button' variant="contained" color="primary" onClick={updateKYC}>
                Update KYC
              </MUIButton>
            )
          }
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default function AdminManageUsers(props) {
  const [modalShow, setModalShow] = useState(false);
  const privKey = localStorage.getItem("privKey");
  const [allUsers, setAllUsers] = useState([]);

  console.log(props.userData);

  useEffect(() => {
    fetch(process.env.REACT_APP_BASE_URL + `/api/user/all/${props.userData.user}`)
      .then((res) => res.json())
      .then((data) => setAllUsers(data));
  }, [props.userData.user]);

  const handleClick = (e) => {
    console.log(e.target.value);
    };

  return (
    <div className="mp">
      {props.userData?.userType === "ADMIN" && privKey && (
        <div>
          <Button
            style={{
              backgroundColor: "#FFAFAF",
              color: "#FFFFFF",
              border: "none",
            }}
            variant="secondary"
            className="addnewuser"
            onClick={() => {
              setModalShow(true);
            }}
            allUsers>
            Add New User
          </Button>
          <AddNewUserModal
            show={modalShow}
            onHide={() => setModalShow(false)}
          />

          <Container fluid>
            <Row className="Deals">
              <Col sm={3}>
                <Sidebar />
              </Col>
              <Col sm={9}>
                <div className="container-fluid">
                  <div className="row justify-content-center">
                    <div className="col-12">
                      <div
                        className="table-responsive table-scroll bg-white table-hover"
                        data-mdb-perfect-scrollbar="true"
                        style={{ position: "relative", height: "700px" }}>
                        <table className="table">
                          <thead
                            className="table-dark"
                            style={{ position: "sticky", top: "0" }}>
                            <tr>
                              <th className="heads currencyRight" scope="col">
                                User Name
                              </th>
                              <th
                                className="heads currencyRight"
                                scope="col"
                                align="right">
                                User Type
                              </th>
                              <th
                                className="heads currencyRight"
                                scope="col"
                                align="right">
                                Company
                              </th>
                              <th
                                className="heads currencyRight"
                                scope="col"
                                align="right">
                                Email Address
                              </th>
                              <th
                                className="heads currencyRight"
                                scope="col"
                                align="right">
                                Mobile No.
                              </th>
                              <th
                                className="heads currencyRight"
                                scope="col"
                                align="right">
                                Active/Inactive
                              </th>
                              <th
                                className="heads currencyRight"
                                scope="col"
                                align="right">
                                  KYC
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {allUsers &&
                              allUsers.map((user) => (
                                <tr
                                  key={user.email}
                                  onClick={(e) => handleClick(e)}>
                                  <td className="mpTd currencyRight">
                                    {user.firstName}
                                  </td>
                                  <td className="mpTd currencyRight">
                                    {user.userType}
                                  </td>
                                  <td className="mpTd currencyRight">
                                    {user.companyName}
                                  </td>
                                  <td className="mpTd currencyRight">
                                    {user.email}
                                  </td>
                                  <td className="mpTd currencyRight">
                                    {user.phoneNumber}
                                  </td>
                                  <td className="mpTd currencyRight">
                                    {user.status}
                                  </td>
                                  <td className="mpTd currencyRight">
                                  {
                                    user.kyc === 'approved'
                                      ? user.kyc
                                      : (<KYCMenu email={user.email} phoneNumber={user.phoneNumber} />)
                                  }
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
      )}
    </div>
  );
}
