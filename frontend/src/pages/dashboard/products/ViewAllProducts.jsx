import React, { useEffect, useState } from "react";
import api from "../../../config/api";
import Loader from "../../../components/Loader";
import CreateProduct from "./CreateProduct";
import EditProduct from "./EditProduct";
import { deleteProductSuccess } from "../../../redux/features/productSlice";
import { useDispatch } from "react-redux";

const ViewAllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openCreate, setOpenCreate] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/products?limits=10", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const resData = res.data;
      setProducts(resData.slice(0, 15));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(true);
      console.error(error.message);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  const getProductToUpdate = (id) => {
    setSelectedProductId(id);
    setOpenUpdate(true);
  };

  const handleDelete = async ( productId ) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirmed) return;
    try {
      setLoading(true);
      const res = await api.delete(
        `/api/products/delete-product/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const resData = res.data;
      dispatch(deleteProductSuccess(resData));
      setLoading(false);
      window.location.href=window.location.href
    } catch (error) {
      setLoading(false);
      setError(true);
      console.error(error.message);
    }
  };

  return (
    <div className="relative w-full p-4">
      <div className="w-full flex justify-between">
        <h1 className="text-2xl font-bold mb-4">All Products</h1>
        <div>
          <button
            onClick={() => setOpenCreate(!openCreate)}
            className="px-6 py-2 rounded-2xl bg-purple-500 text-white cursor-pointer hover:bg-purple-600"
          >
            Create Product
          </button>
        </div>
      </div>

      {loading ? (
        <Loader />
      ) : error ? (
        <p className="text-center text-red-500">Failed to load orders.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded shadow-sm">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-2 border">Title</th>
                <th className="px-4 py-2 border">Price</th>
                <th className="px-4 py-2 border">Brand</th>
                <th className="px-4 py-2 border">Model</th>
                <th className="px-4 py-2 border">Category</th>
                <th className="px-4 py-2 border">Color</th>
                <th className="px-4 py-2 border">Description</th>
                <th className="px-4 py-2 border">ImageUrl</th>
                <th className="px-4 py-2 border"></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">{product.title}</td>
                  <td className="px-4 py-2 border">
                    £{product.price.toFixed(2)}
                  </td>
                  <td className="px-4 py-2 border">{product.brand}</td>
                  <td className="px-4 py-2 border">{product.model}</td>
                  <td className="px-4 py-2 border">{product.category}</td>
                  <td className="px-4 py-2 border">{product.color}</td>
                  <td className="px-4 py-2 border">{product.description}</td>
                  <td className="px-4 py-2 border">{product.image}</td>
                  <td className="px-4 py-2 space-y-3 border font-semibold">
                    <button
                      onClick={() => getProductToUpdate(product._id)}
                      className="px-4 py-2 bg-purple-500 text-white rounded-lg cursor-pointer"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="px-5 py-2 bg-red-500 text-white rounded-lg cursor-pointer"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {openCreate && (
            <CreateProduct
              openCreate={openCreate}
              setOpenCreate={setOpenCreate}
            />
          )}
          {openUpdate && selectedProductId && (
            <EditProduct
              productId={selectedProductId}
              setOpenUpdate={setOpenUpdate}
              openUpdate={openUpdate}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default ViewAllProducts;
