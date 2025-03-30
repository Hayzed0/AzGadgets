import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import {
  setError,
  setLoading,
  setPageIncrement,
  setProducts,
} from "../redux/features/productSlice";
import api from "../config/api";
import Loader from "./Loader";
import { addToCart } from "../redux/features/cartSlice";
import Swal from "sweetalert2"

const ProductList = () => {
  const [expanded, setExpanded] = useState(null);
  const [hasMore, setHasMore] = useState(false);
  const dispatch = useDispatch();
  const { categoryName } = useParams();
  const { products, loading, error, page } = useSelector(
    (state) => state.products
  );

  const maxLength = 200;

  useEffect(() => {
    fetchProducts(1, true);
  }, [categoryName]);

  const fetchProducts = async (currentPage, reset = false) => {
    try {
      dispatch(setLoading(true));
      const res = await api.get(
        `/api/products/category/${categoryName}?page=${currentPage}&limit=5`
      );
      if (!Array.isArray(res.data.products)) {
        throw new Error("Invalid API response: Products should be an array");
      }
      dispatch(setProducts({ products: res.data.products, reset }));
      setHasMore(res.data.hasNextPage);
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      dispatch(setError(error.message));
    }
  };

  const toggleReadMore = (productId) =>
    setExpanded(expanded === productId ? null : productId);

  const handleCartItem = (product) => {
    dispatch(addToCart(product));
    Swal.fire({
      title: "Great!",
      text: `you have Successfully add ${product.title} to your cart`,
      icon: "success"
    });
  };

  const handleLoadMore = async () => {
    const nextPage = page + 1;
    dispatch(setPageIncrement());
    await fetchProducts(nextPage);
  };
  if (loading)
    return (
      <div>
        <Loader />
      </div>
    );
  if (error) return <div>Error...</div>;

  return (
    <div className="flex flex-col gap-6 items-center p-4">
      <div className="flex flex-col gap-4">
        {products &&
          products.map((product, index) => (
            <div
              key={index}
              className="flex flex-col gap-4 lg:flex-row bg-gray-200 p-4 rounded-lg"
            >
              <div className="flex items-center justify-center w-full">
                <img src={product.image} alt="" className="object-cover w-72" />
              </div>
              <div className="w-full flex flex-col gap-4">
                <h1 className="text-xl font-bold">{product.title}</h1>
                <h1 className="text-lg">
                  color: <span className="font-semibold">{product.color}</span>
                </h1>
                <p className="">
                  {expanded === product.id
                    ? product.description
                    : `${product.description.slice(0, maxLength)}...`}
                  <button
                    onClick={() => toggleReadMore(product.id)}
                    className="text-purple-500 hover:underline mt-1 cursor-pointer ml-2"
                  >
                    {expanded ? "Read Less" : "Read More"}
                  </button>
                </p>
                <div className="flex flex-col w-full mt-auto">
                  <h1 className="font-bold text-xl">£{product.price}</h1>
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
            </div>
          ))}
      </div>
      {/* Load More Button */}
      {!loading && (
        <button
          disabled={!hasMore}
          onClick={handleLoadMore}
          className={`mt-4 px-6 py-2 rounded-lg transition ${
            hasMore
              ? "bg-purple-500 text-white hover:bg-purple-600 cursor-pointer"
              : "bg-gray-400 text-gray-700 opacity-50 cursor-not-allowed"
          }`}
        >
          Load More
        </button>
      )}
    </div>
  );
};

export default ProductList;
