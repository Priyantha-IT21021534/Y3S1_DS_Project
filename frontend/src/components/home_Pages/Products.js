import React, { useEffect, useState } from 'react'
import axios from 'axios';
import '../../assets/styles/product.css'
import { useNavigate } from 'react-router-dom';

const Products = () => {

  const navigate = useNavigate()

  const [products, setProducts] = useState([]);

  useEffect(()=>{

        
    const getUsers = async() => {
        try {
            await axios.get("http://localhost:8070/products/getProducts").then((res)=>{
              console.log(res.data);
              setProducts(res.data)
            })
            
          } catch (err) {
            console.log(err)
          }
        }
    getUsers()
}, [])

  return (
    <div className='home container'>
<div className='home-products container'>
{products.length ? products.map((product, key) => (<div className='a_Product' key={key}>
<p>Name:{product.name}</p>
<p>Brand:{product.brand}</p>
<p>Price:{product.price}</p>
<p>Weight:{product.weight}</p>
<p>Image:{product.image}</p>
<button className="btn btn-info p-1 me-2" onClick = {()=>navigate(`/getProduct/${product._id}`)}>INFO</button>
<button className="btn btn-success p-1 me-2" onClick = {()=>navigate(`/rateBuyer/${product._id}`)}>⭐⭐⭐</button>

<br/><br/></div>)) : null}
</div>
</div>
  )
}

export default Products