import React from "react";
import { useState, useEffect } from "react";
import validator from 'validator';
import OpenLogin from "@toruslabs/openlogin";
import Button from 'react-bootstrap/Button';
import { FaGoogle, FaFacebook } from "react-icons/fa";
import Link from '@material-ui/core/Link';
import { MDBInput } from 'mdb-react-ui-kit';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
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
import useFetch from "react-fetch-hook";
import axios from "axios";


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

export default function Web3signin(props) {

  const classes = useStyles();
  const [isLoading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [formIsValid, setFormIsValid] = useState(false);
  const [openlogin, setOpenLogin] = useState();
  const [privKey, setPrivKey] = useState();
  const [OpenloginUserInfo, setOpenloginUserInfo] = useState();
  const [webAuth, setwebAuth] = useState(false);
  const {data} = useFetch("https://eoql7b7hs2.execute-api.us-east-2.amazonaws.com/dev/api/user/detail/abhijit.panda1319@gmail.com")
  const userData = data;
  var loginObject ={
    loginProvider: "google",
    clientId: "BDEZMlXEtCPU0_sfOO22To8ZnFS8ppSJs_yBNBxiMWhdAmPJSUk4jlCI3ykKBHO2cl1iDEu_M6UDVFAqALmZPto",
    redirectUrl: "http://localhost:7005/"
  }
  console.log('hi', props.logout);
  console.log('data', userData);
  if (window.location.pathname === "/login") {
    setPrivKey(null);
    console.log(privKey);
    localStorage.removeItem("userData");
    localStorage.removeItem("utoken");
    localStorage.clear();
  }
  
  useEffect(() => {
    setFormIsValid(validator.isEmail(email))
  }, [email]);

  

  const onMount = async () => {

    
    setLoading(true);
    if (window.location.pathname === "/login") {
      return;
    }

      
    
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

  const onLoginBrand = async (event) => {


    
    VERIFIER.filter(login => login.id === event.target.id).map(filtered => (
      loginObject.loginProvider = filtered.loginProvider
    ));
    console.log(loginObject);
    if (isLoading || privKey || !openlogin) return;

    setLoading(true);
    try {
      await openlogin.login(loginObject);

      setPrivKey(openlogin.privKey);
      setwebAuth(true);
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
    // {
    //   loginProvider: VERIFIER.loginProvider,
    //   redirectUrl: "http://localhost:3000/redirect",
    // }
    const key = localStorage.getItem("privKey") || null;
    const fetchData = async() =>{
      if(!privKey || key){
        return;
      }
      try{
        
        // let formData = {
        //   email: getInfo.email,
        // };

        // const response = await fetch();
        // const userData = await response.json();
        
        
        
        console.log(userData);
        console.log('Web Auth response', userData);
        const getInfo = await openlogin.getUserInfo();
        setOpenloginUserInfo(getInfo);
        console.log("Hello", getInfo);

        if(privKey){
        localStorage.setItem('privKey', privKey);
        
        localStorage.setItem('userData', JSON.stringify(userData));
        props.setToken({
            user: userData.email,
            type: userData.userType,
      });
      
      }else{
        onLogout();
      }
    }catch (error) {
      console.log("error", error);
    }
    
  };
  useEffect(() => {
    
    onMount();
    
    
  }, []);
  if(props.logout==="true")
  {
    onLogout();
  }
  if(privKey && !key) {fetchData()}
  if(isLoading) return <div className="central">Loading...</div>;
  
  return(!privKey ? 
        <Container component="main" maxWidth="xs">
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
        <Button
            disabled={!formIsValid}
            variant="outline-dark"
            onClick={onLoginEmail}
        >
            Continue With Email
        </Button>
        <Button variant="outline-dark" id="0" onClick={onLoginBrand}>Google <FaGoogle /></Button>
        <Button variant="outline-dark" id="1" onClick={onLoginBrand}>Facebook <FaFacebook /></Button>
        </form>
        </div>
        <Box mt={8}>
        <Copyright />
      </Box>
    </Container> : <div><h1></h1></div>);
    
    
}




