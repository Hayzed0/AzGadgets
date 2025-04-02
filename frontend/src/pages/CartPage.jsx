import React from "react";
import { useDispatch, useSelector } from "react-redux";
import applePay from "../assets/Apple_pay.svg";
import Gpay from "../assets/Google_Pay.png";
import stripe from "../assets/stripe-product-image.webp";
import mastercard from "../assets/mastercard-logo.png";
import americaExpress from "../assets/American-Express-Color.png";
import {
  updateCart,
  addToCart,
  removeFromCart,
  clearCart,
} from "../redux/features/cartSlice";
import { Navigate, useNavigate } from "react-router";
import { MdDeleteForever } from "react-icons/md"

const paymentData = [
  { img: applePay },
  { img: Gpay },
  { img: stripe },
  { img: mastercard },
  { img: americaExpress },
];

const CartPage = () => {
  const { cartItems, totalPrice } = useSelector((state) => state.carts);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return;
    dispatch(updateCart({ id, amount: Number(newQuantity) }));
  };
  const handleRemoveCart = (id) => {
    dispatch(removeFromCart({ id }));
  };

  const checkOut = () => {
    navigate("/checkout");
  };
  return (
    <section className="flex flex-col mt-4 p-4 lg:flex-row">
      <div className="flex flex-col lg:px-3 lg:w-4/5 space-y-4 space-x-6 rounded-lg ">
        {cartItems.length === 0 ? (
          <h1>No Items added to cart</h1>
        ) : (
          cartItems.map((item) => (
            <div key={item._id} className="flex flex-col w-full lg:flex-row">
              <div className="flex flex-col bg-gray-200 lg:flex-row p-6 rounded-xl w-full">
                <div className="flex w-full items-center justify-center">
                  <img src={item.image} alt={item.title} className="w-80" />
                </div>
                <div className="mt-4 flex flex-col space-y-2 w-full">
                  <h1 className="font-semibold">{item.title}</h1>
                  <h1 className="font-semibold">Brand: {item.brand}</h1>
                  <h1 className="font-semibold">Color: {item.color}</h1>
                  <h1 className="font-semibold">Model: {item.model}</h1>
                  <input
                    type="number"
                    value={item.quantity}
                    min={1}
                    onChange={(e) =>
                      handleQuantityChange(item._id, e.target.value)
                    }
                    className=" w-20 border rounded-md p-2 cursor-pointer"
                  />
                  <h1 className="font-semibold">
                    Price:{" "}
                    <span className="text-purple-500 font-bold text-lg">
                      £{item.price}
                    </span>{" "}
                  </h1>
                </div>
                <div className="flex mt-auto">
                  <button
                    onClick={() => handleRemoveCart(item._id)}
                    className="items-center p-2 rounded-full text-red-500 font-bold cursor-pointer hover:ring-1 hover:ring-red-300"
                  >
                    <MdDeleteForever  size={30} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      {cartItems.length === 0 ? null : (
        <div className=" mt-6 flex flex-col w-full space-y-6 border-2 max-h-140 border-purple-500 rounded-xl p-6 lg:w-1/5 lg:mt-0">
          <div className="flex flex-col space-y-6">
            <h1 className="text-2xl font-semibold">
              SubTotal: <span>£{totalPrice}</span>
            </h1>
            <h3 className="text-3xl text-center text-gray-500 text-semibold">
              Free Delivery on All Items.
            </h3>
          </div>

          <div className="flex items-center justify-center mt-auto w-full">
            <button
              className="bg-purple-500 cursor-pointer hover:bg-purple-400 text-white w-full py-2 px-4 font-bold text-xl rounded-full"
              onClick={checkOut}
            >
              Checkout
            </button>
          </div>
          <div className="flex flex-col items-center">
            <h1>Pay securely with</h1>
            <div className="flex">
              {paymentData.map((data, index) => (
                <div key={index} className="flex flex-row space-x-4">
                  <img
                    src={data.img}
                    alt="items payment"
                    className="w-15 h-10 p-2"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CartPage;
