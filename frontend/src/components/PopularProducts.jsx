import React, { useEffect, useRef, useState } from "react";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
import { useNavigate } from "react-router";
import api from "../config/api";
import Loader from "./Loader";

const PopularProducts = () => {
  const [popularProducts, setPopularProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const scrollRef = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    fetchPopularProduct();
  }, []);
  const fetchPopularProduct = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/products?limits=10");
      const resData = res.data;
      const filterProducts = resData.filter(
        (product) => product.popular === true
      );
      setPopularProducts(filterProducts.slice(0, 20));
      setLoading(false);
    } catch (error) {
      setLoading(false);
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

  const handlePopularClick = (id) => {
    navigate(`/products/${id}`); // Navigate to product page
  };

  if (loading) {
    return (
      <div>
        <Loader />{" "}
      </div>
    );
  }

  return (
    <>
      {popularProducts && (
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
            {popularProducts.map((product, index) => (
              <div
                key={product._id}
                onClick={() => handlePopularClick(product._id)}
                className="flex flex-col gap-2 p-4 border border-gray-500 w-80 rounded-lg h-120 cursor-pointer scale-80 transition-transform transform hover:scale-100 "
              >
                <div className="w-full flex items-center justify-center ">
                  <img
                    src={product.image}
                    alt={product.model}
                    className="h-40 "
                  />
                </div>
                <div className="space-y-6">
                  <p className="text-center">{product.title}</p>
                  <h1 className="font-semibold ">{product.model}</h1>
                  <h1 className="font-semibold text-2xl">£{product.price}</h1>
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
      )}
    </>
  );
};

export default PopularProducts;
