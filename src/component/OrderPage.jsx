import {useState} from 'react';
import OrderAPI from '../apis/OrderAPI';
import TokenManager from '../apis/TokenManager';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Order = ({ cartItems ,clearCart }) => {
const [claims, setClaims] = useState(TokenManager.getClaims());
  const currentDate = new Date();
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  const orderDate = currentDate.toLocaleDateString('en-GB', options);

  const handleOrderConfirm =(e) =>{
    e.preventDefault();
        const order = {
            customerId: claims?.customerId, 
            orderDetailRequests: cartItems.map((item) => ({
              productId: item.id,
              amount: item.amount,
            })),
            
          };
          
        OrderAPI.createOrder(order).then(response=> {
            console.log(response);
            alert(`Your order was created with order ${response}`);
            clearCart();
            window.location = "/";
            
          })
          .catch(error => {
           
              console.log("Our error: " + error);
              alert("Something went wrong. Please try again later.");
            
          });
  }
  
  const calculateTotalPrice = () => {
    let totalPrice = 0;
    if (cartItems) {
      cartItems.forEach((item) => {
        totalPrice += item.price * item.amount;
      });
    }
    return totalPrice;
  };
  
console.log(claims?.customerId)
  return (
    <div className="container mt-5 mb-5">
      <div className="row d-flex justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="invoice p-5">
              <h5>Check your Order</h5>
              <span className="font-weight-bold d-block mt-4">Hello</span>
              <div className="payment border-top mt-3 mb-3 border-bottom table-responsive">
                <table className="table table-borderless">
                  <tbody>
                    <tr>
                      <td>
                        <div className="py-2">
                          <span className="d-block text-muted">Order Date</span>
                          <span>{orderDate}</span>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="product border-bottom table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Description</th>
                      <th>Amount</th>
                      <th>Per Item</th>
                      <th>Total price</th>
                    </tr>
                  </thead>
                   <tbody>
                    {cartItems && cartItems.map((item) => (
                      <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>{item.amount}</td>
                        <td>{item.price}</td>
                        <td>{item.amount * item.price}</td>
                      </tr>
                    ))}
                    <tr className="border-top border-bottom">
                      <td></td>
                      <td></td>
                      <td>
                        <div className="text-left">
                          <span className="font-weight-bold">Subtotal</span>
                        </div>
                      </td>
                      <td>
                        <div className="text-right">
                          <span className="font-weight-bold">{calculateTotalPrice()}</span>
                        </div>
                      </td>
                    </tr>
                  </tbody> 
                </table>
              </div>
              <button onClick={handleOrderConfirm}>Confirm Order</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
