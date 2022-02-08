import {React, useState, useEffect} from "react";
import Modal from "react-bootstrap/Modal";
import "./admin.css";
import Button from "react-bootstrap/Button";
import {
    MDBValidation,
    MDBInput,
    MDBBtn,
    MDBCheckbox,
    MDBRadio
  } from 'mdb-react-ui-kit';
  import Row from "react-bootstrap/Row";
  import Container from "react-bootstrap/Container";
  import Col from "react-bootstrap/Col";



export default function AddNewUserModal(props) {

    const [formValue, setFormValue] = useState({
        fname: 'Mark',
        lname: 'Otto',
        email: '',
        mob: '',
        company: '',
        inlineRadio: '',
        UserType: '',
      });
   

    

    const onChange = (e: any) => {
      setFormValue({ ...formValue, [e.target.name]: e.target.value });
    }
    
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add New User
          </Modal.Title>
        </Modal.Header>
        <MDBValidation className='row g-3' noValidate>
        <Modal.Body>
            
            <Container fluid>
            <Row className="mt-4">
              <Col md={6}>
                <MDBInput
                  value={formValue.fname}
                  name='fname'
                  onChange={onChange}
                  id='validationCustom01'
                  label='First Name'
                />
              </Col>
              <Col md={6}>
                <MDBInput
                  value={formValue.lname}
                  name='lname'
                  onChange={onChange}
                  id='validationCustom02'
                  label='Last name'
                />
              </Col>
            </Row>
            <Row className="mt-4">
                <Col md={1}>
                  <span className='input-group-text' id='inputGroupPrepend'>
                    @
                  </span>
                </Col>
                <Col md={10}>
                  <MDBInput
                  value={formValue.email}
                  name='email'
                  onChange={onChange}
                  id='validationCustom04'
                  required
                  validation='Please provide an Email'
                  invalid
                  label='Email*' 
                />
                </Col>
            </Row>
            <Row className="mt-4">
              <Col md={6}>
                <MDBInput
                  value={formValue.mob}
                  name='mob'
                  onChange={onChange}
                  id='validationCustom03'
                  required
                  label='Mobile Number*'
                  validation='Please provide a Mobile Number'
                  invalid
                />
              </Col>
              <Col>
                <MDBInput
                  value={formValue.company}
                  name='company'
                  onChange={onChange}
                  id='validationCustom05'
                  label='Company'
                />
              </Col>
            </Row>
            <Row className="mt-4">
              <Col md={1}>
                <MDBRadio name='inlineRadio' id='inlineRadio1' value='option1' label='Active' inline required invalid/>
              </Col>
              <Col>
                <MDBRadio name='inlineRadio' id='inlineRadio2' value='option2' label='Inactive' inline />
              </Col>
              <Col md = {1}></Col>
              <Col md={7}>
                
                <div className="addInvItem">
                  <label>User Type <sup className="required">*</sup></label>
                    <select
                      className="addInvInput"
                      name="UserType"
                      onChange={onChange}
                      value={formValue.type}
                    >
                    <option value="">--Select--</option>
                    <option value="Arranger">Arranger</option>
                    <option value="Vendor">Vendor</option>
                    <option value="Anchor">Anchor</option>
                    </select>
                </div>
              </Col>
            </Row>
            
            </Container>
      
        </Modal.Body>
        <Modal.Footer>
          <Button className="Add" type='submit'>Add</Button>
        </Modal.Footer>
        </MDBValidation>
      </Modal>
    );
  }