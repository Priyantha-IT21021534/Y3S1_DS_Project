import React, {useEffect, useState} from 'react'
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { addProduct } from '../Store';
import { useDispatch } from 'react-redux';

const Productinfo = () => {

    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1)
    const { id } = useParams();

    const navigate = useNavigate();
  
    const dispatch = useDispatch()

    useEffect(()=>{
        const getProduct = async() => {
            try {
                const response = await axios.get(`http://localhost:8070/products/getProduct/${id}`);
                setProduct(response.data.product)
                console.log(response.data.product)
              } catch (err) {
                console.log(err)
              }
            }
        getProduct()
    }, [id])

    

    

    const handleQuantity = (type) => {
      if (type === "dec") {
        quantity > 1 && setQuantity(quantity - 1);
      } else {
        setQuantity(quantity + 1);
      }
    };

    const handleAddtoCart = ()=>{
      dispatch(addProduct({...product, quantity}))
    }

  return (
    <div>
        
    <p>{product.image}</p>
    <p>{product.name}</p>
    <p>{product.brand}</p>
    <p>{product.price}</p>
    <p>{product.weight}</p>
   <p>{product.sellerName}⭐⭐⭐➡️<button className='btn btn-info p-1 me-2 btn-small-width' onClick={()=>navigate(`/rateSeller/${product.sellerName}/${product.sellerId}`)}>Rate This seller</button></p>
    
  <div className="amount-container">
  <button className="remove-button" onClick={() => handleQuantity("dec")}>-</button>
  <span className="amount">{quantity}</span>
  <button className="add-button" onClick={() => handleQuantity("inc")}>+</button>
</div>
    <button className="btn btn-success p-1 me-2" onClick={handleAddtoCart}>ADD TO CART🛒</button>
    
    </div>
    
  )
}

export default Productinfo