import axios from "axios";
import TokenManager from "./TokenManager";
const Product_BASE_URL = "http://localhost:8080/products";
const Category_BASE_URL = "http://localhost:8080/categories";


 

const API = {
    getProduct: () => axios.get(Product_BASE_URL)
        .then(response => response.data.products),
    getCategory : () => axios.get(Category_BASE_URL)
        .then(response=> response.data.categories),
    
    searchProduct: (productName) => axios.get(`http://localhost:8080/products/search?query=${productName}`)
              .then(response => response.data),

    filterProduct:(categoryName)=> axios.get(`http://localhost:8080/products/filter?category=${categoryName}`)
        .then(response=>response.data),

    deleteProduct:(id) =>axios.delete(`http://localhost:8080/products/${id}`,
    {
        headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` }
    })
    .then(response => response.data),
    getProductById: (id) => axios.get(`http://localhost:8080/products/${id}`,)
    .then(response => response.data),
    createProduct:(product) => axios.post(`http://localhost:8080/products`,product,{
        headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` }
    })
    .then(response => response.data.productId),
    updateProduct:(id,product) => axios.put(`http://localhost:8080/products/${id}`,product,
    {
        headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` }
    }
    )
    .then(response => response.data),
    getQuantityProduct:() =>axios.get(`http://localhost:8080/products/static`,{
        headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` }
    })
    .then(response => response.data)
};

export default API;