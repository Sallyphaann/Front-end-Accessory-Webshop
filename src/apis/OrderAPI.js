import TokenManager from './TokenManager';
import axios from 'axios';

const OrderAPI = {
    createOrder:(order) => axios.post(`http://localhost:8080/order`,order,
    {
        headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` }
    }
    )
    .then(response => response.data.orderId),
    getOrder:(customerId)=> axios.get(`http://localhost:8080/order/customer/${customerId}`,
    {
        headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` }
    }
    ).then(response => response.data)
    
}


export default OrderAPI;