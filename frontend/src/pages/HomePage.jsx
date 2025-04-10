import React from "react";
import Banner from "../components/Banner";
import CategoriesButton from "../components/CategoriesButton";
import PopularProducts from "../components/PopularProducts";
import ProductsOnSale from "../components/ProductsOnSale";

const HomePage = () => {
  return (
    <div>
      <Banner />
      <CategoriesButton />
      <div className="text-3xl font-sans font-semibold w-full items-center flex justify-center mt-4 mb-2">
        <h1>Popular Products</h1>
      </div>
      <PopularProducts />
      <div className="text-3xl font-sans font-semibold w-full items-center flex justify-center mt-4 mb-2">
        <h1>Products on Sale</h1>
      </div>
      <ProductsOnSale />
    </div>
  );
};

export default HomePage;
