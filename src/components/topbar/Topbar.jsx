import React, { useState, useEffect } from "react";
import "./topbar.css";
import {
  Notifications,
  Build,
  Help,
  AccountCircle,
  Description,
} from "@material-ui/icons";
import { useHistory } from "react-router-dom";
export default function Topbar() {
  const history = useHistory();
  const [view, setView] = useState(history.location.pathname);
  console.log(history);
  useEffect(() => {
    return history.listen((location) => {
      setView(location.pathname);
    });
  }, [history]);
  return (
    <>
      {view !== "/auth" ? (
        <div className="topbar">
          <div className="topbarWrapper">
            <div className="topLeft">
              <span className="logo">
                <img
                  src="https://www.trustless.capital/assets/images/logo-red-small.png"
                  alt="Trustless Capital"
                  className=""
                />
              </span>
              <div className="tcapOneTitle">
                <h3>Welcome to TCAP One</h3>
              </div>
            </div>

            <div className="searchBox">
              <input type="text" className="searchInput" placeholder="Search" />
            </div>

            <div className="topRight">
              <div className="topbarIconContainer">
                <Notifications />
                <span className="topIconBadge">2</span>
              </div>
              <div className="topbarIconContainer">
                <Build />
              </div>
              <div className="topbarIconContainer">
                <Help />
              </div>
              {view === "/addInvoices" ||
                (view == "/" && (
                  <div className="loggedAs">Arranger: Arranger1</div>
                ))}
              {view == "/marketplace" && (
                <div className="loggedAs">
                  Investor: 3SB2iUCf9YPJJHAxBeVNn1rLwB4WnAasPmaQE31Grx7W
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
}
