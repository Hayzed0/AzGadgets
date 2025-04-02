import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { Navigate, useParams } from "react-router";
import api from "../config/api";

const PrivateRoute = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const { id } = useParams();

  const getUser = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/api/user/${id}`);
      console.log(res.data);
      setLoading(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    if (id) {
      getUser();
    }
  }, [id]);

  if (loading) {
    return <Loader />
  }

  return token ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
