import {useState,useEffect} from 'react';
import style from '../css/ProductManagement.module.css';
import API from '../apis/ProductAPI';
import { Link } from 'react-router-dom';


const ProductManagement = ({edit}) => {
    const [products, setProducts] = useState([]);
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
            .then(() =>{ getProductList();alert("Product deleted successfully!") // Show success message
        })
            .catch((error) => console.error(error));
        }
      };

    const getProductList = () => {
        API.getProduct()
            .then(products => setProducts(products))
            .catch(error => console.error(error));
            
    };
      useEffect(() => {
        getProductList()
      }, []);
console.log(products);
  return (
    <><div>
      {/* <label>Search product</label>
      <input type="text" placeholder="Search.." className={style.Search} onChange={(e) => searchHandle(e.target.value)}></input> */}
      <div className={style.container1}>
      <div>
      <Link className={style.addButton} to="/AddProduct">Add new product</Link>
      </div>
      <label className={style.label}>Search product</label>
      <br></br>
      <input
        type="text"
        placeholder="Search.."
        className={style.searchInput}
        onChange={(e) => searchHandle(e.target.value)}
      />
    </div>
    </div><div className={style.container}>

        <table>
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Quanlity</th>
              <th>Category</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {products && products.map((product) => (
              <>
                <tr key={products.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.quantity}</td>
                  <td>{product.category.name}</td>
                  <td>
                    <Link to={`/products/${product.id}`} className="btn btn-primary">Edit</Link>
                    <button variant="danger" onClick={() => handleDelete(product.id)} type="button" className="btn btn-danger">Delete</button>
                  </td>
                </tr>

              </>
            ))}

          </tbody>



        </table>
      </div></>
  )
}

export default ProductManagement