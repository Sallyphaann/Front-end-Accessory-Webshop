import {useState,useEffect}from 'react';
import OrderAPI from '../apis/OrderAPI';
import TokenManager from '../apis/TokenManager';
import { format } from 'date-fns';

const History = () => {
const [orders, setOrders] = useState([]);
const [claims, setClaims] = useState(TokenManager.getClaims());
const getOrderList = async () => {
   OrderAPI.getOrder(claims.customerId)
   .then(response => setOrders(response))
   .catch(error=> console.log(error))
  };
  
  
  

useEffect(() => {
    getOrderList()
  }, []);


  
console.log(orders)
  return (
    <div className="row">
    {orders.map((order) => (
      <div className="col-12" key={order.id}>
        <div className="card text-white bg-info mt-4 p-2">
          <p>Order ID: {order.orderId}</p>
          <p>Order date: {format(new Date(order.orderDate), 'dd/MM/yyyy')}</p>
          <div className="bg-white"></div>
        </div>
      </div>
    ))}
  </div>
);
};

  
export default History;