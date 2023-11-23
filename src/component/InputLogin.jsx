import {useState} from 'react';
import styles from '../css/Login.module.css';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const InputLogin = (props) => {
  const [email, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (email === '' && password === '') {
      
      toast.warning('Please enter both email and password');
      return;
    }
    if (email === '') {
      
      toast.warning('Please enter username');
      return;
    }
    if ( password === '') {
      
      toast.warning('Please enter password');
      return;
    }
    props.onLogin(email, password);
  }

  return (
    <div className={styles.loginpage}>
      <div className={styles.form}>
            <div className={styles.loginheader}>   
              <h3>Welcome to Sally'home </h3>
            </div>
        <form className={styles.loginform} onSubmit={handleSubmit}>
           
          <input type="text"
          value={email}onChange={(e) => setUsername(e.target.value)}placeholder="Email"/>
          
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"/>
          <button type ="submit">login</button>
          
        </form>
        <br></br>
        <Link to="/register" style={{ color: "black" }} >Don't have account ? Click Here </Link>
      </div>
    </div>
  )
}

export default InputLogin;