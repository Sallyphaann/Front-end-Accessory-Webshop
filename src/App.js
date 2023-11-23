import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Homepage from './component/Homepage';
import Productpage from './component/Productpage';
import Contactpage from './component/Contactpage';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import Editproduct from './component/Editproduct';
import ProductManagement from './component/ProductManagement';
import Login from './component/Login';
import Profile from './component/Profile';
import TokenManager from './apis/TokenManager';
import PrivateRouter from './component/PrivateRouter';
import RequireAuth from './component/RequireAuth';
import Register from './component/Register';
import AddNewProduct from './component/AddNewProduct';
import Cart from './component/Cart';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Order from './component/OrderPage';
import History from './component/History';
import Static from './component/Static';


//context
function App() {
  const [claims, setClaims] = useState(TokenManager.getClaims());
  const userInfo =useState(TokenManager.getUser());
  const [cartItems, setCartItems] = useState([]);
  const[editProduct , setEditProduct] = useState([]);
  const clearCart = () => {
    setCartItems([]);
  };
  const edit =(product)=>{
    

  }
   const addToCart = (product, amount) => {
    const existingItem = cartItems.find((item) => item.id === product.id);
    const updatedAmount = 1; 
  
    if (existingItem) {
      const updatedItems = cartItems.map((item) =>
        item.id === product.id ? { ...item, amount: item.amount + updatedAmount } : item
      );
      setCartItems(updatedItems);
      toast.success('Product added to cart' ,{ autoClose: 2000 });
    } else {
      const newItem = { ...product, amount: updatedAmount };
      setCartItems([...cartItems, newItem]);
      toast.success('Product added to cart');
    }
  };
  /* const decreaseQuantity = (item) => {
    if (item.amount > 1) {
      const updatedItem = { ...item, amount: item.amount - 1 };
      const updatedItems = cartItems.map((cartItem) =>
        cartItem.id === item.id ? updatedItem : cartItem
      );
      setCartItems(updatedItems);
      console.log(`Decreased quantity for item ${item.id}`);
    } else {
      // Remove the item from the cart
      const updatedItems = cartItems.filter((cartItem) => cartItem.id !== item.id);
      setCartItems(updatedItems);
      alert(`Removed product ${item.name} from the cart`);
    }
  }; */
   const decreaseQuantity = (item) => {
    if (item.amount > 1) {
      const updatedItem = { ...item, amount: item.amount - 1 };
      const updatedItems = cartItems.map((cartItem) =>
        cartItem.id === item.id ? updatedItem : cartItem
      );
      setCartItems(updatedItems);
      console.log(`Decreased quantity for item ${item.id}`);
    } else {
      const confirmed = window.confirm(`Are you sure you want to remove product ${item.name} from the cart?`);
  
      if (confirmed) {
        const updatedItems = cartItems.filter((cartItem) => cartItem.id !== item.id);
        setCartItems(updatedItems);
        alert(`Removed product ${item.name} from the cart`);
      }
    }
  }; 
  
  
  
  
  const increaseQuantity = (item) => {
    if (item.amount < 10) {
      const updatedItem = { ...item, amount: item.amount + 1 };
      const updatedItems = cartItems.map((cartItem) =>
        cartItem.id === item.id ? updatedItem : cartItem
      );
      setCartItems(updatedItems);
    } else {
      toast.error("You can't increase the quantity beyond 10.");
    }
  };
  
  return (
    <div>
      
      <Router>
      <Navbar testClaims={claims}/>
      <ToastContainer />
          <Link/>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/products" element={<Productpage addToCart={addToCart}/>} />
            <Route path="/chat" element={<Contactpage />} />
           
            <Route path="/Register" element={<Register/>}/>
            <Route path = "/History" element={<History/>}/>
            
            <Route path='/Cart' element={<Cart clearCart={clearCart} cartItems={cartItems} decreaseQuantity={decreaseQuantity} increaseQuantity={increaseQuantity} />}/>
            <Route element ={<RequireAuth/>}>
            <Route path="/productmanagement" element={<ProductManagement/>}/>
            <Route path="/AddProduct" element={<AddNewProduct/>}/>
            <Route path="/products/:id"  element={<Editproduct edit={edit}/>}/>
            <Route path="/Static" element={<Static/>}/>
           
            </Route>
            
            <Route path ="/Login" element={<Login/>}/>
              <Route element={<PrivateRouter/>}>
            <Route path ="/Profile" element={<Profile/>}/>
            <Route path='/order' element={<Order cartItems={cartItems} clearCart={clearCart}/>}/>
            </Route>
            
          </Routes>
        </Router>
     
      </div>      
     
  )
  }

export default App;
