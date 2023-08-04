import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import auth from "../../services/authService";

// const ProtectedRoute = ({ children }) => {
//   if (!auth.getCurrentUser()) {
//     return <Navigate to="/login" />;
//   }
//   return children;
// };

// export default ProtectedRoute;

const ProtectedRoute = () => {
  if (!auth.getCurrentUser()) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
