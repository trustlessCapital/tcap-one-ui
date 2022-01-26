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

const App = () => {
  const [token, setToken] = useState(null);
  const [emailVerify,setEmailVerify] = useState(null);

  const history = useHistory();
  console.log("history", history);
  const [userDataDetails,setUserDetails] = useState([]);
  useEffect(async() => {
    let userData = localStorage.getItem("userData");

    if (userData && userData.trim().length) {
      userData = JSON.parse(userData);
      if(userData?.userType!='investor'){
        const userDataDetails= await companyApiProvider.verifyEmail(userData?.email);
      }
    await setUserDetails(userDataDetails);
      if (userData.hasOwnProperty("jwt_token")) {
        setToken({
          user: userData.email,
          type: userData?.userType=='investor' ? 'investor': userDataDetails.tcapRelation,
          utoken: userData.jwt_token,
          userId:userData.id,
          walletAddress:userData?.walletAddress || null
        });
      }
      if(userData.userType!='investor'){var verifiedEmail = await companyApiProvider.verifyEmail(userData.email)
       setEmailVerify(verifiedEmail);
       console.log(emailVerify)}
    }
  }, []);

  if (window.location.pathname !== "/signup" && !token) {
    return <Authentication setToken={setToken} />;
  }

  const logout = () => {
    setToken(null);
    // history.push('/signup');
  };

  return (
    <Router>
      <ThemeProvider theme={theme}>
        {token && <Topbar token={token} logout={logout} verified={emailVerify} userData={token}/>}
        <Container fluid>
          {/* <Sidebar token={token}/> */}
          <div className="pageContents">
            <div className="pagesWrapper">
              {/* <Quicklinks/> */}
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
                <Route path="/MyDraftInvoicesVendor">
                  <MyDraftInvoicesVendor verified={emailVerify} userData={token}/>
                </Route>
                <Route path="/CompletedDealsVendor">
                  <CompletedDealsVendor verified={emailVerify} userData={token}/>
                </Route>
                <Route path="/signup">
                  <Signup setToken={setToken} />
                </Route>
              </Switch>
            </div>
          </div>
        </Container>
      </ThemeProvider>
    </Router>
  );
};

export default App;
