import React, { useState, useEffect } from 'react'
import axios from "axios"
import '../../assets/styles/Forms.css'
import swal from 'sweetalert'
import { useNavigate, useParams } from 'react-router-dom'


const UpdatePWD = () => {
    const id = useParams()
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
    name:"",
    mobile:"",
    email:"",
    address:"",
    pwd:""
    })
  
   
  
    const handleChange = (e) => {
      setInputs((prevState)=> ({
        ...prevState, 
        [e.target.name] : e.target.value
      }))
  
    }
  
  
    useEffect(()=>{
        const getUser = async() => {
            try {
               await axios.get("http://localhost:8090/User/profile").then((res)=>{
                  setInputs(res.data.user)
                  console.log(res.data.user)
              })} catch (err) {
                console.log(err)
              }
            }
        getUser()
    }, [id])
  
    const sendData = async() =>{
  
      const res = await axios.patch("http://localhost:8090/User/update/pwd", {
        pwd:inputs.pwd
      }).then((err)=>{swal({
          title: "Password updated!",
      
          icon: "success",
          button: "OK" ,
          timer : 3000
         
        });
      
        navigate("/profile")
  
      }).catch((err)=>console.log(err));
  
      const data = await res.data;
      return data;
  
    }
  
    const handleSubmit = (e) =>{
      e.preventDefault();
      console.log(inputs.pwd)
      sendData()
    }
  
    return (

        <div>

      
      <div className='forms' onSubmit={handleSubmit}>
      <h1>UPDATE YOUR PASSWORD</h1>
<div className='inputs'>
<h1></h1>
        <label>ENTER YOUR NEW PASSWORD:</label>
        <input type="text" name='password' value = {inputs.pwd} onChange={handleChange}/>
        </div>
          
          <div className='inputs'>
          <button type="submit" className="btn btn-primary">Update</button>
          </div>
          
          {inputs &&(<div>
      <h1>Name:{inputs.name}</h1>
      <h1>Mobile:{inputs.mobile}</h1>
      <h1>Email:{inputs.email}</h1>
      <h1>Address:{inputs.address}</h1>
      <h1>I am a {inputs.role}</h1>
      </div>)}
      
      </div>

      </div>
    )
}

export default UpdatePWD