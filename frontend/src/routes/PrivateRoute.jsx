import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { Navigate, useParams, Outlet } from "react-router";
import api from "../config/api";

const PrivateRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    getCurrentUser();
  }, []);

  const getCurrentUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }
    try {
      const { data } = await api.get("/api/user", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUser(data);
    } catch (error) {
      setLoading(false);
      console.error(error.message);
    } finally {
      setLoading(false)
    }
  };

  if (loading) {
    return <Loader />;
  }

  return user ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
