// ProtectedRoute component
import React from "react";
import { Navigate } from "react-router-dom";
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return (
      <div>
        <Navigate to="/login" replace />;
      </div>
    );
  }
  return children;
};

export default ProtectedRoute;
