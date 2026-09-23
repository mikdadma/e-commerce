import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function AdminProtectedRoute({ children }) {
  const admin = useSelector((state) => state.admin.admin);

  if (!admin) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}

export default AdminProtectedRoute;