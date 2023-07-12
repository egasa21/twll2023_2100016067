import Cookies from 'js-cookie'
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ component: component, ...rest }) => {
  const token = Cookies.get('access_token');
  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;