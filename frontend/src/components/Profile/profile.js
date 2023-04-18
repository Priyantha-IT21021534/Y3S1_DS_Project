import React, { useState, useEffect } from 'react'
import axios from 'axios';
axios.defaults.withCredentials = true;

const Profile = () =>{

  const [user, setUser] = useState();

  const sendRequest = async() =>{
    const res = await axios.get("http://localhost:8090/User/profile", {
      withCredentials:true
    }).catch(err=>console.log(err));

    const data = await res.data;
    return data;
  }

  useEffect(()=>{
    sendRequest().then((data)=>setUser(data.user))
  }, [])

  return (
    <div>{user &&(<div>
      <h1>{user.name}</h1>
      <h1>{user.mobile}</h1>
      <h1>{user.email}</h1>
      <h1>{user.address}</h1>
      </div>)}
    </div>

  )
}

export default Profile