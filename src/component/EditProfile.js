import React from 'react'

const EditProfile = ({editFormData, handleEditFormChange,handleCancelClick}) => {
  return (
       <>
       
            <div class="form-group">
              <label class="col-lg-3 control-label">First name:</label>
              <div class="col-lg-8">
              <input  className="form-control" type="text" required="required" placeholder="Enter first name..." name="firstname" value={editFormData.firstname} onChange={handleEditFormChange}></input>
              </div>
            </div>
            <div class="form-group">
              <label class="col-lg-3 control-label">Last name:</label>
              <div class="col-lg-8">
              <input className="form-control" type="text" required="required" placeholder="Enter last name..." name="lastname" value={editFormData.lastname} onChange={handleEditFormChange}></input>
              </div>
              <div class="form-group">
              <label class="col-lg-3 control-label">Address:</label>
              <div class="col-lg-8">
              <input  className="form-control" type="text" required="required" placeholder="Enter an address..." name="address" value={editFormData.address} onChange={handleEditFormChange}></input>
              </div>
            </div>
            </div>
            <div class="form-group">
              <label class="col-lg-3 control-label">Phone Number:</label>
              <div class="col-lg-8">
              <input  className="form-control" type="text" required="required" placeholder="Enter phone number" name="phoneNumber" value={editFormData.phoneNumber} onChange={handleEditFormChange}></input>
              </div>
            </div>
            <div class="form-group">
              <label class="col-lg-3 control-label" >Email:</label>
              <div class="col-lg-8">
              <input className="form-control" type="email"  value={editFormData.email} onChange={handleEditFormChange}
        ></input>
              </div>
            </div>
            
            
            <div class="form-group">
            <div className="row">
            <div class="col d-flex justify-content-center m-4" >
          <button class="btn btn-primary me-2" type="submit">Save</button>
          <button class="btn btn-primary" type="button" onClick={handleCancelClick} >Cancel</button>
          </div>
          </div>
        </div>
          
       </> 
    
  )
}

export default EditProfile