import React, { useEffect, useRef, useState } from "react";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
import { useNavigate } from "react-router";
import api from "../config/api";
import Loader from "./Loader";

const ProductsOnSale = () => {
  const [saleProducts, setSaleProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const scrollRef = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    fetchSaleProduct();
  }, []);
  const fetchSaleProduct = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/products");
      const resData = res.data;
      const filterProducts = resData.filter(
        (product) => product.onSale === true
      );
      setSaleProducts(filterProducts.slice(0, 10));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(true)
      console.error(error.message);
    }
  };

  // Scroll function
  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -500 : 500,
        behavior: "smooth",
      });
    }
  };

  const handleSaleClick = (id) => {
    navigate(`/products/${id}`); // Navigate to product page
  };

  return (
    <>
      {saleProducts.length > 0 && (
        <div className="flex flex-col w-full">
          <div className="flex w-full items-center justify-center">
            <h1 className="text-xl lg:text-3xl font-semibold">
              Products on Sale
            </h1>
          </div>
          <section className="relative flex items-center gap-12  ">
            {/* Left Scroll Button */}
            <button
              className="absolute -left-8 z-10 p-2 rounded-full shadow-md hidden md:flex cursor-pointer transition-transform transform hover:scale-125"
              onClick={() => scroll("left")}
            >
              <FaChevronCircleLeft size={25} />
            </button>
            {/* scrollable categories */}
            <div
              ref={scrollRef}
              className="flex items-center gap-2 p-4 overflow-x-auto no-scrollbar"
            >
              {saleProducts.map((product, index) => (
                <div
                  key={index}
                  onClick={() => handleSaleClick(product._id)}
                  className="flex flex-col gap-2 p-4 border border-gray-500 shadow-lg shadow-gray-500 rounded-lg h-120 cursor-pointer scale-80 transition-transform transform hover:scale-90 "
                >
                  <div className="flex flex-col w-60">
                    <div className="flex w-60 items-center justify-center mx-auto">
                      <picture>
                        <img
                          src={product.image}
                          alt={product.model || "Product image"}
                          className="object-cover w-72"
                          loading="lazy"
                        />
                      </picture>
                    </div>
                    <div className="space-y-4 mt-4">
                      <p className="text-center">{product.title}</p>
                      <h1 className="font-semibold ">{product.model}</h1>
                      <h1 className="font-semibold text-2xl">
                        £{product.price}
                      </h1>
                      <h1 className="text-red-700 font-semibold">
                        {" "}
                        save £
                        {((product.discount / 100) * product.price).toFixed(2)}
                      </h1>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Right Scroll Button */}
            <button
              className="absolute -right-8 z-10 p-2 rounded-full shadow-md hidden md:flex cursor-pointer transition-transform transform hover:scale-125"
              onClick={() => scroll("right")}
            >
              <FaChevronCircleRight size={25} />
            </button>
          </section>
        </div>
      )}
    </>
  );
};

export default ProductsOnSale;
