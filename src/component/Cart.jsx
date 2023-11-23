import React from 'react';
import { Link } from 'react-router-dom';

const Cart = ({ cartItems, decreaseQuantity, increaseQuantity,clearCart }) => {
  
  const handleDecrease = (item) => {
    decreaseQuantity(item);
  };

  const handleIncrease = (item) => {
    increaseQuantity(item);
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    cartItems.forEach((item) => {
      totalPrice += item.price * item.amount;
    });
    return totalPrice;
  };
  console.log(cartItems);
  return (
    <>
      {/* <h2>Cart</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>
                <button onClick={() => handleDecrease(item)}>-</button>
                {item.amount}
                <button onClick={() => handleIncrease(item)}>+</button>
              </td>
              <td>{item.price * item.amount}</td>
            </tr>
          ))}
          <tr>
            <td colSpan="4" className="text-right">
              Total
            </td>
            <td>{calculateTotalPrice()}</td>
          </tr>
        </tbody>
      </table>
      <Link to={{
        pathname: '/order',
        state: { cartItems }  // Pass cartItems as state to the order page
      }}>
        Proceed to Order
      </Link> */}
      {cartItems.length === 0 ? (
  
   
     <div className="col-md-12">
       <div className="card">
         <div className="card-header">
               </div>
         <div className="card-body cart">
           <div className="col-sm-12 empty-cart-cls text-center">
             <img
               src="https://cdni.iconscout.com/illustration/free/thumb/free-empty-cart-4085814-3385483.png"
               width="360"
               height="360"
               className="img-fluid mb-4 mr-3"
               alt="Empty Cart"
             />
             <h3>
               <strong>Your Cart is Empty</strong>
             </h3>
             
             <a href="/products" className="btn btn-primary cart-btn-transform m-3" data-abc="true">
               continue shopping
             </a>
           </div>
         </div>
       </div>
     </div>
   

) : (
  <><table className="table table-bordered">
            <thead>
              <tr>
                <th>Product ID</th>
                <th>Product Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total Price</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>
                    <button onClick={() => handleDecrease(item)}>-</button>
                    {item.amount}
                    <button onClick={() => handleIncrease(item)}>+</button>
                  </td>
                  <td>{item.price * item.amount}</td>
                </tr>
              ))}
              <tr>
                <td colSpan="4" className="text-right">
                  Total
                </td>
                <td>{calculateTotalPrice()}</td>
              </tr>
            </tbody>
          </table><Link to={{
            pathname: '/order',
            state: { cartItems } // Pass cartItems as state to the order page
          }}>
              Proceed to Order
            </Link></>
)}

      
    </>

    
  );
};

export default Cart;
