import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import Quicklinks from "./components/quicklinks/Quicklinks";
import { createTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import "./app.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AddInvoice from "./pages/addInvoice/AddInvoice";
import OnboardNewEntity from "./pages/OnboardNewEntity/OnboardNewEntity";
import EntityList from "./components/EntityList/entityList";
import Marketplace from "./pages/marketplace/Marketplace";
import MsmeApprove from "./pages/msmeApprove/MsmeApprove";
import AnchorApprove from "./pages/anchorAprrove/AnchorApprove";
import MyInvestments from "./pages/myInvestments/MyInvestments";
import Authentication from "./pages/Authentication/Authentication";
import Dashboard from "./pages/dashboard/Dashboard";
import Admin from "./pages/admin/admin";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import VARelationship from "pages/VendorAnchorRelationship/VARelationship";
import Buyer from "pages/buyer/buyer";
import Container from "react-bootstrap/Container";
import Seller from "pages/seller/seller";
import Arranger from "pages/arranger/arranger";
import Investor from "pages/investor/investor";
import Signup from "pages/signup/Signup";
import { companyApiProvider } from "services/api/company/companyService";
import MyDraftInvoicesVendor from "pages/home/MyDraftInvoicesVendor";
import CompletedDealsVendor from "pages/home/CompletedDealsVendor";
import {AnimatePresence, motion} from 'framer-motion/dist/framer-motion';
import validator from 'validator';
import OpenLogin from "@toruslabs/openlogin";
import Button from 'react-bootstrap/Button';
import { FaGoogle, FaFacebook } from "react-icons/fa";
import Link from '@material-ui/core/Link';
import { MDBInput } from 'mdb-react-ui-kit';
import { makeStyles } from '@material-ui/core/styles';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Avatar from '@material-ui/core/Avatar';
// import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
// import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import 'react-phone-input-2/lib/bootstrap.css'
import { userApiProvider } from 'services/api/user/userService';
import useFetch from "react-fetch-hook"
import axios from "axios"

//import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
//import { Home } from "@material-ui/icons";

const theme = createTheme({
  palette: {
    primary: {
      main: "#e50914",
    },
    secondary: {
      main: "#cfcfcf",
    },
  },
});

const VERIFIER = [
  {
    loginProvider: "google",
    id : "0"
  },
  {
    loginProvider: "facebook",
    id : "1"
  }
]

function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://www.trustless.capital/">
          TCAP
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));




