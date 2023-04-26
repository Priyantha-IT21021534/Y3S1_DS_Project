import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert2";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

export default function UpdateProducts() {

  const { id } = useParams();
  const [products, setProducts] = useState({
        name: "", 
        date:"",
        brand: "",
        price: "",
        weight: "",
        upload_date: "",
        description: "",
        image: "",
  });
 
  useEffect(() => {
    const getProductById = () => {
      axios
      .get(`http://localhost:8070/products/getProduct/${id}`).then((res) => {
        setProducts(res.data.product);
        console.log(res.data);
      });
    };
    getProductById();
  }, [id]);

  const handleChangeText = (name, val) => {
    setProducts({ ...products, [name]: val.target.value });
    console.log(products);
  };

  function setDateFormat(){                      
    var theDate = new Date(products.date);
    var year = theDate.getFullYear();
    var month = theDate.getMonth() + 1;
    var day = theDate.getDate();
    if(month < 10)
        month = "0" + month;
    if(day < 10)
        day = "0" + day;
    theDate = year +"-"+ month +"-"+ day;
    return theDate;
}

  const UpdateProducts = (e) => {
    e.preventDefault();
    console.log("submit");
    axios
      .put(`http://localhost:8082/products/updateProduct/${id}`, products)
      .then(() => {
        swal.fire(` successfully updated `);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const navigate = useNavigate();
  return (
    
    <Container fluid>
      <Form onSubmit={UpdateProducts}>
      <Form.Group className="mb-3" controlId="formGroupId">
        <Form.Label>ID</Form.Label>
            <Form.Control 
               type="text" 
               value={id} disabled 
                />
      </Form.Group>
        <Row className="mb-3">
          <Form.Group as={Col}  controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control 
                name="name"
                type="text"   
                title="Name must be required"
                value={products.name}
                required
                onChange={(val) => handleChangeText("name", val)}/>
            
          </Form.Group>
          <Form.Group as={Col} controlId="formBasicBrand">
            <Form.Label>Brand</Form.Label>
            <Form.Control 
                name="brand"
                type="text" 
                title="Brand must be required"
                value={products.brand}
                required
                onChange={(val) => handleChangeText("brand", val)}/>
          </Form.Group>
        </Row> 
        <Row className="mb-3">
          <Form.Group as={Col}  controlId="formBasicPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control 
                name="price"
                type="text" 
                value={products.price}  
                title="Price must be required"
                required
                onChange={(val) => handleChangeText("price", val)}/>
            
          </Form.Group>
          <Form.Group as={Col} controlId="formBasicWeight">
            <Form.Label>Weight</Form.Label>
            <Form.Control 
                name="weight"
                type="text" 
                value={products.weight} 
                title="Weight must be required"
                required
                onChange={(val) => handleChangeText("weight", val)}/>
          </Form.Group>
        </Row> 
        <Row className="mb-3">
          <Form.Group as={Col}  controlId="formBasicUpload_date">
            <Form.Label>Upload Date</Form.Label>
            <Form.Control 
                name="upload_date"
                type="date" 
                value={setDateFormat()}  
                title="Upload Date must be required"
                required
                onChange={(val) => handleChangeText("upload_date", val)}/>
            
          </Form.Group>
          <Form.Group as={Col} controlId="formBasicaImage">
            <Form.Label>Image</Form.Label>
            <Form.Control 
                name="image"
                type="text" 
                value={products.image}  
                title="Image must be required"
                required
                onChange={(val) => handleChangeText("image", val)}/>
          </Form.Group>
        </Row> 
        <Form.Group className="mb-3" controlId="formGroupEmail">
        <Form.Label>Description</Form.Label>
            <Form.Control 
                name="description"
                type="text" 
                value={products.description}   
                title="Description must be required"
                required
                onChange={(val) => handleChangeText("description", val)}/>
      </Form.Group>  

          <Button variant="primary" type="submit">
            Submit
          </Button>
         
        </Form>
        </Container>
  );
}