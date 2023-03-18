import axios from "axios"
import React,{useState} from 'react'

import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { authActions } from "../store";

const Login = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //initial states of the input feilds
  const [inputs, setInputs] = useState({
    email:"", 
    password:""
  })



  const handleChange = (e) =>{

    setInputs((prev) =>({
      ...prev,
      [e.target.name]:e.target.value,
    }));


  };


  const sendRequest = async() =>{
  
    const res = await axios.post('http://localhost:8070/User/login', {
        email:String(inputs.email),
        password:String(inputs.password)
    }).catch((err)=>console.log(err));
        const data = await res.data;
        return data;   
     }

  //send form data and refreshing the page
  const handleSubmit =(e) =>{
    e.preventDefault();

    sendRequest().then(() => dispatch(authActions.login())).then(() => navigate("/welcome"));
  };


  return (
    <div>

      <form onSubmit={handleSubmit}>

    <div className="form-group">
    <label>E-mail</label>
    <input type="email" name="email" onChange={handleChange} value={inputs.email} className="form-control" id="exampleInputEmail" placeholder="abc@gmail.com"/>
    </div>
        
    <div className="form-group">
    <label>Password</label>
    <input type="password" name="password" onChange={handleChange} value={inputs.password} className="form-control" id="exampleInputPassword" placeholder="Password"/>
    <small id ="smallName"  className = "smallName">We never share your password with anyone</small>
  </div>

        <button  type = "submit" className="btn btn-primary">Login</button>
      </form>


    </div>
  )
}

export default Login;