const App = () => {
  const [token, setToken] = useState(null);
  const [emailVerify,setEmailVerify] = useState(null);
  const classes = useStyles();
  const [isLoading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [formIsValid, setFormIsValid] = useState(false);
  const [openlogin, setOpenLogin] = useState();
  const [privKey, setPrivKey] = useState(null);
  const [OpenloginUserInfo, setOpenloginUserInfo] = useState();
  const [webAuth, setwebAuth] = useState(false);
  const [userDataDetails, setUserDetails] = useState([]);
  const [userData, setUserData] = useState(null);
  // const {data} = useFetch("https://eoql7b7hs2.execute-api.us-east-2.amazonaws.com/dev/api/user/detail/abhijit.panda1319@gmail.com")
  // const userData = data;

  localStorage.setItem('privKey', privKey);
  localStorage.setItem('userData', userData);
  var loginObject ={
    loginProvider: "google",
    clientId: "BDEZMlXEtCPU0_sfOO22To8ZnFS8ppSJs_yBNBxiMWhdAmPJSUk4jlCI3ykKBHO2cl1iDEu_M6UDVFAqALmZPto",
    redirectUrl: "http://localhost:7005/"
  }
  console.log('User', userData);
  useEffect(() => {
    setFormIsValid(validator.isEmail(email))
  }, [email]);
  console.log('token', token);

  const tokenset = async () =>{
    console.log(userData);
    if (userData && userData.email.trim().length) {
      if(userData?.userType!='investor'){
        const userDataDetails= await companyApiProvider.verifyEmail(userData?.email);
      }
    await setUserDetails(userDataDetails);
      if (userData.hasOwnProperty("email")) {
        // setToken({
        //   user: userData.email,
        //   type: userData?.userType=='investor' ? 'investor': userDataDetails.tcapRelation,
        //   utoken: userData.jwt_token,
        //   userId:userData.id,
        //   walletAddress:userData?.walletAddress || null
        // });
        setToken({
          user: userData.email,
          type: userData?.userType=='investor' ? 'investor': userDataDetails.tcapRelation,
          privKey: userData.privKey,
          userId:userData.id,
          walletAddress:userData?.walletAddress || null
        });
      }
      // if(userData.userType!='investor'){var verifiedEmail = await companyApiProvider.verifyEmail(userData.email)
      //  setEmailVerify(verifiedEmail);
      //  console.log(emailVerify)}
      if(userData.userType!='investor'){var verifiedEmail = await companyApiProvider.verifyEmail(userData.email)
       setEmailVerify(verifiedEmail);
       console.log(emailVerify)}
  }}

  if(privKey && !token){
    tokenset(); 
  }

  const onMount = async () => {

    setLoading(true);
    try {
      const openlogin = new OpenLogin({
        clientId: loginObject.clientId,
        network: "mainnet", // valid values (testnet or mainnet)
      });
      
      setOpenLogin(openlogin);

      await openlogin.init();
      setPrivKey(openlogin.privKey);
    } finally {
      setLoading(false);
    }
  };

  const onLoginEmail = async (event) => {

    
    if (isLoading || privKey || !openlogin) return;

    setLoading(true);
    try {
      await openlogin.login({
        extraLoginOptions: {
          login_hint: email,
        },
        loginProvider: "email_passwordless",
        redirectUrl: "http://localhost:7005/",
    });

    
    
    setPrivKey(openlogin.privKey);
    
      
    
      
  
    
    
    } finally {
      setLoading(false);
    }
  };

  const onLogout = async () =>{

    if (isLoading || !openlogin) return;
    
    setLoading(true);
      try {
        await openlogin.logout();
        setPrivKey(null);
      } finally {
        setLoading(false);
      }
    };

    

 
  useEffect(() => {
    
    onMount();
    const url = "https://eoql7b7hs2.execute-api.us-east-2.amazonaws.com/dev/api/user/detail/abhijit.panda1319@gmail.com";

        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const json = await response.json();
                console.log(userData, json);
                setUserData(json);
            } catch (error) {
                console.log("error", error);
            }
        };

        fetchData();
  
  }, []);


  const history = useHistory();
  console.log("history", history);
  
  // useEffect(async() => {
  //   let userData = localStorage.getItem("userData") || null;
  //   if(!userData){
  //     return;
  //   }
  //   console.log(userData);
  //   if (userData && userData.trim().length) {
  //     userData = JSON.parse(userData);
  //     if(userData?.userType!='investor'){
  //       const userDataDetails= await companyApiProvider.verifyEmail(userData?.email);
  //     }
  //   await setUserDetails(userDataDetails);
  //     if (userData.hasOwnProperty("email")) {
  //       // setToken({
  //       //   user: userData.email,
  //       //   type: userData?.userType=='investor' ? 'investor': userDataDetails.tcapRelation,
  //       //   utoken: userData.jwt_token,
  //       //   userId:userData.id,
  //       //   walletAddress:userData?.walletAddress || null
  //       // });
  //       setToken({
  //         user: userData.email,
  //         type: userData?.userType=='investor' ? 'investor': userDataDetails.tcapRelation,
  //         privKey: userData.privKey,
  //         userId:userData.id,
  //         walletAddress:userData?.walletAddress || null
  //       });
  //     }
  //     // if(userData.userType!='investor'){var verifiedEmail = await companyApiProvider.verifyEmail(userData.email)
  //     //  setEmailVerify(verifiedEmail);
  //     //  console.log(emailVerify)}
  //     if(userData.userType!='investor'){var verifiedEmail = await companyApiProvider.verifyEmail(userData.email)
  //      setEmailVerify(verifiedEmail);
  //      console.log(emailVerify)}
  //   }
  // }, []);
  

  const logout = () => {
    setToken(null);
    onLogout();
    // history.push('/signup');
  };  

  if(isLoading) return <div className="central">Loading...</div>;
  

  return (token ?
    <Router>
      <ThemeProvider theme={theme}>
        {token && <Topbar token={token} logout = {logout} verified={emailVerify} userData={token}/>}
        <Container fluid>
          {/* <Sidebar token={token}/> */}
          <div className="pageContents">
            <div className="pagesWrapper">
              {/* <Quicklinks/> */}
              <AnimatePresence>
              <Switch>
               
                <Route exact path="/">
                  <Dashboard verified={emailVerify} userData={token}/>
                </Route>
                <Route exact path="/admin">
                  <Admin />
                </Route>
                <Route path="/addinvoices">
                  <AddInvoice verified={emailVerify} userData={token}/>
                </Route>
                 <Route path="/onboardentity">
                  <OnboardNewEntity verified={emailVerify} userData={token}/>
                </Route>
                <Route path="/adminonboardentity">
                  <OnboardNewEntity verified={emailVerify} userData={token}/>
                </Route>
                <Route path="/varelationship">
                  <VARelationship verified={emailVerify} userData={token}/>
                </Route>
                <Route path="/entitylist">
                  <EntityList verified={emailVerify} userData={token}/>
                </Route>
                <Route path="/myinvestments">
                  <MyInvestments verified={emailVerify} userData={token}/>
                </Route>
                <Route path="/marketplace">
                  <Marketplace verified={emailVerify} userData={token}/>
                </Route>
                <Route path="/msmeapprove">
                  <MsmeApprove verified={emailVerify} userData={token}/>
                </Route>
                <Route path="/anchorapprove">
                  <AnchorApprove verified={emailVerify} userData={token}/>
                </Route>
                <Route path="/buyer">
                  <Buyer verified={emailVerify} userData={token}/>
                </Route>
                <Route path="/seller">
                  <Seller verified={emailVerify} userData={token}/>
                </Route>
                <Route path="/arranger">
                  <Arranger verified={emailVerify} userData={token}/>
                </Route>
                <Route path="/investor">
                  <Investor verified={emailVerify} userData={token}/>
                </Route>
                <motion.div exit={{ opacity: 0.1 }}>
                <Route path="/MyDraftInvoicesVendor">
                  <MyDraftInvoicesVendor verified={emailVerify} userData={token}/>
                </Route>
                <Route path="/CompletedDealsVendor">
                  <CompletedDealsVendor verified={emailVerify} userData={token}/>
                </Route>
                </motion.div>
                <Route path="/signup">
                  <Signup setToken={setToken} />
                </Route>
              </Switch>
              </AnimatePresence>
            </div>
          </div>
        </Container>
      </ThemeProvider>
    </Router>
      : <div className="central">
      <Container fluid >
      <Row>
      <Col sm={4}></Col>
      <Col sm = {4}>
      <CssBaseline />
      <div className={classes.paper}>
          <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
          TCAP ONE
          </Typography>
      <form className={classes.form} noValidate>
      <MDBInput 
          label='Email Address'
          id='typeEmail'
          type='email'
          size='lg'
          value={email}
          onChange={(event) => setEmail(event.target.value)}
      />
      <Button className="loginbutton"
          disabled={!formIsValid}
          variant="dark"
          onClick={onLoginEmail}
      >
          Login
      </Button>
      </form>
      </div>
      <Box mt={8}>
      <Copyright />
    </Box>
    </Col>
    </Row>
    </Container>
    </div> 
  );
};

export default App;
