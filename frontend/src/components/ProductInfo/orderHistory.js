import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const OrderHistory = () => {

    const [orders, setOrders] = useState([])
    const {userId} = useParams();

useEffect(()=>{

    const getOrders = async() =>{

        const res = await axios.get(`http://localhost:8020/Order/orderhistory/${userId}`)
        setOrders(res.data)
        console.log(res.data)

        
    }
getOrders()
}, [])


  return (
    <div>{orders.length>0 && orders.map((order, key)=>(
        <div key={key}><h3>AMOUNT(Rs.) {order.amount}</h3>
        <h3>Order Status {order.status}</h3>

        <table>
        <thead>
            <th>Name</th>
            <th>Quantity</th>
        </thead>

            <tbody>{order.products.map((product,key)=>(
            <tr key={key}> 
                <td>{product.name}</td>
                <td>{product.quantity}</td>
            </tr>
        ))}</tbody>
        

           
        </table>
        </div>))}
        </div>
  )
}

export default OrderHistory