import React, { useRef } from "react";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
import appliance from "../assets/appliance (1).avif";
import laptop from "../assets/laptops.avif";
import audio from "../assets/audio.avif";
import gaming from "../assets/gaming (1).avif";
import tv from "../assets/tv.avif";
import mobile from "../assets/mobile.webp";
import { useNavigate } from "react-router";

const categories = [
  {
    title: "Tv",
    img: tv,
  },
  {
    title: "Audio",
    img: audio,
  },
  {
    title: "Laptop",
    img: laptop,
  },
  {
    title: "Mobile",
    img: mobile,
  },
  {
    title: "Gaming",
    img: gaming,
  },
  {
    title: "Appliances",
    img: appliance,
  },
];

const CategoriesButton = () => {
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  // Scroll function
  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -500 : 500,
        behavior: "smooth",
      });
    }
  };

  const handleCategoryClick = (category) => {
    const formattedCategory = category.toLowerCase(); // Convert to lowercase for URL
    navigate(`/products/category/${formattedCategory}`); // Navigate to product page
  };

  return (
    <section className="relative flex items-center gap-12  mt-4 ">
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
        className="flex items-center gap-12 p-4 overflow-x-auto mt-4 no-scrollbar"
      >
        {categories.map((category, index) => (
          <button
            key={index}
            onClick={() => handleCategoryClick(category.title)}
            className="flex flex-col gap-2  items-center cursor-pointer scale-80 transition-transform transform hover:scale-100 "
          >
            <div className="flex w-60 items-center justify-center ">
              <img src={category.img} alt="categories" className="h-40 " />
            </div>
            <h1>{category.title}</h1>
          </button>
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
  );
};

export default CategoriesButton;
