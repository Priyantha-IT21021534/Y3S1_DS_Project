import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import AddProducts from "./components/products/addProduct";
import UpdateProducts from "./components/products/updateProduct";
import "./App.css";

const App = () => {
  return (
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
