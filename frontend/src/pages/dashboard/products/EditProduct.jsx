import React, { useEffect, useState } from "react";
import {
  updateProductSuccess,
  setError,
  setLoading,
} from "../../../redux/features/productSlice";
import { useDispatch, useSelector } from "react-redux";
import api from "../../../config/api";
import { useParams } from "react-router";

const EditProduct = ({ setOpenUpdate, productId }) => {
  const [product, setProduct] = useState({});
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);
  const token = localStorage.getItem("token");

  // Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/api/products/${productId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProduct(res.data);
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const updateProduct = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await api.put(
        `/api/products/update-product/${productId}`,
        product,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(updateProductSuccess(res.data));
      dispatch(setLoading(false));
      setOpenUpdate(false);
      window.location.href = window.location.href;
    } catch (error) {
      dispatch(setLoading(false));
      dispatch(setError(true));
      console.error(error.message);
    }
  };
  return (
    <div className="absolute top-0 right-0 z-40 left-0 flex flex-col items-center w-full p-4 lg:w-1/2 justify-center mx-auto mt-4  bg-gradient-to-r rounded-xl from-purple-300 to-blue-300">
      <form
        onSubmit={updateProduct}
        action=""
        className="w-full items-center flex flex-col space-y-4"
      >
        <div className="flex flex-col space-y-1.5 w-full">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={product.title || ""}
            onChange={handleChange}
            className="py-1 px-2 rounded-md outline-none focus:ring-1 focus:ring-purple-700 ring ring-purple-100"
          />
        </div>
        <div className="flex flex-col lg:flex-row gap-6 w-full">
          <div className="flex flex-col space-y-1.5 w-full">
            <label>Price</label>
            <input
              type="text"
              name="price"
              value={product.price || ""}
              onChange={handleChange}
              className="py-1 px-2 rounded-md outline-none focus:ring-1 focus:ring-purple-700 ring ring-purple-100"
            />
          </div>
          <div className="flex flex-col space-y-1.5 w-full">
            <label>Category</label>
            <input
              type="text"
              name="category"
              value={product.category || ""}
              onChange={handleChange}
              className="py-1 px-2 rounded-md outline-none focus:ring-1 focus:ring-purple-700 ring ring-purple-100"
            />
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-6 w-full">
          <div className="flex flex-col space-y-1.5 w-full">
            <label>Brand</label>
            <input
              type="text"
              name="brand"
              value={product.brand || ""}
              onChange={handleChange}
              className="py-1 px-2 rounded-md outline-none focus:ring-1 focus:ring-purple-700 ring ring-purple-100"
            />
          </div>
          <div className="flex flex-col space-y-1.5 w-full">
            <label>Color</label>
            <input
              type="text"
              name="color"
              value={product.color || ""}
              onChange={handleChange}
              className="py-1 px-2 rounded-md outline-none focus:ring-1 focus:ring-purple-700 ring ring-purple-100"
            />
          </div>
          <div className="flex flex-col space-y-1.5 w-full">
            <label>Model</label>
            <input
              type="text"
              name="model"
              value={product.model || ""}
              onChange={handleChange}
              className="py-1 px-2 rounded-md outline-none focus:ring-1 focus:ring-purple-700 ring ring-purple-100"
            />
          </div>
        </div>
        <div className="flex flex-col space-y-1.5 w-full">
          <label>Description</label>
          <textarea
            type="text"
            name="description"
            value={product.description || ""}
            onChange={handleChange}
            className="py-1 px-2 rounded-md outline-none focus:ring-1 focus:ring-purple-700 ring ring-purple-100"
          />
        </div>
        <div className="flex flex-col space-y-1.5 w-full">
          <label>Image</label>
          <input
            type="text"
            name="image"
            value={product.image || ""}
            onChange={handleChange}
            className="py-1 px-2 rounded-md outline-none focus:ring-1 focus:ring-purple-700 ring ring-purple-100"
          />
        </div>
        <div className="flex w-full justify-end p-4 mt-2">
          <button
            // onClick={() => setOpenUpdate(false)}
            type="submit"
            className="px-6 py-2 bg-purple-500 rounded-2xl text-white font-semibold cursor-pointer hover:bg-purple-700"
          >
            {loading ? "updating..." : "update"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
