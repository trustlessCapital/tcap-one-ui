import React, { useState, useEffect } from "react";
import "./topbar.css";
import {
  Notifications,
  Build,
  Help,
  AccountCircle,
  Description,
} from "@material-ui/icons";
import { MDBBtn } from 'mdb-react-ui-kit';
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from "react-bootstrap/Dropdown"
import Navbar from "react-bootstrap/Navbar"
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { Link, useHistory } from "react-router-dom";
import Web3signin from "pages/web3signin/Web3signin";

//services
import { companyApiProvider } from "services/api/company/companyService";
import { localStorageAvailable } from "@toruslabs/openlogin";

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
  // console.log(props.verified);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const classes = useStyles();
  const { type, userName } = props.token;
  const history = useHistory();
  const [emailVerify,setEmailVerify] = useState(props.verified);
  const [token, setToken] = useState(null); 
  const [view, setView] = useState(history.location.pathname);
  const [hover, setHover] = useState();

  const userData = localStorage.getItem("userData");
  const handleMouseIn = () => {
    setHover(true);
  };

  
  const handleMouseOut = () => {
    setHover(false);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = (event) => {
    window.localStorage.removeItem("userData");
    window.localStorage.removeItem("privKey");
    window.localStorage.removeItem("email");
    props.logout();
  };
  // console.log(props.userData);

  useEffect(() => {
    return history.listen((location) => {
      setView(location.pathname);
    });
  }, [history]);

  return (
    <>
      {view !== "/auth" ? (
        <div>
          <div className="bar">
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

            <>  
              <Navbar bg="dark" variant="dark" className="TopBar" fixed="top">
                <Container fluid>
                  <Navbar.Brand href="#home" className="brandname">
                    <img
                      alt="Trustless Capital"
                      src="https://www.trustless.capital/assets/images/logo-red-small.png"
                      width="40"
                      height="40"
                      className="d-inline-block align-top"
                      onClick={()=>{history.push('/')}}
                    />{' '}
                    TCAP One
                  </Navbar.Brand>

                  <Navbar.Toggle aria-controls="basic-navbar-nav" />
                  <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                      <Nav.Link 
                        href="/marketplace"
                        className="MarketLink"
                        >MARKETPLACE
                      </Nav.Link>
                  </Nav>
                  <Nav>
                      {
                        !props.userData?.userType=="ADMIN" && props.userData?.type!='arranger' &&
                        <Nav.Link href="/onboardentity" className="rightlinks">
                          Onboard new Entity
                        </Nav.Link>
                      }
                      <Nav.Link 
                        href="/varelationship"
                      >
                        Vendor Anchor Relationship
                      </Nav.Link>
                      
                      {
                        (props.verified?.tcapRelation=='arranger' || props.verified?.tcapRelation=='vendor') &&
                        <Nav.Link href="/addInvoices" className="rightlinks">
                          Upload New Invoice
                        </Nav.Link>
                      }

                      {(props.userData?.user=='lingraj@trustless.capital' || props.userData?.user=='kapil@trustless.capital' || props.userData?.user=='nagarjun@trustless.capital' || props.userData?.userType==='ADMIN') &&
                        <Nav.Link href="/entitylist" className="rightlinks">
                          Companies
                        </Nav.Link>
                      }
                      <NavDropdown title={props?.userData?.user} id="Menu" className="rightlinks">
                        <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                        
                        <NavDropdown.Divider />
                        <NavDropdown.Item 
                          href="/"
                          onClick={logout}
                          >Logout
                        </NavDropdown.Item>
                      </NavDropdown>
                    </Nav>
                  </Navbar.Collapse>
                </Container>
              </Navbar>
            </>


            {/* <AppBar position="static" color="secondary">
              <Toolbar>
                <IconButton
                  edge="start"
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="menu"
                  onClick={()=>{history.push('/')}}
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
                </Typography> */}




                {/* <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
  Trade Finance
</Button> */}


                {/* <MDBBtn
                  className='bg-transparent text-dark shadow-none'
                  size="lg"
                >
                  <Link className="MarketLink bg-transparent text-dark shadow-none" to="/marketplace" style={{ textDecoration: "none" }}>
                    MARKETPLACE
                  </Link>

                </MDBBtn>

                {!props.verified?.companyId && props.userData?.type!='arranger' && <Button
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={handleClick}
                >
                  <Link to="/onboardentity" style={{ textDecoration: "none" }}>
                    Onboard new Entity
                  </Link>
                </Button>}
                <Button
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={handleClick}
                >
                  <Link to="/varelationship" style={{ textDecoration: "none" }}>
                    Vendor Anchor Relationship
                  </Link>
                </Button>
                {(props.verified?.tcapRelation=='arranger' || props.verified?.tcapRelation=='vendor') &&<Button
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={handleClick}
                >
                  <Link to="/addInvoices" style={{ textDecoration: "none" }}>
                    Upload New Invoice
                  </Link>
                </Button>}
                {(props.userData?.user=='lingraj@trustless.capital' || props.userData?.user=='kapil@trustless.capital' || props.userData?.user=='nagarjun@trustless.capital' || props.userData?.user=='hello@trustless.capital') &&<Button
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={handleClick}
                >
                   <Link to="/entitylist" style={{ textDecoration: "none" }}>
                    Companies
                  </Link>
                </Button>} */}
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
                {/* <Button color="inherit">
                  <Link to="/" onClick={logout}>
                    Logout
                  </Link>
                </Button> */}
                
                
                
                {/* <DropdownButton id="Menu" title={props?.userData?.user}>
                  <Dropdown.Item href="#/action-1">Profile</Dropdown.Item>
                  <Dropdown.Item href="#/action-3">
                      <Link to="/" onClick={logout}>
                        Logout
                      </Link>
                  </Dropdown.Item>
                </DropdownButton>
                
                
                
              </Toolbar>
            </AppBar> */}
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
}
