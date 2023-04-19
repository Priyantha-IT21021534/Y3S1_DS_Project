import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Home from "./components/Home";
import NavBar from "./components/NavBar";
import NotFound from "./components/NotFound";
import Cart from "./components/Cart";

import "react-toastify/dist/ReactToastify.css";

import CheckoutSuccess from "./components/CheckoutSuccess";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ToastContainer />
        <NavBar />
        <div className="content-container">
          <Routes>
            {<Route path="/" element={<Home />} />}
            {<Route path="/cart" element={<Cart />} />}
            <Route path="/checkout-success" element={<CheckoutSuccess />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
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
}
export default App;
