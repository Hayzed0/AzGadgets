import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import api from "../config/api";
import { loadStripe } from "@stripe/stripe-js";

const CheckoutForm = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [loading, setLoading] = useState(false);
  const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
  const user = JSON.parse(localStorage.getItem("user"));
  const { totalQuantity, totalPrice, cartItems } = useSelector(
    (state) => state.carts
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const orderDetails = {
      fullName: user.name,
      email: user.email,
      phoneNumber,
      address: { street, city, country, state, zipcode },
      totalPrice,
      totalQuantity,
      productIds: cartItems.map((item) => item._id),
    };
    try {
      const res = await api.post("/api/order/create-order", orderDetails);

      const result = await res.data;

      if (result.sessionId) {
        const stripe = await loadStripe(stripePublishableKey || "pk_test_51MH9obJmOEovfobxmpSVDwmsJwa0cA2KXi1IICFSFXZLR48kfqRYvTZjKVi0ic0yVnWMEVUT4Ijh8GNmegL5X5RA00HWsQSdG3");
        const { error } = await stripe.redirectToCheckout({
          sessionId: result.sessionId, // Redirect the user to Stripe Checkout using the session ID
        });

        localStorage.removeItem("cart")

        if (error) {
          console.error("Error during checkout:", error);
        }
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="container p-4 flex lg:items-center flex-col mx-auto bg-gradient-to-r from-purple-300 to-blue-300 inset mt-6">
      <div className="w-full items-start">
        <div className="flex flex-col items-start space-y-2 lg:m-4">
          <h1 className="text-2xl font-semibold">Free Delivery</h1>
          <p>
            Total Quantity:{" "}
            <span className="font-semibold">{totalQuantity}</span>
          </p>
          <p>
            Total Price: <span className="font-semibold">£{totalPrice}</span>
          </p>
        </div>
      </div>
      <div className="flex flex-col w-full lg:flex-row space-x-6 lg:px-6 bg-transparent lg:w-3/4 space-y-6 mt-6">
        <div className="space-y-1 w-full lg:w-1/4 ">
          <h1 className="text-2xl font-semibold">Personal Details</h1>
          <p>Please fill out all details</p>
        </div>
        <div className="flex flex-col">
          <form action="" onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col w-full space-y-0.5">
              <label htmlFor="" className="text-sm font-semibold">
                FULLNAME
              </label>
              <input
                type="text"
                value={user.name}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
                className="py-1 px-2 rounded-md outline-none focus:ring-1 focus:ring-purple-700 ring ring-purple-100"
              />
            </div>
            <div className="flex flex-col w-full space-y-0.5">
              <label htmlFor="" className="text-sm font-semibold">
                EMAIL
              </label>
              <input
                type="email"
                value={user.email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@email.com"
                className="py-1 px-2 rounded-md outline-none focus:ring-1 focus:ring-purple-700 ring ring-purple-100"
              />
            </div>
            <div className="flex flex-col w-full space-y-0.5">
              <label htmlFor="" className="text-sm font-semibold">
                PHONE NUMBER
              </label>
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="+44 (0) 7467 975672"
                className="py-1 px-2 rounded-md outline-none focus:ring-1 focus:ring-purple-700 ring ring-purple-100"
              />
            </div>
            <div className="flex flex-col space-y-6 space-x-6 lg:flex-row lg:space-y-0">
              <div className="flex flex-col w-full space-y-0.5">
                <label htmlFor="" className="text-sm font-semibold">
                  ADDRESS/STREET
                </label>
                <input
                  type="text"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  placeholder="1127A, Newyork street"
                  className="py-1 px-2 rounded-md outline-none focus:ring-1 focus:ring-purple-700 ring ring-purple-100"
                />
              </div>
              <div className="flex flex-col w-full space-y-0.5">
                <label htmlFor="" className="text-sm font-semibold">
                  CITY
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="london"
                  className="py-1 px-2 rounded-md outline-none focus:ring-1 focus:ring-purple-700 ring ring-purple-100"
                />
              </div>
            </div>
            <div className="flex flex-col space-y-6 space-x-6 lg:flex-row lg:space-y-0">
              <div className="flex flex-col w-full space-y-0.5">
                <label htmlFor="" className="text-sm font-semibold">
                  COUNTRY/REGION
                </label>
                <input
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="Country"
                  className="py-1 px-2 rounded-md outline-none focus:ring-1 focus:ring-purple-700 ring ring-purple-100"
                />
              </div>
              <div className="flex flex-col w-full space-y-0.5">
                <label htmlFor="" className="text-sm font-semibold">
                  STATE/PROVINCE
                </label>
                <input
                  type="text"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  placeholder="State"
                  className="py-1 px-2 rounded-md outline-none focus:ring-1 focus:ring-purple-700 ring ring-purple-100"
                />
              </div>
              <div className="flex flex-col w-full space-y-0.5">
                <label htmlFor="" className="text-sm font-semibold">
                  ZIPCODE
                </label>
                <input
                  type="text"
                  value={zipcode}
                  onChange={(e) => setZipcode(e.target.value)}
                  placeholder=""
                  className="py-1 px-2 rounded-md outline-none focus:ring-1 focus:ring-purple-700 ring ring-purple-100"
                />
              </div>
            </div>
            <div className="flex space-x-2">
              <input type="radio" />
              <p>
                I agree to the{" "}
                <span className="text-blue-500 underline">
                  Terms & Conditions
                </span>{" "}
                and the{" "}
                <span className="text-blue-500 underline">Shopping Policy</span>
                .
              </p>
            </div>
            <div className="flex items-center justify-center mt-6 p-2">
              <button className="bg-purple-500 cursor-pointer px-6 py-2 text-white text-xl rounded-xl hover:bg-purple-800">
                {loading ? <Loader /> : "Place Order"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
