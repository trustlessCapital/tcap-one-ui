import { React, useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { companyApiProvider } from "services/api/company/companyService";

import "./admin.css";
import Button from "react-bootstrap/Button";
import {
  MDBValidation,
  MDBInput,
  MDBBtn,
  MDBCheckbox,
  MDBRadio,
} from "mdb-react-ui-kit";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";

export default function AddNewUserModal(props) {
  const [formValue, setFormValue] = useState({
    fname: "",
    lname: "",
    email: "",
    mob: "",
    company: "",
    inlineRadio: "",
    UserType: "",
  });

  const handleChange = (e) => {
    const newData = { ...formValue };
    newData[e.target.id] = e.target.value;
    setFormValue(newData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    companyApiProvider.addNewUser({
      firstName: formValue.fname,
      lastName: formValue.lname,
      email: formValue.email,
      phoneNumber: "+91" + formValue.mob,
      walletAddress: "NA",
      userType: formValue.UserType,
    });
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add New User
        </Modal.Title>
      </Modal.Header>
      {/* <MDBValidation className="row g-3"> */}
      <form onSubmit={(e) => handleSubmit(e)}>
        <Modal.Body>
          <Container fluid>
            <Row className="mt-4">
              <Col md={6}>
                <MDBInput
                  value={formValue.fname}
                  name="fname"
                  onChange={(e) => handleChange(e)}
                  id="fname"
                  label="First Name"
                />
              </Col>
              <Col md={6}>
                <MDBInput
                  value={formValue.lname}
                  name="lname"
                  onChange={(e) => handleChange(e)}
                  id="lname"
                  type="text"
                  label="Last name"
                />
              </Col>
            </Row>
            <Row className="mt-4">
              <Col md={1}>
                <span className="input-group-text" id="inputGroupPrepend">
                  @
                </span>
              </Col>
              <Col md={10}>
                <MDBInput
                  value={formValue.email}
                  name="email"
                  onChange={(e) => handleChange(e)}
                  id="email"
                  required
                  type="email"
                  validation="Please provide an Email"
                  invalid
                  label="Email*"
                />
              </Col>
            </Row>
            <Row className="mt-4">
              <Col md={6}>
                <MDBInput
                  value={formValue.mob}
                  name="mob"
                  type="number"
                  onChange={(e) => handleChange(e)}
                  id="mob"
                  required
                  label="Mobile Number*"
                  validation="Please provide a Mobile Number"
                  invalid
                />
              </Col>
              <Col>
                <MDBInput
                  value={formValue.company}
                  name="company"
                  type="text"
                  onChange={(e) => handleChange(e)}
                  id="company"
                  label="Company"
                />
              </Col>
            </Row>
            <Row className="mt-4">
              <Col md={1}>
                <MDBRadio
                  name="inlineRadio"
                  id="inlineRadio"
                  value="active"
                  onChange={(e) => handleChange(e)}
                  label="Active"
                  inline
                  required
                  invalid
                />
              </Col>
              <Col>
                <MDBRadio
                  name="inlineRadio"
                  id="inlineRadio"
                  value="inactive"
                  onChange={(e) => handleChange(e)}
                  label="Inactive"
                  inline
                />
              </Col>
              <Col md={1}></Col>
              <Col md={7}>
                <div className="addInvItem">
                  <label>
                    User Type <sup className="required">*</sup>
                  </label>
                  <select
                    className="addInvInput"
                    name="UserType"
                    id="UserType"
                    onChange={(e) => handleChange(e)}
                    value={formValue.UserType}>
                    <option value="">--Select--</option>
                    <option value="Arranger">Arranger</option>
                    <option value="Vendor">Vendor</option>
                    <option value="Anchor">Anchor</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button className="Add" type="submit">
            Add
          </Button>
        </Modal.Footer>
      </form>
      {/* </MDBValidation> */}
    </Modal>
  );
}
