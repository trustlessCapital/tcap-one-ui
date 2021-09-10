import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import Quicklinks from "./components/quicklinks/Quicklinks";

import "./app.css"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AddInvoice from "./pages/addInvoice/AddInvoice";
import Marketplace from "./pages/marketplace/Marketplace";
import MsmeApprove from "./pages/msmeApprove/MsmeApprove";
import AnchorApprove from "./pages/anchorAprrove/AnchorApprove";
import MyInvestments from "./pages/myInvestments/MyInvestments";
import Authentication from "./pages/Authentication/Authentication";
import Dashboard from "./pages/dashboard/Dashboard";
import { useState } from "react";
//import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
//import { Home } from "@material-ui/icons";

const App = () => {
  const [token, setToken] = useState();
  if(!token) {
    return <Authentication setToken={setToken} />
  }
  return (
    <Router>
      <Topbar token={token}/>
      <div className="container">
        <Sidebar token={token}/>
        <div className="pageContents">
          <div className="pagesWrapper">
            {/* <Quicklinks/> */}
            <Switch>
              <Route exact path="/">
                <Dashboard />
              </Route>
              <Route path="/addinvoices">
                <AddInvoice />
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
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
