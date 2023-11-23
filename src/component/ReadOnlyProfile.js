import React from 'react';

const ReadOnlyProfile = ({ customerDetail, handleEditClick }) => {
  return (
    <>
      <div className="form-group">
        <label className="col-lg-3 control-label">First name:</label>
        <div className="col-lg-8">
          <input className="form-control" type="text" defaultValue={customerDetail.firstname} readOnly />
        </div>
      </div>
      <div className="form-group">
        <label className="col-lg-3 control-label">Last name:</label>
        <div className="col-lg-8">
          <input className="form-control" type="text" defaultValue={customerDetail.lastname} readOnly />
        </div>
      </div>
      <div className="form-group">
        <label className="col-lg-3 control-label">Address:</label>
        <div className="col-lg-8">
          <input className="form-control" type="text" defaultValue={customerDetail.address} readOnly />
        </div>
      </div>
      <div className="form-group">
        <label className="col-lg-3 control-label">Phone Number:</label>
        <div className="col-lg-8">
          <input className="form-control" type="text" defaultValue={customerDetail.phoneNumber} readOnly />
        </div>
      </div>
      <div className="form-group">
        <label className="col-lg-3 control-label">Email:</label>
        <div className="col-lg-8">
          <input className="form-control" type="text" defaultValue={customerDetail.email} readOnly />
        </div>
      </div>
      <div className="form-group">
        <div className="col d-flex justify-content-center m-4">
          <button className="btn btn-primary" type="button" onClick={(event) => handleEditClick(event, customerDetail)}>
            Edit
          </button>
        </div>
      </div>
    </>
  );
};

export default ReadOnlyProfile;
