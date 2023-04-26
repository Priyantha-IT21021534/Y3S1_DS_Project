import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "../../assets/styles/cart.css";
import axios from "axios";
import StripeCheckout from "react-stripe-checkout";

const KEY =
  "pk_test_51Moj0FA7YwNcizC88oNYnMH4OcCJvyfQSkTeiYWciqgdOfEPg5B74X0EEKSvFZD8dBog2ovsE6ZHpft5J8Avswah00Z0Ep11s4";

const Cart = () => {
  const cart = useSelector((state) => state.cart);

  const [stripeToken, setStripeToken] = useState(null);

  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await axios.post("http://localhost:8020/Order/payment", {
          tokenId: stripeToken.id,

          amount: cart.total,
        });

        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    stripeToken && makeRequest();
  }, [stripeToken, cart.total]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const orderData = {
      products: cart.products.map((product) => ({
        productId: product._id,
        name: product.name,
        quantity: product.quantity,
      })),

      amount: cart.withCommision,

      status: "pending",
    };

    try {
      const res = await axios.post(
        "http://localhost:8020/Order/addOrder",
        orderData
      );
      console.log(orderData);
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1>Shopping Cart</h1><br></br>
        <table>
          <th>
            <center>Product</center>
          </th>
          <th>
            <center>Quantity</center>
          </th>
          <th>
            <center>Price</center>
          </th>

          {cart.products.map((product) => (
            <tbody>
              <td>{product.name}</td>
              <td>{product.quantity}</td>
              <td>
                {product.quantity}*{product.price}
              </td>
            </tbody>
          ))}
          <tfoot>
            <br></br><br></br>
            <h2>Order Summary</h2>
            <br></br>
            <tr>
              <th className="cart-total">Cart Total:</th>
              <td className="cart-total">
                <strong>{cart.total}</strong>
              </td>

              <th className="cart-total">With Commission:</th>
              <td className="cart-total">
                <strong>{cart.withCommision}</strong>
              </td>

              <th className="cart-total">Item Count:</th>
              <td className="cart-total">
                <strong>{cart.products.length}</strong>
              </td>
            </tr>
          </tfoot>
        </table>

        <br />
        <br />

        <StripeCheckout
          name="Ayu Shop"
          image
          src="https://i.postimg.cc/d3qbx7SW/AyuLogo.png"
          description={`Your total is Rs. ${cart.total}`}
          amount={cart.total * 100}
          token={onToken}
          stripeKey={KEY}
        >
          <button type="submit">CheckOut</button>
        </StripeCheckout>
      </form>
    </div>
  );
};

export default Cart;


