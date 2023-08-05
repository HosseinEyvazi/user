import React from 'react'
import { Navigate } from 'react-router-dom'
function ProtectedHome({ isAdmin, children }) {
  if (!isAdmin) {
    return <Navigate to="/" replace />
  }
  return children
}
export default ProtectedHome