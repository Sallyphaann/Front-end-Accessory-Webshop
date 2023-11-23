import React,{useState,useEffect}from 'react';
import style from '../css/Register.module.css';
import { useNavigate } from 'react-router-dom';
import API from '../apis/ProductAPI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddNewProduct = () => {
  const [productName , setProductName] = useState('');
  const [productPrice , setProductPrice] = useState('');
  const [quantity , setQuantity] = useState('');
  const [categories, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const navigate = useNavigate();
  const handleCancel = () => {
    navigate('/');
  };
  const handleCategorySelection = (event) => {
    const selectedValue = event.target.value;
    setSelectedCategory(selectedValue);
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (productName === '' && selectedCategory === '' && quantity === ''&& productPrice === '') {
      
      toast.warning('Please fill all information');
      return;
    }
    if (productName === '') {
      
      toast.warning('Please fill Product name');
      return;
    }
    if (productPrice === '') {
      
      toast.warning('Please fill Product price');
      return;
    }
    if (quantity === '') {
      
      toast.warning('Please fill quantity');
      return;
    }
    if (selectedCategory=== '') {
      
      toast.warning('Please fill category');
      return;
    }
   
    const newProduct = {
      "name": productName,
      "price":productPrice,
      "quantity":quantity,
      "categoryId":selectedCategory,
         };
         console.log(newProduct)
         API.createProduct(newProduct)
         .then(response => console.log(response),alert("Product was created"),window.location="/productmanagement")
         .catch(error =>console.log(error))
  }
  const getCategoryList = () => {
    API.getCategory()
        .then(categories => setCategory(categories))
        .catch(error => console.error(error)); 
        
          };
    useEffect(() => {
        getCategoryList()
      }, []);

  return (
    <>
    <div className={style.registerPage}>
      <div className={style.form}>
            <div className={style.registerheader}>   
              <h3>Add new Product</h3>
            </div>
        <form  onSubmit={handleFormSubmit}>
        <div className={style.registerform}>
        <label className={style.label}>Product Name</label>
    
        
          <input type="text"
          value={productName}onChange={(e) => setProductName(e.target.value)}placeholder="Product name"/>
         
         

       
        <label className={style.label}>Price</label>
      
          <input type="text"
          value={productPrice} onChange={(e) => setProductPrice(e.target.value)}placeholder="Price"/>
         
          
        {/* this line using for Address */}
        <label className={style.label}>Quantity</label>
        <br/>
          <input type="text"
          value={quantity}onChange={(e) => setQuantity(e.target.value)}placeholder="Quanlity"/>
        
              <label for="category"> Category</label>
              <select value={selectedCategory} onChange={handleCategorySelection}>
                <option value="" disabled>
                  Please select the Category
                </option>
                {categories && categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
          
        </div>
          <button type ="submit">Save</button>
          <button type ="submit" onClick={handleCancel}>Cancel</button>
          
        </form>
      </div>
    </div>
    </>
  )
}

export default AddNewProduct;