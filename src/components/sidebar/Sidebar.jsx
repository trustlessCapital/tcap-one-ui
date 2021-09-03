import "./sidebar.css"

import{ Home, FileCopyOutlined, CloudUploadOutlined, VerifiedUserOutlined, HourglassEmptyOutlined, MonetizationOnOutlined, AttachMoneyOutlined, AssignmentTurnedInOutlined, NotInterestedOutlined
} from "@material-ui/icons"
import { Link, useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
export default function Sidebar(props) {
  const history = useHistory();
  const [view, setView] = useState(history.location.pathname);
  console.log(history);
  useEffect(() => {
    return history.listen((location) => {
      setView(location.pathname);
    });
  }, [history]);
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu active">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <li className="sidebarListItems active">
              <Home className="sidebarIcon" />
              Home
            </li>
          </ul>
        </div>
        {view === "/addInvoices" ||
          (view == "/" && (
            <div className="sidebarMenu">
              <h3 className="sidebarTitle">Invoices</h3>
              <ul className="sidebarList">
                <li className="sidebarListItems">
                  <CloudUploadOutlined className="sidebarIcon" />
                  <Link to="/addInvoices">Upload New Invoice</Link>
                </li>
                <li className="sidebarListItems">
                  <FileCopyOutlined className="sidebarIcon" />
                  <Link to="/">My Invoices</Link>
                </li>
              </ul>
            </div>
          ))}
        {view === "/marketplace" && (
          <div className="sidebarMenu">
            <h3 className="sidebarTitle">Investor</h3>
            <ul className="sidebarList">
              <li className="sidebarListItems">
                <CloudUploadOutlined className="sidebarIcon" />
                <Link to="/myinvestments">My Investments</Link>
              </li>
              <li className="sidebarListItems">
                <FileCopyOutlined className="sidebarIcon" />
                <Link to="/marketplace">My Transactions</Link>
              </li>
            </ul>
          </div>
        )}

        {view == "/addInvoices" ||
          (view == "/" && (
            <div className="sidebarMenu">
              <h3 className="sidebarTitle">Transactions</h3>
              <ul className="sidebarList">
                <li className="sidebarListItems">
                  <HourglassEmptyOutlined className="sidebarIcon" />
                  <Link to="/pendingAppr">Pending Approval</Link>
                </li>
                <li className="sidebarListItems">
                  <VerifiedUserOutlined className="sidebarIcon" />
                  <Link to="/approvedInvoices">Approved</Link>
                </li>
                <li className="sidebarListItems">
                  <MonetizationOnOutlined className="sidebarIcon" />
                  Fund Recieved
                </li>
                <li className="sidebarListItems">
                  <AttachMoneyOutlined className="sidebarIcon" />
                  Anchor Payments
                </li>
                <li className="sidebarListItems">
                  <AssignmentTurnedInOutlined className="sidebarIcon" />
                  Transaction Settled
                </li>
                <li className="sidebarListItems">
                  <NotInterestedOutlined className="sidebarIcon" />
                  Disputed Transactions
                </li>
              </ul>
            </div>
          ))}
      </div>

      <div className="pagesWrapper"></div>
    </div>
  );
}


