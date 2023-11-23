import React from 'react';
import TokenManager from './TokenManager';
import axios from 'axios';


const CustomerAPI = {

    getCustomer:(customerId)=> axios.get(`http://localhost:8080/customers/${customerId}`,
    {
        headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` }
    })
    .then(response => response.data)
    .then(userInfo => TokenManager.setUser(userInfo)),
    
    updateCustomer:(id,editedCustomer) => axios.put(`http://localhost:8080/customers/${id}`,editedCustomer,
    {
        headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` }
    }
    )
    .then(response => response.data),
    createCustomer:(customer) => axios.post(`http://localhost:8080/customers`,customer)
    .then(response => response.data.customerId ),



 
}

export default CustomerAPI