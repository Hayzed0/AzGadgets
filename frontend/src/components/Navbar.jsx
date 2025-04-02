import React from "react";
import myLogo from "../assets/1.jpg";
import { IoLocationOutline } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";
import { IoIosSearch } from "react-icons/io";
import { Link } from "react-router";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { cartItems, totalQuantity, totalPrice } = useSelector((state) => state.carts);
  return (
    <nav className="p-4 flex flex-col lg:flex-row shadow-purple-200 shadow-sm bg-[#efdff9]">
      <div className="flex w-full items-center justify-between p-2 ">
        <div className="flex flex-col w-full lg:items-center space-x-4 lg:flex-row">
          <Link to="/" className="flex justify-start">
            <img
              src={myLogo}
              alt="Nav logo"
              className="w-14 h-14 lg:w-25 lg:h-25 rounded-full"
            />
          </Link>
          <div className="hidden relative lg:flex rounded-full w-full  lg:w-1/4 bg-gray-200 ">
            <input
              type="text"
              className="flex w-full rounded-full py-2 px-2 outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Search our Products"
            />
            <button className="absolute right-0 bg-purple-500 rounded-full p-3 ">
              <IoIosSearch size={16} className="text-white" />
            </button>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex flex-col items-center">
            <IoLocationOutline size={22} />
            <p className="text-sm">stores</p>
          </div>
          <div className="flex flex-col items-center">
            <FaUserCircle size={22} />
            <p className="text-sm">Account</p>
          </div>
          <Link to="/cart-items" className="relative flex flex-col items-center">
            <TiShoppingCart size={22} />
            <p className="text-sm">Basket</p>
            <span className="absolute -top-4 left-6 z-10 bg-red-500 text-white rounded-full py-1 px-2 text-xs">
              {totalQuantity}
            </span>
          </Link>
          
          
        </div>
      </div>
      {/* mobile search input */}
      <div className="mb-4 mt-2 relative flex rounded-full w-full  lg:hidden bg-gray-200 ">
        <input
          type="text"
          className="flex w-full rounded-full py-2 px-2 outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Search our Products"
        />
        <button className="absolute right-0 bg-purple-500 rounded-full p-3 ">
          <IoIosSearch size={16} className="text-white" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
