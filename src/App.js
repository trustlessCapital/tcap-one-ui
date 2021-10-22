import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import Quicklinks from "./components/quicklinks/Quicklinks";
import { createTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import "./app.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";
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
import { useState } from "react";
import VARelationship from "pages/VendorAnchorRelationship/VARelationship";
import Buyer from "pages/buyer/buyer";
import Seller from "pages/seller/seller";
import Arranger from "pages/arranger/arranger";
import Investor from "pages/investor/investor";
import Signup from "pages/signup/Signup";

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
  const uToken = window.localStorage.utoken;
  const [token, setToken] = useState(uToken || null);
  if (!token) {
    return <Authentication setToken={setToken} />;
  }

  const logout = () => {
    setToken(null);
  };

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Topbar token={token} logout={logout} />
        <div className="container">
          {/* <Sidebar token={token}/> */}
          <div className="pageContents">
            <div className="pagesWrapper">
              {/* <Quicklinks/> */}
              <Switch>
                <Route exact path="/">
                  <Dashboard />
                </Route>
                <Route exact path="/admin">
                  <Admin />
                </Route>
                <Route path="/addinvoices">
                  <AddInvoice />
                </Route>
                <Route path="/onboardentity">
                  <OnboardNewEntity />
                </Route>
                <Route path="/varelationship">
                  <VARelationship />
                </Route>
                <Route path="/entitylist">
                  <EntityList />
                </Route>
                <Route path="/myinvestments">
                  <MyInvestments />
                </Route>
                <Route path="/marketplace">
                  <Marketplace />
                </Route>
                <Route path="/msmeapprove">
                  <MsmeApprove />
                </Route>
                <Route path="/anchorapprove">
                  <AnchorApprove />
                </Route>
                <Route path="/buyer">
                  <Buyer />
                </Route>
                <Route path="/seller">
                  <Seller />
                </Route>
                <Route path="/arranger">
                  <Arranger />
                </Route>
                <Route path="/investor">
                  <Investor />
                </Route>
                <Route path="/signup">
                  <Signup />
                </Route>
              </Switch>
            </div>
          </div>
        </div>
      </ThemeProvider>
    </Router>
  );
};

export default App;
