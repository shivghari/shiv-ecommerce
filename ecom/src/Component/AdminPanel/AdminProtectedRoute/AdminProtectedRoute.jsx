import { Navigate } from "react-router-dom";
import React from "react";
import { useSelector } from "react-redux";

function AdminProtectedRoute({ children }) {
  const loginUserRole = useSelector((state) => state.newUser.role);
  console.log(loginUserRole);
  if (loginUserRole === "admin") {
    return <div>{children}</div>;
  } else {
    return <Navigate to="/"></Navigate>;
  }
}
export default AdminProtectedRoute;
