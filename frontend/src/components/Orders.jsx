import React, { useEffect, useState } from "react";
import api from "../config/api";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);
  const fetchOrders = async () => {
    try {
      const res = await api.get(`/api/order/get-order/${user.email}`);
      const resData = res.data;
      setOrders(resData);
    } catch (error) {
      console.error("Something went wrong", error);
    }
  };
  const handleDeleteOrder = async (orderId) => {
    try {
      const res = await api.delete(`/api/order/delete/${orderId}`);
      Swal.fire({
        title: "Success",
        text: "Order Deleted Successfully",
        icon: "success",
      });
      window.location.reload();
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="flex flex-col p-2">
      <div className="">
        {orders.length > 0 ? (
          orders.map((order) => (
            <div key={order._id} className="flex flex-col w-full bg-gray-100">
              {order.products.map((product) => (
                <div key={product._id} className="flex items-center space-x-2">
                  <div className="w-60 h-60">
                    <img src={product.image} alt="" />
                  </div>
                  <div className="flex flex-col space-y-2 ml-4 ">
                    <h1 className="text-xs font-semibold">
                      {product.title.length > 20
                        ? product.title.slice(0, 150) + "..."
                        : product.title}
                    </h1>
                    <h1 className="text-xs font-semibold">
                      Brand: {product.brand}
                    </h1>
                    <h1 className="text-xs font-semibold">
                      Model: {product.model}
                    </h1>
                    <h1 className="text-xs font-semibold">
                      Color: {product.color}
                    </h1>
                    <h1 className="text-xs font-semibold">
                      Price: £{product.price}
                    </h1>
                  </div>
                </div>
              ))}
              <div className="flex w-full justify-end p-2">
                <button
                  onClick={() => handleDeleteOrder(order._id)}
                  className="w-30 bg-red-500 text-white hover:bg-red-700 cursor-pointer px-2 py-1 rounded-full"
                >
                  Cancel Order
                </button>
              </div>
              <div className="flex border-t-2 border-b-2 mt-4 p-4 justify-end">
                <h1>Total Price: £{order.totalPrice}</h1>
              </div>
            </div>
          ))
        ) : (
          <div>
            {" "}
            <h1>No Order found</h1>{" "}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
