import {React , useState , useEffect}from 'react';
import style from '../css/Register.module.css';
import { useNavigate } from 'react-router-dom';
import CustomerAPI from '../apis/CustomerAPI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Register = () => {
const [firstName , setFirstName] = useState('');
const [lastName , setLastName] = useState('');
const [email , setEmail] = useState('');
const [phoneNumber , setPhoneNumber] = useState('');
const [address , setAddress] = useState('');
const [password, setPassword] = useState('');
const [formErrors , setFormErrors] =useState({})
const [showPassword, setShowPassword] = useState(false);
const [isSubmit ,setIsSubmit] = useState(false);
const navigate = useNavigate();
const handleCheckboxChange = () => {
    setShowPassword(!showPassword);
  };
const handleCancel = () => {
    navigate('/');
  };
const validate = (values) => {
    const errors = {};
    const firstNameRegex = /^[a-zA-Z ]{3,16}$/;
    if (!values.firstName) {
    errors.firstName = "First Name is required";
     } else if (!firstNameRegex.test(values.firstName)) {
    errors.firstName = "First Name must be between 3 and 16 characters and should not include special characters and only contain letters";
    }
    const lastNameRegex = /^[a-zA-Z ]{3,16}$/;
    if(!values.lastName){
        errors.lastName = "Last Name is required"
    }
    else if (!firstNameRegex.test(values.lastName)) {
        errors.lastName = "Last Name must be between 3 and 16 characters and should not include special charactersand only contain letters";
        }
    const addressRegex = /^[a-zA-Z0-9\s\.,#-]{5,}$/;
    if(!values.address){
        errors.address = " Address is required"
    }
    else if (!addressRegex.test(values.address)) {
        errors.address = "Invalid address format";
      }
    const phoneNumberRegex = /^[+]?[0-9]{0,3}[-\s]?[(]?[0-9]{1,4}[)]?[-\s]?[0-9]{1,10}$/;
    if(!values.phoneNumber){
        errors.phoneNumber = " Phone Number is required"
    }
    else if (!phoneNumberRegex.test(values.phoneNumber)) {
        errors.phoneNumber = "Invalid phone number format";
      }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!values.email) {
     errors.email = "Email is required";
    } else if (!emailRegex.test(values.email)) {
        errors.email = "Invalid email format";
      }
    if(!values.password){
        errors.password = "password is required"
    }
    else if (values.password.length < 6) {
        errors.password = "Password should be at least 6 characters long";
      }
    return errors;
}
const handleSubmit = (e) => {
    e.preventDefault();
    if (firstName === '' && lastName === ''&& email === ''&& address === ''&& phoneNumber === ''&& password === '') {
      
      toast.warning('Please fill all the fields');
      return;
    }
    if (firstName === '') {
      
      toast.warning('Please fill firstname');
      return;
    }
    if (lastName === '') {
      
      toast.warning('Please fill lastname');
      return;
    }
    if (address === '') {
      
      toast.warning('Please fill address');
      return;
    }
    if (email === '') {
      
      toast.warning('Please fill email');
      return;
    }
    if (phoneNumber === '') {
      
      toast.warning('Please fill phone Number');
      return;
    }
    if (password === '') {
      
      toast.warning('Please fill password');
      return;
    }
    const errors = validate({ firstName, lastName ,address,phoneNumber,email,password});
    setFormErrors(errors);
    setIsSubmit(true);
    const customer ={
    "firstname":firstName,
     "lastname":lastName,
     "email":email,
     "address":address,
     "phoneNumber":phoneNumber,
     "password":password
    };
    CustomerAPI.createCustomer(customer)
  .then(response=> {
    console.log(response);
    alert("Your account was created");
    window.location = "/Login";
  })
  .catch(error => {
    if (error.response?.status === 400&& error.response?.data === "EMAIL_ALREADY_EXISTS") {
      alert("EMAIL_ALREADY_EXISTS PLEASE CHOOSE ANOTHER EMAIL");
    } else {
      console.log("Our error: " + error);
      alert("Something went wrong. Please try again later.");
    }
  });
 
  }
useEffect(()=>{
    if (Object.keys(formErrors).length === 0 && isSubmit) {
        console.log(firstName)
      }

},[formErrors])

  return (
    <div className={style.registerPage}>
      <div className={style.form}>
            <div className={style.registerheader}>   
              <h3>Register</h3>
            </div>
        <form onSubmit={handleSubmit} >
        <div className={style.registerform}>
        {/* this line using for first name  */}
        <label className={style.label}>First Name</label>
        <br/>
        <label className={style.error}>{formErrors.firstName}</label>
          <input type="text"
          value={firstName}onChange={(e) => setFirstName(e.target.value)}placeholder="Firstname"/>
         
         

        {/* this line using for last name  */}
        <label className={style.label}>Last Name</label>
        <br/>
        <label className={style.error}>{formErrors.lastName}</label>
          <input type="text"
          value={lastName}onChange={(e) => setLastName(e.target.value)}placeholder="LastName"/>
         
          
        {/* this line using for Address */}
        <label className={style.label}>Address</label>
        <br/>
        <label className={style.error}>{formErrors.address}</label>
          <input type="text"
          value={address}onChange={(e) => setAddress(e.target.value)}placeholder="Address"/>
        
          
         
          {/* this line using for Phone NUmber */}
          <label className={style.label}>Phone Number</label>
          <br/>
          <label className={style.error} >{formErrors.phoneNumber}</label>
          <input type="text"
          value={phoneNumber}onChange={(e) => setPhoneNumber(e.target.value)}placeholder="PhoneNumber"/>
          
          {/* this line using for Email */}
        <label className={style.label}>Email</label>
        <br/>
        <label className={style.error}>{formErrors.email}</label>
          <input type="text"
          value={email}onChange={(e) => setEmail(e.target.value)}placeholder="Email"/>
          
          
          {/* this line using for Password */}
          <label className={style.label}>Password</label>
          <br/>
          <label className={style.error}>{formErrors.password}</label>
          <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"/>
          
          <div>
          <div style={{ display: 'inline-flex' }}>
            <input type="checkbox" checked={showPassword} onChange={handleCheckboxChange}  style={{ transform: 'scale(0.6)' }}/>
            <label> Show Password</label></div>
        </div>

        </div>
          <button type ="submit">Save</button>
          <button type ="submit" onClick={handleCancel}>Cancel</button>
          
        </form>
      </div>
    </div>
  )
}

export default Register