import React from 'react'
import '../assets/styles/header.css'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { authActions } from "./Store";
axios.defaults.withCredentials = true;

const Header = () => {

    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

    const quantity = useSelector((state) => state.cart.quantity)

    //console.log(cart)

    const dispatch = useDispatch();
    const sendLogoutReq = async()=>{

        const res = await axios.post('http://localhost:8090/User/logout', null, {
            withCredentials: true,
        })//null means we don't have anything to add with this api
        if (res.status === 200) {
            return res;
          }
          return new Error("Unable To Logout. Please try again");
        };
        const handleLogout = () => {
            sendLogoutReq().then(() => dispatch(authActions.logout()));
          };

  return (
    <div>
    <header className="header">
      <div className="header__logo">
        <img src="https://i.postimg.cc/d3qbx7SW/AyuLogo.png" alt="Logo" />
        <h1 className="header__title">AyurHerb Store</h1>
      </div>

      <nav className="header__nav">
        <ul className="header__list">
          {!isLoggedIn && (
          <><li className="header__item">
            <Link className='login' to="./login">Login</Link>
          </li>

          <li className="header__item">
          <Link className='register' to="./signUp">Sign Up</Link>
          </li>
          </>
)}
          <li className="header__item">
     {isLoggedIn && <Link onClick={handleLogout} className='logout' to="./">Log Out</Link>}

     <Link to="./cart">{isLoggedIn && <div><span className="badge bg-primary">{quantity}</span>
     <i className="bi bi-cart-fill"></i></div>}</Link>

     {isLoggedIn && <Link className="orderHistory" to="./getOrders">Order Hisory</Link>}
        
          </li>
        </ul>
      </nav>
    </header>
  </div>
  )
}

export default Header