import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRouter = () => {
  const userInfo = sessionStorage.getItem("accessToken");

  return userInfo ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRouter;