import React from "react";
import { useState, useEffect } from "react";
import OpenLogin from "@toruslabs/openlogin";
import Button from 'react-bootstrap/Button';
import "./app.css";
import { getValue } from "@testing-library/user-event/dist/utils";
import { FaGoogle, FaFacebook } from "react-icons/fa";

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

function Web3signin() {
  const [isLoading, setLoading] = useState(true);
  
  const [openlogin, setOpenLogin] = useState();
  const [privKey, setPrivKey] = useState();

  var loginObject ={
    loginProvider: "google",
    clientId: "BDEZMlXEtCPU0_sfOO22To8ZnFS8ppSJs_yBNBxiMWhdAmPJSUk4jlCI3ykKBHO2cl1iDEu_M6UDVFAqALmZPto",
    redirectUrl: "http://localhost:3000/redirect"
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

  const onLogin = async (event) => {
    
    VERIFIER.filter(login => login.id === event.target.id).map(filtered => (
      loginObject.loginProvider = filtered.loginProvider
    ));
    console.log(loginObject);
    if (isLoading || privKey || !openlogin) return;

    setLoading(true);
    try {
      await openlogin.login(loginObject);
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
        setPrivKey(openlogin.privKey);
      } finally {
        setLoading(false);
      }
    };
    // {
    //   loginProvider: VERIFIER.loginProvider,
    //   redirectUrl: "http://localhost:3000/redirect",
    // }
  

  useEffect(() => {
    onMount();
    
  }, []);

  if(isLoading) return <div className="central">Loading...</div>;
  return privKey ? 
  (
    <div className="central">
      <p>Logged in: {privKey}</p>
      <Button  variant="outline-dark" onClick={onLogout}>Logout</Button>
    </div>
  ) : (<div  className = "central">
        <Button variant="outline-dark" id="0" onClick={onLogin}>Google <FaGoogle /></Button>
        <Button variant="outline-dark" id="1" onClick={onLogin}>Facebook <FaFacebook /></Button>
      </div>);
}

export default Web3signin;