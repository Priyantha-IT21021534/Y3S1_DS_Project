import React from 'react'
import { useSelector } from 'react-redux'
import '../../assets/styles/cart.css'

const Cart = () => {

    const cart = useSelector((state) => state.cart)

  return (
    <div className="container">
      <h1>Shopping Cart</h1>
      <table>
        
            <div>
            <tr>
            <th><center>Product</center></th>
            <th><center>Price</center></th>
            <th><center>Quantity</center></th>
            
          </tr>
            </div>
            {cart.products.map((product)=>(
        <tbody>
            
            <div><tr>
            <td>{product.name}</td>
            <td>{product.quantity}</td>
            <td>{product.quantity}*{product.price}</td>
          </tr>
          </div>
                
            
          
        </tbody>
        ))}
        <tfoot>
        <h1>Order Summary</h1>
          <tr>    
            <th className="cart-total">Cart Total:</th>
            <td className="cart-total"><strong>{cart.total}</strong></td>

            <th className="cart-total">Item Count:</th>
            <td className="cart-total"><strong>{cart.products.length}</strong></td>
          </tr>
        </tfoot>
      </table>

      <button>CheckOut</button>

      <br/>
      <br/>
      <div class="form-check">
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
</div>
    </div>
  
  )
}

export default Cart