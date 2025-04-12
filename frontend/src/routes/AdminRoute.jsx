import React from 'react'
import { Navigate, Outlet } from 'react-router'

const AdminRoute = ({children}) => {
    const token = localStorage.getItem('token')
    const user = JSON.parse(localStorage.getItem('user'));
    const isAdmin = user?.isAdmin === true;
    if(!token || !isAdmin) {
        return <Navigate to="/login" replace/>
    }
  return (
    children ? children : <Outlet />
  )
}

export default AdminRoute