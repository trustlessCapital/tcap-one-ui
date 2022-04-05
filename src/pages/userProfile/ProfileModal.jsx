import { React, useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { companyApiProvider } from "services/api/company/companyService";
import { useHistory } from "react-router-dom";
import "./profile.css";
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
  
  const userdata = props.userdata;
  console.log("UserData", userdata);
  const history = useHistory();
  const [formValue, setFormValue] = useState({
    fname: userdata.firstName,
    lname: userdata.lastName,
    email: userdata.user,
    phoneNumber: userdata.phone.slice(-10),
    walletAddress: userdata.walletAddress,
  });
  const handleChange = (e) => {
    const newData = { ...formValue };
    newData[e.target.id] = e.target.value;
    setFormValue(newData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = {
      firstName: formValue.fname,
      lastName: formValue.lname,
      email: formValue.email,
      phoneNumber: "+91" + formValue.phoneNumber,
      walletAddress: formValue.walletAddress
    };
    
    const response=await companyApiProvider.postUserProfile(form);
    props.setModalShow(false);
    
    console.log("FORM", form);
    console.log("POST", response);
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit Profile
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
                  value={formValue.phoneNumber}
                  name="phoneNumber"
                  type="number"
                  onChange={(e) => handleChange(e)}
                  id="phoneNumber"
                  required
                  label="Phone Number*"
                  validation="Please provide a Mobile Number"
                  invalid
                />
              </Col>
              <Col>
                <MDBInput
                  value={formValue.walletAddress}
                  name="walletAddress"
                  type="text"
                  onChange={(e) => handleChange(e)}
                  id="walletAddress"
                  label="walletAddress"
                />
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
