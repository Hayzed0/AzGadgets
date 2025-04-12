import React, { useEffect, useState } from "react";
import api from "../../../config/api";
import Loader from "../../../components/Loader";

const ViewAllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/order", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const resData = res.data;
      setOrders(resData);
      console.log(resData);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(true);
      console.error(error.message);
    }
  };
  useEffect(() => {
    fetchOrders();
  }, []);
  return (
    <div className="w-full p-4">
      <h1 className="text-2xl font-bold mb-4">All Orders</h1>

      {loading ? (
        <Loader />
      ) : error ? (
        <p className="text-center text-red-500">Failed to load orders.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded shadow-sm">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-2 border">Full Name</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Phone</th>
                <th className="px-4 py-2 border">Street</th>
                <th className="px-4 py-2 border">City</th>
                <th className="px-4 py-2 border">State</th>
                <th className="px-4 py-2 border">Country</th>
                <th className="px-4 py-2 border">Products</th>
                <th className="px-4 py-2 border">Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">{order.fullName}</td>
                  <td className="px-4 py-2 border">{order.email}</td>
                  <td className="px-4 py-2 border">{order.phoneNumber}</td>
                  <td className="px-4 py-2 border">{order.address.street}</td>
                  <td className="px-4 py-2 border">{order.address.city}</td>
                  <td className="px-4 py-2 border">{order.address.state}</td>
                  <td className="px-4 py-2 border">{order.address.country}</td>
                  <td className="px-4 py-2 border text-sm space-y-2">
                    {order.products.map((product, idx) => (
                      <div key={idx} className="border-b pb-1">
                        <div><strong>{product.brand}</strong></div>
                        <div>{product.model}</div>
                        <div>£{product.price}</div>
                      </div>
                    ))}
                  </td>
                  <td className="px-4 py-2 border font-semibold">
                    £{order.totalPrice.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );

};

export default ViewAllOrders;
