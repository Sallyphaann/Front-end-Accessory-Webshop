import React, { useEffect, useState } from "react";
import API from "../apis/ProductAPI";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Styles from '../css/Product.module.css'
import { Link } from "react-router-dom";



function ProductPage({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategory] = useState([]);
  const handleAddToCart = (product) => {
    addToCart(product,1);
  };

  const getCategoryList = () => {
    API.getCategory()
        .then(categories => setCategory(categories))
        .catch(error => console.error(error)); 
        
          };
    useEffect(() => {
        getCategoryList()
      }, []);

   const filterHandle = (categoryName) => {
    API.filterProduct(categoryName)
    .then(response => setProducts(response)
    )
    .catch(error => console.log(error))
  } 
  
  
  const getProductList = () => {
    API.getProduct()
        .then(products => setProducts(products))
        .catch(error => console.error(error));
        
};
  useEffect(() => {
    getProductList()
  }, []);

  const searchHandle = (productName) => {
    API.searchProduct(productName)
      .then(response => setProducts(response))
      .catch(error => {if (error.response?.status === 404) {
        alert("Cant found product");
    } else {
        alert("Something went wrong. Please try again later.");
    }});
  }
  
  

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      API.deleteProduct(id)
        .then(() => getProductList())
        .catch((error) => console.error(error));
    }
  };
  
  
  return (

    <div className={Styles.container}>
      <div className={Styles.sidebar}>
        <div>

        <ul>
          <br></br>
          <div class="btn-group">
          <button className="btn btn-success" onClick={() => window.location.reload()}>All product</button>
          {categories.map(category => {
            return (
              <button className="btn btn-success" key={category.id} value={category.name} onClick={(e) => filterHandle(e.target.value)}>
                {category.name}
              </button>
            );
          })}
          </div>
        
        </ul>
      </div>
      </div>
      <div className={Styles.product}>
        <div>
          <label>Search product</label>
          <input type="text" placeholder="Search.." className={Styles.Search} onChange={(e) => searchHandle(e.target.value)}></input>
        </div>
        {products && products.map((product) => (
          <div className={Styles.Card} key={product.id}>
            <Card>
              <Card.Body>
                <Card.Title>Product</Card.Title>
                <Card.Text>ID: {product.id}</Card.Text>
                <Card.Text>Name: {product.name}</Card.Text>
                <Card.Footer>Price: {product.price} € </Card.Footer>
                <br></br>
                <div className="col text-center" >
                <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
                {/* <Link to={`/products/${product.id}`} className="btn btn-outline-warning">Add to card</Link> */}
                </div>
              </Card.Body>
            </Card>
          </div>
        ))
        }
      </div>
    </div>
  );
}
export default ProductPage;
