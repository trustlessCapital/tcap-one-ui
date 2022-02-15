import "./admin.css";
import React, { useEffect, useState } from "react";
import { VisibilityOutlined } from "@material-ui/icons";
import { Link } from "react-router-dom";
import base58 from "bs58";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Button from "react-bootstrap/Button";
import { TextField } from "@material-ui/core";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DialogTitle from "@material-ui/core/DialogTitle";
import { companyApiProvider } from "services/api/company/companyService";
import { addToMarketplaceStub } from "stub/stub";
import { digest } from "multiformats";
import Marketplace from "pages/marketplace/Marketplace";
import Sidebar from "./Sidebar";
import AddNewUserModal from "./AddNewUserModal";
// import { checkTargetForNewValues } from "framer-motion";

export default function AdminManageUsers(props) {
  const [modalShow, setModalShow] = useState(false);
  const privKey = localStorage.getItem("privKey");
  const [allUsers, setAllUsers] = useState([]);

  console.log(props.userData);

  useEffect(() => {
    fetch(
      process.env.REACT_APP_BASE_URL + `/api/user/all/${props.userData.user}`
    )
      .then((res) => res.json())
      .then((data) => setAllUsers(data));
  }, [props.userData.user]);

  const handleClick = (e) => {
    console.log(e.target.value);
  };

  return (
    <div className="mp">
      {props.userData?.userType === "ADMIN" && privKey && (
        <div>
          <Button
            style={{
              backgroundColor: "#FFAFAF",
              color: "#FFFFFF",
              border: "none",
            }}
            variant="secondary"
            className="addnewuser"
            onClick={() => {
              setModalShow(true);
            }}
            allUsers>
            Add New User
          </Button>
          <AddNewUserModal
            show={modalShow}
            onHide={() => setModalShow(false)}
          />

          <Container fluid>
            <Row className="Deals">
              <Col sm={3}>
                <Sidebar />
              </Col>
              <Col sm={9}>
                <div class="container-fluid">
                  <div class="row justify-content-center">
                    <div class="col-12">
                      <div
                        class="table-responsive table-scroll bg-white table-hover"
                        data-mdb-perfect-scrollbar="true"
                        style={{ position: "relative", height: "700px" }}>
                        <table class="table">
                          <thead
                            class="table-dark"
                            style={{ position: "sticky", top: "0" }}>
                            <tr>
                              <th className="heads currencyRight" scope="col">
                                User Name
                              </th>
                              <th
                                className="heads currencyRight"
                                scope="col"
                                align="right">
                                User Type
                              </th>
                              <th
                                className="heads currencyRight"
                                scope="col"
                                align="right">
                                Company
                              </th>
                              <th
                                className="heads currencyRight"
                                scope="col"
                                align="right">
                                Email Address
                              </th>
                              <th
                                className="heads currencyRight"
                                scope="col"
                                align="right">
                                Mobile No.
                              </th>
                              <th
                                className="heads currencyRight"
                                scope="col"
                                align="right">
                                Active/Inactive
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {allUsers &&
                              allUsers.map((user) => (
                                <tr
                                  key={user.email}
                                  onClick={(e) => handleClick(e)}>
                                  <td className="mpTd currencyRight">
                                    {user.firstName}
                                  </td>
                                  <td className="mpTd currencyRight">
                                    {user.userType}
                                  </td>
                                  <td className="mpTd currencyRight">
                                    {user.companyName}
                                  </td>
                                  <td className="mpTd currencyRight">
                                    {user.email}
                                  </td>
                                  <td className="mpTd currencyRight">
                                    {user.phoneNumber}
                                  </td>
                                  <td className="mpTd currencyRight">
                                    {user.status}
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      )}
    </div>
  );
}
