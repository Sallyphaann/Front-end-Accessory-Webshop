
import styles from "../css/Home.module.css";
import feature from"../image/bag.jpg";
import  {React, useState , useEffect} from 'react';
import TokenManager from '../apis/TokenManager';
import LoginAPI from "../apis/LoginAPI";
import InputLogin from "./InputLogin";
import { useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Login () {
const navigate = useNavigate();
const [claims, setClaims] = useState(TokenManager.getClaims());
const handleLogin = (email, password) => {
    LoginAPI.login(email, password)
      .then(claims => {
        setClaims(claims);
        navigate('/Profile');
      })
      .catch(() => toast.warning("Login failed!"))
      .catch(error => console.error(error));
  };
  return (
    <div>
      
      {claims ? (
       <div>
       <p>Welcome, {claims.sub}</p>
     </div>
      ) : (
        <InputLogin onLogin={handleLogin} />
      )}
    </div>
  )
}

export default Login;

