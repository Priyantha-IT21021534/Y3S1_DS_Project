import React,{useState} from 'react'
import {useNavigate} from "react-router-dom"
import axios from 'axios'
const SignUp = () => {

    const history = useNavigate();
     
//initial states of the input feilds
const [inputs, setInputs] = useState({
    name:"",
    mobile:0,  
    email:"",
    address:"",
    password:""
  })

  const handleChange = (e) =>{

    setInputs((prev) =>({
      ...prev,
      [e.target.name]:e.target.value,
    }));


  };

  const sendRequest = async() =>{
  
    const res = await axios.post('http://localhost:8070/User/signUp', {
        name:inputs.name,
        mobile:inputs.mobile, 
        email:inputs.email,
        address:inputs.address, 
        password:inputs.password
    }).catch((err)=>console.log(err));
        const data = await res.data;
        return data;   
     }

   //send form data and refreshing the page
   const handleSubmit =(e) =>{
    e.preventDefault();
//sendRequest();
    sendRequest().then(()=>history('/Login'));
    //console.log(inputs)
  };

  return (
    <div>
        <form onSubmit={handleSubmit}>
  <div className="form-group">
    <label>Name</label>
    <input type="text" name="name" onChange={handleChange} value={inputs.name} className="form-control" id="exampleInputName"  placeholder="Enter your Name"/>
  </div>
  <div className="form-group">
    <label>Mobile No</label>
    <input type="tel" name="mobile" onChange={handleChange} value={inputs.mobile} className="form-control" id="exampleInputmobile" placeholder="07xxxxxxxx"/>
  </div>

  <div className="form-group">
    <label>E-mail</label>
    <input type="email" name="email" onChange={handleChange} value={inputs.email} className="form-control" id="exampleInputEmail" placeholder="abc@gmail.com"/>
  </div>

  <div className="form-group">
    <label>Address</label>
    <input type="text" name="address" onChange={handleChange} value={inputs.address} className="form-control" id="exampleInputAddress" placeholder="Address"/>
  </div>

  <div className="form-group">
    <label>Password</label>
    <input type="password" name="password" onChange={handleChange} value={inputs.password} className="form-control" id="exampleInputPassword" placeholder="Password"/>
    <small id ="smallName"  className = "smallName">We never share your password with anyone</small>
  </div>


  <br/>
  
  <button type="submit" className="btn btn-primary">SIGN UP</button>
</form>
    </div>

  )
}

export default SignUp