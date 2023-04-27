import React from 'react'
import { useSelector } from 'react-redux'
import '../../assets/styles/cart.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Cart = () => {
  const cart = useSelector((state) => state.cart);

  const navigate = useNavigate();


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
        <h1>Shopping Cart</h1>
        <table>
          <th>
            <center>Product</center>
          </th>
          <th>
            <center>Price</center>
          </th>
          <th>
            <center>Quantity</center>
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
            <h1>Order Summary</h1>
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

        <button type="submit">CheckOut with Stripe</button>
        <button type="submit" onClick={() => navigate('/dummyPayment')}>CheckOut with Dummy</button>
      </form>
    </div>
  );
};

export default Cart;

/*<label>Address</label>
  <input type="address"/>


  div class="form-check">
        <h1>SHIPPING WITH ANONYMOUS</h1>
  <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
  <label class="form-check-label" for="flexRadioDefault1">
    SLOW DELIVERY
  </label>
</div>
<div class="form-check">
  <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked/>
  <label class="form-check-label" for="flexRadioDefault2">
  FAST DELIVERY
  </label>
<br/>
  
</div>

*/
