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
import OrderHistory from "./components/ProductInfo/orderHistory";
import ViewOrders from "./components/ProductInfo/viewOrders";
import RateForm from "./components/rate&Review/RateForm";

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
        <Route path="/rateBuyer/:id" element={<RateForm/>}/>
       {isLoggedIn && <Route path="/profile" element={<Profile/>}/>}
       {isLoggedIn && <Route path="/admin" element={<Admin/>}/>} 
       {isLoggedIn && <Route path="/products" element={<Products/>}/>}  
       {isLoggedIn && <Route path="/getProduct/:id" element={<Productinfo/>}/>}
       {isLoggedIn && <Route path="/cart" element={<Cart/>}/>}
       {isLoggedIn && <Route path="/getOrders" element={<OrderHistory/>}/>}
       {isLoggedIn && <Route path="/admin/viewOrders" element={<ViewOrders/>}/>}

       <Route path="*" element={<h1>Page Not Found</h1>}/>
      </Routes>
      
    </BrowserRouter>
  );
}
/*
export default App;

    <div className="App">
      <header className="header">
        <div className="header__logo">
          <img src="https://i.postimg.cc/d3qbx7SW/AyuLogo.png" alt="Logo" />
          ....
          <h1 className="header__title"> AyurHerb Store</h1>
        </div>

        <nav className="header__nav">
          <ul className="header__list">
            <li className="header__item">
              <a href="#">Home</a>
            </li>

            <li className="header__item">
              <a href="#">About</a>
            </li>
            <li className="header__item">
              <a href="#">Contact</a>
            </li>
            <li className="header__item">
              <a href="#">Login /Register</a>
            </li>
          </ul>
        </nav>
      </header>

      <BrowserRouter>
        <Routes>
          <Route path="/addProduct" element={<AddProducts />} />
          <Route path="/updateProduct/:_id" element={<UpdateProducts/>}/>
        </Routes>
      </BrowserRouter>
      <footer className="footer">
        <div className="footer__content">
          <p className="footer__text">Copyright © 2023 | AyurHerb Store</p>
          <div className="footer__socials">
            <a href="#" className="footer__social-link">
              Twitter
            </a>
            <a href="#" className="footer__social-link">
              Facebook
            </a>
            <a href="#" className="footer__social-link">
              Instagram
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};
export default App;
*/