import React, { useState } from "react";
import { useNavigate} from "react-router-dom";
import swal from "sweetalert2";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
//import '../../assets/images/AddProducts.css';

export default function AddPayment() {

  const [payments, setPayemtns] = useState({
        email: "", 
        mobile: "",
        number: "",
        expiration: "",
        cvv: "",
        name: "",
        amount: "",
  });

  const handleChangeText = (name, value) => {
    setPayemtns({ ...payments, [name]: value.target.value });
    console.log(payments);
  };

  const AddPayment = (e) => {
    e.preventDefault();
    console.log("submit");
    axios
      .post("http://localhost:8500/payment/card",payments)
      .then(() => {
        swal.fire(` Payment Scussesful `);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const navigate = useNavigate();
  return (
    
    <Container fluid>
       <h1 className="mb-4">Payment</h1>
      <Form onSubmit={AddPayment}>
        
        <Row className="mb-3">
          <Form.Group as={Col}  controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control 
                name="email"
                type="email" 
                placeholder="Email"   
                title="Email must be required"
                required
                onChange={(val) => handleChangeText("email", val)}/>
            
          </Form.Group>
          <Form.Group as={Col} controlId="formBasicMobile">
            <Form.Label>Mobile</Form.Label>
            <Form.Control 
                name="mobile"
                type="number" 
                placeholder="Mobile"   
                title="Mobile must be required"
                required
                onChange={(val) => handleChangeText("mobile", val)}/>
          </Form.Group>
        </Row> 
        <Row className="mb-3">
          <Form.Group as={Col}  controlId="formBasicNumber">
            <Form.Label>Number</Form.Label>
            <Form.Control 
                name="number"
                type="number" 
                placeholder="Number"   
                title="Number must be required"
                required
                onChange={(val) => handleChangeText("number", val)}/>
            
          </Form.Group>
          <Form.Group as={Col} controlId="formBasicExpiration">
            <Form.Label>Expiration</Form.Label>
            <Form.Control 
                name="expiration"
                type="text" 
                placeholder="Expiration"   
                title="expiration must be required"
                required
                onChange={(val) => handleChangeText("expirationt", val)}/>
          </Form.Group>
        </Row> 
        <Row className="mb-3">
          <Form.Group as={Col}  controlId="formBasicCCV">
            <Form.Label>CCV</Form.Label>
            <Form.Control 
                name="ccv"
                type="number" 
                placeholder="Upload Date"   
                title="Upload Date must be required"
                required
                onChange={(val) => handleChangeText("ccv", val)}/>
            
          </Form.Group>
          <Form.Group as={Col} controlId="formBasicaName">
            <Form.Label>Name</Form.Label>
            <Form.Control 
                name="name"
                type="text" 
                placeholder="Name"   
                title="Name must be required"
                required
                onChange={(val) => handleChangeText("name", val)}/>
          </Form.Group>
        </Row> 
        <Form.Group className="mb-3" controlId="formGroupAmount">
        <Form.Label>Amount</Form.Label>
            <Form.Control 
                name="amount"
                type="number" 
                placeholder="Amount"   
                title="Amount must be required"
                required
                onChange={(val) => handleChangeText("amount", val)}/>
      </Form.Group>  

          <Button variant="primary" type="submit">
            Submit
          </Button>
         
        </Form>
        </Container>
  );
}