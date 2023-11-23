import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import TokenManager from "../apis/TokenManager";

const RequireAuth = () => {
    const auth = sessionStorage.getItem("accessToken");
    const claims = TokenManager.getClaims();
  
    const isAdmin = claims?.roles?.includes('ADMIN');
  
    return auth && isAdmin ? <Outlet /> : <Navigate to="/" />;
}

export default RequireAuth;