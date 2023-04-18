import React from "react";

import {Route, Routes, BrowserRouter} from 'react-router-dom'
import Register from "./components/authentication/register";
import Login from "./components/authentication/login";
import Profile from "./components/Profile/profile";
import Header from "./components/header";
import Admin from "./components/home_Pages/Admin";
import Products from "./components/home_Pages/Products";
import { useSelector } from "react-redux";

const App = () => {

  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  console.log(isLoggedIn);

  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/signUp" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
       {isLoggedIn && <Route path="/profile" element={<Profile/>}/>}  
      </Routes>

    </BrowserRouter>
  );
}
export default App;

//profile route is only working when isLoggedIn is true