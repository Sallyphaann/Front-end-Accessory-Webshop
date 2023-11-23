import React, { useState, useEffect, Fragment } from 'react';
import TokenManager from '../apis/TokenManager';
import CustomerAPI from '../apis/CustomerAPI';
import { useNavigate } from 'react-router-dom';
import ReadOnlyProfile from './ReadOnlyProfile';
import EditProfile from './EditProfile';
import Navibar from '../Components/Navbar';



const Profile = (test) => {

  const [editProfile, setEditProfile] = useState(null);
  const [claims, setClaims] = useState(TokenManager.getClaims());
  const navigate = useNavigate();
  const [customerDetail, setCustomerDetail] = useState('');
  

  const handleCancelClick = () => {
    setEditProfile(null);
  };

  const handleEditClick = (event, customerDetail) => {
    event.preventDefault();
    setEditProfile(customerDetail.id);
    const formValues = {
      firstname: customerDetail.firstname,
      lastname: customerDetail.lastname,
      email: customerDetail.email,
      address: customerDetail.address,
      phoneNumber : customerDetail.phoneNumber,
    };
    setEditFormData(formValues);
  };
  const [editFormData, setEditFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    address: '',
    phoneNumber:'',
  });

  // using to update of customer 
  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedCustomer = {
      id: editProfile,
      firstname: editFormData.firstname,
      lastname: editFormData.lastname,
      email: editFormData.email,
      address: editFormData.address,
      phoneNumber: editFormData.phoneNumber
    };
    CustomerAPI.updateCustomer(editedCustomer.id, editedCustomer)
    .then((response) => {
        console.log('Customer updated successfully:', response);
        alert('Customer updated successfully');
        const updatedClaims = { ...claims, sub: editedCustomer.firstname };
        setClaims(updatedClaims);
        window.location.reload();
        
      })
      .catch((error) => console.log(error));
  };
  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute('name');
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };
 
  
  
  const getCustomerDetail = async () => {
    if (claims?.roles?.includes('CUSTOMER') && claims?.customerId) {
      CustomerAPI.getCustomer(claims.customerId)
      .then(response => 
        setCustomerDetail(response)
        /* localStorage.setItem("users", JSON.stringify(response));
      } */)

      
        
      .catch(error => console.error(error));
    }
    else{
      CustomerAPI.getCustomer(claims.customerId)
      .then(response => 
        setCustomerDetail(response))
      .catch(error => console.error(error));
      navigate("/productmanagement")
    }
  };
  useEffect(() => {
    getCustomerDetail();
  }, [claims]);
 
  
  return (
    <>
    
    <form onSubmit={handleEditFormSubmit}>
          <div>
              <div className="container bootstrap snippets bootdey">
                  <h1
                      className="d-flex align-items-center justify-content-center"
                      style={{ height: '10vh', color: 'rgb(243, 158, 74)' }}
                  >
                      Profile
                  </h1>
                  <hr />
                  <div className="row">
                      <div className="col-md-3">
                          <div className="text-center">
                              <img
                                  src="https://png.pngtree.com/png-vector/20191110/ourmid/pngtree-avatar-icon-profile-icon-member-login-vector-isolated-png-image_1978396.jpg"
                                  className="avatar img-circle img-thumbnail"
                                  alt="avatar" />
                          </div>
                      </div>

                      <div className="col-md-9 personal-info">
                          <h3>Personal info</h3>

                          <Fragment>
                              {editProfile === customerDetail.id ? (
                                  <EditProfile
                                      editFormData={editFormData}
                                      handleEditFormChange={handleEditFormChange}
                                      handleCancelClick={handleCancelClick} />
                              ) : (
                                  <ReadOnlyProfile
                                      customerDetail={customerDetail}
                                      handleEditClick={handleEditClick} />
                              )}
                          </Fragment>
                      </div>
                  </div>
              </div>
          </div>
      </form></>
  );
};

export default Profile;
