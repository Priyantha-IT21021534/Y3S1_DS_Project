import React from 'react'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";

import axios from "axios";
import { authActions } from "../store";
axios.defaults.withCredentials = true;
const Header = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);


  const sendLogoutReq = async () => {
    const res = await axios.post("http://localhost:8070/User/logout", null, {
      withCredentials: true,
    });
    if (res.status == 200) {
      return res;
    }
    return new Error("Unable TO Logout. Please try again");
  };
  const handleLogout = () => {
    sendLogoutReq().then(() => dispatch(authActions.logout()));
  };

  return (
    <div>

<header>
          <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
          <h5 className="my-0 mr-md-auto font-weight-normal"><Link className="p-2" to="/Welcome">Welcome</Link></h5>
            <nav className="my-2 my-md-0 mr-md-3">

            {!isLoggedIn && (<>
              <Link className="p-2" to="/Login">Login</Link>
              <Link className="p-2" to="/SignUp">Sign Up</Link>
            </>)}
            
           {isLoggedIn &&
             <Link onClick={handleLogout} className="p-2" to="/Welcome">Log Out</Link>
             } 
            
            </nav>
          </div>
        </header>
       
    </div>
  )
}

export default Header