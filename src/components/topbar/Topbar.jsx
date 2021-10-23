import React, { useState, useEffect } from "react";
import "./topbar.css";
import {
  Notifications,
  Build,
  Help,
  AccountCircle,
  Description,
} from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

import { Link, useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Topbar(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const classes = useStyles();
  const { type, userName } = props.token;
  const history = useHistory();
  const [view, setView] = useState(history.location.pathname);
  console.log(history);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = (event) => {
    localStorage.removeItem("userData");
    localStorage.removeItem("utoken");

    props.logout();
  };

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
            {/* <div className="topLeft">
              <span className="logo">
                <img
                  src="https://www.trustless.capital/assets/images/logo-red-small.png"
                  alt="Trustless Capital"
                  className=""
                />
              </span>
              <div className="tcapOneTitle">
                <h3>TCAP One</h3>
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
                  {`${type}: ${userName}`}
                </div>
              )}
            </div> */}
            <AppBar position="static" color="secondary">
              <Toolbar>
                <IconButton
                  edge="start"
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="menu"
                >
                  <img
                    src="https://www.trustless.capital/assets/images/logo-red-small.png"
                    alt="Trustless Capital"
                    className=""
                    height=" 40px"
                    width="40px"
                  />
                </IconButton>

                <Typography variant="h6" className={classes.title}>
                  TCAP One
                </Typography>
                {/* <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
  Trade Finance
</Button> */}
                <Button
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={handleClick}
                >
                  <Link to="/onboardentity" style={{ textDecoration: "none" }}>
                    Onboard new Entity
                  </Link>
                </Button>
                <Button
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={handleClick}
                >
                  <Link to="/varelationship" style={{ textDecoration: "none" }}>
                    Vendor Anchor Relationship
                  </Link>
                </Button>
                <Button
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={handleClick}
                >
                  <Link to="/addInvoices" style={{ textDecoration: "none" }}>
                    Upload New Invoice
                  </Link>
                </Button>
                <Button
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={handleClick}
                >
                  <Link to="/entitylist" style={{ textDecoration: "none" }}>
                    Entity List
                  </Link>
                </Button>
                {/* <Menu
  id="simple-menu"
  anchorEl={anchorEl}
  keepMounted
  open={Boolean(anchorEl)}
  onClose={handleClose}
>
  <MenuItem onClick={handleClose}><Link to='/onboardentity'>Onboard new Entity</Link></MenuItem>
  <MenuItem onClick={handleClose}><Link to='/varelationship'>Vendor Anchor Relationship</Link></MenuItem>
  <MenuItem onClick={handleClose}> <Link to="/addInvoices">Upload New Invoice</Link></MenuItem>
  <MenuItem onClick={handleClose}> <Link to="/entitylist">Entity List</Link></MenuItem>
</Menu> */}
                <Button color="inherit">
                  <Link to="/" onClick={logout}>
                    Logout
                  </Link>
                </Button>
              </Toolbar>
            </AppBar>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
}
