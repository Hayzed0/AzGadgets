import React, { useState } from "react";
import {
  addProductSuccess,
  setError,
  setLoading,
} from "../../../redux/features/productSlice";
import { useDispatch, useSelector } from "react-redux";
import api from "../../../config/api";

const CreateProduct = ({ setOpenCreate }) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("");
  const [model, setModel] = useState("");
  const [image, setImage] = useState("");
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.products);
  const token = localStorage.getItem("token");
  const CreateProduct = async (e) => {
    e.preventDefault();
    const data = {
      title,
      price,
      category,
      brand,
      description,
      color,
      model,
      image,
    };
    try {
      dispatch(setLoading(true));
      const res = await api.post("/api/products/create-product", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTitle("");
      setPrice("");
      setDescription("");
      setColor("");
      setCategory("");
      setModel("");
      setImage("");
      setBrand("");
      dispatch(setLoading(false));
      setOpenCreate(false)
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
        onSubmit={CreateProduct}
        action=""
        className="w-full items-center flex flex-col space-y-4"
      >
        <div className="flex flex-col space-y-1.5 w-full">
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="py-1 px-2 rounded-md outline-none focus:ring-1 focus:ring-purple-700 ring ring-purple-100"
          />
        </div>
        <div className="flex flex-col lg:flex-row gap-6 w-full">
          <div className="flex flex-col space-y-1.5 w-full">
            <label>Price</label>
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="py-1 px-2 rounded-md outline-none focus:ring-1 focus:ring-purple-700 ring ring-purple-100"
            />
          </div>
          <div className="flex flex-col space-y-1.5 w-full">
            <label>Category</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="py-1 px-2 rounded-md outline-none focus:ring-1 focus:ring-purple-700 ring ring-purple-100"
            />
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-6 w-full">
          <div className="flex flex-col space-y-1.5 w-full">
            <label>Brand</label>
            <input
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="py-1 px-2 rounded-md outline-none focus:ring-1 focus:ring-purple-700 ring ring-purple-100"
            />
          </div>
          <div className="flex flex-col space-y-1.5 w-full">
            <label>Color</label>
            <input
              type="text"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="py-1 px-2 rounded-md outline-none focus:ring-1 focus:ring-purple-700 ring ring-purple-100"
            />
          </div>
          <div className="flex flex-col space-y-1.5 w-full">
            <label>Model</label>
            <input
              type="text"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="py-1 px-2 rounded-md outline-none focus:ring-1 focus:ring-purple-700 ring ring-purple-100"
            />
          </div>
        </div>
        <div className="flex flex-col space-y-1.5 w-full">
          <label>Description</label>
          <textarea
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="py-1 px-2 rounded-md outline-none focus:ring-1 focus:ring-purple-700 ring ring-purple-100"
          />
        </div>
        <div className="flex flex-col space-y-1.5 w-full">
          <label>Image</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="py-1 px-2 rounded-md outline-none focus:ring-1 focus:ring-purple-700 ring ring-purple-100"
          />
        </div>
        <div className="flex w-full justify-end p-4 mt-2">
          <button
            className="px-6 py-2 bg-purple-500 rounded-2xl text-white font-semibold cursor-pointer hover:bg-purple-700"
          >
            {loading ? "creating..." : "create"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
