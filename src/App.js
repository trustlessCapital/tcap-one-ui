import Sidebar from './components/sidebar/Sidebar';
import Topbar from './components/topbar/Topbar';
import Quicklinks from './components/quicklinks/Quicklinks';
import { createTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import './app.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AddInvoice from './pages/addInvoice/AddInvoice';
import OnboardNewEntity from './pages/OnboardNewEntity/OnboardNewEntity';
import EntityList from './pages/EntityList/EntityList';
import Marketplace from './pages/marketplace/Marketplace';
import MsmeApprove from './pages/msmeApprove/MsmeApprove';
import AnchorApprove from './pages/anchorAprrove/AnchorApprove';
import MyInvestments from './pages/myInvestments/MyInvestments';
import Authentication from './pages/Authentication/Authentication';
import Dashboard from './pages/dashboard/Dashboard';
import { useState } from 'react';
import VARelationship from 'pages/VendorAnchorRelationship/VARelationship';
//import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
//import { Home } from "@material-ui/icons";
const theme = createTheme({
  palette: {
    primary: {
      main: '#e50914',
    },
    secondary: {
      main: '#cfcfcf',
    },
  },
});
const App = () => {
  const [token, setToken] = useState();
  if (!token) {
    return <Authentication setToken={setToken} />;
  }
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Topbar token={token} />
        <div className="container">
          {/* <Sidebar token={token}/> */}
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
              </Switch>
            </div>
          </div>
        </div>
      </ThemeProvider>
    </Router>
  );
};

export default App;
