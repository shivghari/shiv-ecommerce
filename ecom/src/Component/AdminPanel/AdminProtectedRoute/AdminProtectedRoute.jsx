import { Navigate } from "react-router-dom";
import React from "react";

function AdminProtectedRoute({ children }) {
  if (
    JSON.parse(localStorage.getItem("token")).userID ===
    "62a41371914075fe73ccdd95"
  ) {
    return <div>{children}</div>;
  } else {
    return <Navigate to="/"></Navigate>;
  }
}
export default AdminProtectedRoute;
