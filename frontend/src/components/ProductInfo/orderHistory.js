import React, { useEffect, useState } from 'react'
import axios from 'axios'

const OrderHistory = () => {

    const [orders, setOrders] = useState([])
   // const {userId} = useParams();

useEffect(()=>{

    const getOrders = async() =>{

        const res = await axios.get(`http://localhost:8020/Order/orderhistory`)
        setOrders(res.data)
        console.log(res.data)

        
    }
getOrders()
}, [])


  return (
    <div style={{ marginTop: '20px',  width: '500px',marginLeft: '50px',fontSize: '20px',  }}>{orders.length>0 && orders.map((order, key)=>(
        
        <div>
        
        <div key={key}><h4>Amount: Rs.{order.amount}</h4>
        <h4>Order Status : {order.status}</h4>

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
        <br></br><br></br>
        </div></div>))}
        </div>
  )
}

export default OrderHistory