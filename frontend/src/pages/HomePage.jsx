import React from "react";
import Banner from "../components/Banner";
import CategoriesButton from "../components/CategoriesButton";
import PopularProducts from "../components/PopularProducts";
import ProductsOnSale from "../components/ProductsOnSale";
import { Helmet } from "react-helmet-async";

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>Home | Az Gadgets</title>
        <meta
          name="description"
          content="Discover the latest and smartest gadgets designed to make your life easier, more fun, and more connected. Explore trending electronics, innovative tools, and smart devices — all in one place."
        />
        <meta name="keywords" content="latest gadgets, smart devices, trending tech, home automation, electronics, wearables" />
        <meta property="og:title" content="Home | Az Gadgets" />
        <meta
          property="og:description"
          content="Explore the Az Gadgets E-commerce Application."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://az-gadgets.vercel.app/" />
        <meta
          property="og:image"
          content="https://az-gadgets.vercel.app/images/1.jpg"
        />
      </Helmet>
      <div>
        <Banner />
        <CategoriesButton />
        <PopularProducts />
        <ProductsOnSale />
      </div>
    </>
  );
};

export default HomePage;
