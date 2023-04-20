import React from "react";

import {Route, Routes, BrowserRouter} from 'react-router-dom'
import Register from "./components/authentication/register";
import Login from "./components/authentication/login";
import Profile from "./components/Profile/profile";
import Header from "./components/header";
import Admin from "./components/home_Pages/Admin";
import Products from "./components/home_Pages/Products";
import Productinfo from "./components/ProductInfo/productinfo";
import Cart from "./components/ProductInfo/cart";
import { useSelector } from "react-redux";

const App = () => {

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  console.log(isLoggedIn);

  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/signUp" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
       {isLoggedIn && <Route path="/profile" element={<Profile/>}/>}
       {isLoggedIn && <Route path="/admin" element={<Admin/>}/>} 
       {isLoggedIn && <Route path="/products" element={<Products/>}/>}  
       {isLoggedIn && <Route path="/getProduct/:id" element={<Productinfo/>}/>}
       {isLoggedIn && <Route path="/cart" element={<Cart/>}/>}
      </Routes>

    </BrowserRouter>
  );
}
export default App;

