import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import api from "../config/api";

const SuccessPage = () => {
  const [paymentStatus, setPaymentStatus] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const sessionId = new URLSearchParams(location.search).get("session_id");

    if (sessionId) {
      const fetchStatus = async () => {
        try {
          const res = await api.get(
            `/api/order/payment-status?session_id=${sessionId}`
          );
          const resData = res.data;
          setPaymentStatus(resData);
          localStorage.removeItem("cart");
        } catch (error) {
          console.error("Error fetching payment status:", error);
        }
      };

      fetchStatus();
    }
  }, [location]);

  if (!paymentStatus) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 max-w-140 mx-auto bg-green-100 rounded shadow mt-4">
      <h1 className="text-2xl font-bold text-green-700">
        🎉 Payment Successful!
      </h1>
      <p className="mt-2">
        Thank you for your purchase, {paymentStatus.customer_email}!
      </p>
      <p className="mt-1">
        Your order total was{" "}
        <strong>£{(paymentStatus.amount_total / 100).toFixed(2)}</strong>.
      </p>
      <p>
        Status:{" "}
        <span className="font-semibold">{paymentStatus.payment_status}</span>
      </p>
      <div className="flex items-center px-4 py-1 bg-green-500 rounded-full mt-4 hover:bg-green-600">
        <Link to="/" className="w-full text-white text-center font-semibold ">
          Home
        </Link>
      </div>
    </div>
  );
};

export default SuccessPage;
