import React from "react";
import {
  FaFacebookF,
  FaXTwitter,
  FaSquareInstagram,
  FaYoutube,
} from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="p-4 flex flex-col items-center mx-auto  mt-auto bg-gray-700">
      <div className="flex flex-col lg:flex-row  items-center mx-auto lg:space-x-4 space-y-6">
        <div className="flex space-x-2 lg:my-auto">
          <div className="text-white border-r text-sm border-white px-2">
            <p>Terms & Conditions</p>
          </div>
          <div className="text-white border-r text-sm border-white px-2">
            <p>Privacy & Policy</p>
          </div>
          <div className="text-white text-sm">
            <p>Help & Support</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <button className="flex bg-gray-100 p-2 rounded-full items-center justify-center transition-transform transform hover:scale-125 cursor-pointer">
            <FaFacebookF size={20} className="" />
          </button>
          <button className="flex bg-gray-100 p-2 rounded-full items-center justify-center transition-transform transform hover:scale-125 cursor-pointer">
            <FaSquareInstagram size={20} />
          </button>
          <button className="flex bg-gray-100 p-2 rounded-full items-center justify-center transition-transform transform hover:scale-125 cursor-pointer">
            <FaXTwitter size={20} />
          </button>
          <div className="flex bg-gray-100 p-2 rounded-full items-center justify-center transition-transform transform hover:scale-125 cursor-pointer">
            <FaYoutube size={24} />
          </div>
        </div>
      </div>
      <div className="text-white mt-4 text-sm">
        <p>
          © Copyright <b>Azeez</b> All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
