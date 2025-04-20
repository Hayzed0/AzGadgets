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
      <PopularProducts />
      <ProductsOnSale />
    </div>
  );
};

export default HomePage;
