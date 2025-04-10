import React, { useEffect } from "react";
import { useParams } from "react-router";
import {
  setLoading,
  setError,
  setProduct,
} from "../redux/features/productSlice";
import { useDispatch, useSelector } from "react-redux";
import api from "../config/api";
import Loader from "../components/Loader";
import { addToCart } from "../redux/features/cartSlice";
import Swal from "sweetalert2";

const SingleProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    getSingleProduct();
  }, [id]);
  const getSingleProduct = async () => {
    try {
      dispatch(setLoading(true));
      const res = await api.get(`/api/products/${id}`);
      const resData = res.data;
      dispatch(setProduct(resData));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      dispatch(setError(true));
      console.error(error.message);
    }
  };

   const handleCartItem = (product) => {
      dispatch(addToCart(product));
      Swal.fire({
        title: "Great!",
        text: `you have Successfully add ${product.title} to your cart`,
        icon: "success"
      });
    };

  if (loading)
    return (
      <div>
        <Loader />
      </div>
    );

  if (error) return <div>Error...</div>;

  return (
    <div className="flex flex-col gap-6 lg:flex-row p-2 bg-gray-200 rounded mt-2 shadow-2xl">
      <div className="flex flex-col w-full lg:w-1/2 p-2">
        <div className="flex justify-start">
          <h1 className="text-sm md:text-lg lg:text-xl font-semibold font-serif">{product.title}</h1>
        </div>
        <div className="w-auto h-auto p-3 lg:w-3/4">
          <img src={product.image} alt={product.title} />
        </div>
      </div>
      <div className="flex flex-col space-y-6 lg:w-1/2 p-2">
        <h1 className="text-sm lg:text-2xl font-semibold">£{product.price}</h1>
        <h1 className="text-sm lg:text-2xl font-semibold">
          {product.brand} - {product.model}
        </h1>
        <h1 className="text-sm lg:text-2xl font-semibold">{product.color}</h1>
        <p className="">{product.description}</p>
        <div className="flex items-center lg:w-1/2 text-center justify-center py-2 px-4 rounded-full bg-purple-500 mt-4">
          <button
            onClick={() => handleCartItem(product)}
            className="flex items-center font-semibold text-white cursor-pointer"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
