import React from "react";
import { Navigate } from "react-router-dom";
function ProtectedSignedIn({ isAdmin, isSignedIn, children }) {
  if (!isSignedIn && !isAdmin) {
    //admin also has access to signed in levels
    return <Navigate to="/login" replace />;
  }
  return children;
}
export default ProtectedSignedIn;
