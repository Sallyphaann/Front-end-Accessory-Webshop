import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import API from '../apis/ProductAPI';
import style from '../css/Register.module.css';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Editproduct = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [product, setProduct] = useState('')
  const { id } = useParams();
  const navigate = useNavigate();
  const handleCategorySelection = (event) => {
    setSelectedCategory(event.target.value);
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };
  const handleCancel = () => {
    navigate('/ProductManagement');
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (product.name === ''&& product.price === ''&&product.quantity === ''&&selectedCategory === '') {
      
      toast.warning('Please fill all the fields ');
      return;
    }
    if (product.name === '') {
      
      toast.warning('Please fill Product name');
      return;
    }
    if (product.price === '') {
      
      toast.warning('Please fill Product price');
      return;
    }
    if (product.quantity === '') {
      
      toast.warning('Please fill Product quantity');
      return;
    }
    if (selectedCategory === '') {
      
      toast.warning('Please fill category');
      return;
    }
    
    const editedProduct={
      "id":id,
      "name":product.name,
       "price":product.price,
       "quantity": product.quantity,
      "categoryId": selectedCategory
    }
   API.updateProduct(id, editedProduct)
      .then(() => {
        console.log('Product updated successfully!');
        alert('Product updated successfully!');
        navigate('/ProductManagement');
      })
      .catch((error) => {
        console.error(error);
        alert('Something went wrong. Please try again later.');
      });
  };
  useEffect(() => {
    API.getProductById(id)
      .then((response) => setProduct(response))
      .catch((error) => {
        console.error(error);
        alert('Failed to fetch product details. Please try again later.');
      });
  }, [id]);

  useEffect(() => {
    API.getCategory()
      .then((categories) => {
        console.log('Fetched categories:', categories); // Log fetched categories
        setCategories(categories);
      })
      .catch((error) => {
        console.error(error);
        alert('Failed to fetch categories. Please try again later.');
      });
  }, []);

  return (
    <div className={style.registerPage}>
      <div className={style.form}>
        <div className={style.registerheader}>
          <h3>Edit Product</h3>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={style.registerform}>
            <label className={style.label}>Product Name</label>


            <input type="text"
              id="name"
              name="name"
              value={product.name || ''}
              onChange={handleInputChange} placeholder="Product name" />




            <label className={style.label}>Price</label>

            <input type="text"
              id="price"
              name="price"
              value={product.price || ''}
              onChange={handleInputChange} placeholder="Price" />



            <label className={style.label}>Quantity</label>

            <input
              type="text"
              id="quantity"
              name="quantity"
              value={product.quantity || ''}
              onChange={handleInputChange}
              placeholder="Quantity"
            />

            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={selectedCategory}
              onChange={handleCategorySelection}
            >
              <option value="" disabled>
                {product.category ? product.category.name : 'Loading...'}
              </option>
              {categories &&
                categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
            </select>


          </div>
          <button type="submit">Save</button>
          <button type ="submit" onClick={handleCancel}>Cancel</button>

        </form>
      </div>
    </div>
  )
}

export default Editproduct;