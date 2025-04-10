import React, { useCallback, useEffect, useState } from "react";
import myLogo from "../assets/1.jpg";
import { IoLocationOutline } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";
import { IoIosSearch } from "react-icons/io";
import { Link } from "react-router";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import debounce from "lodash/debounce";
import api from "../config/api";
import SearchResult from "./SearchResult";
import { setError, setLoading } from "../redux/features/productSlice";

const Navbar = () => {
  const { cartItems, totalQuantity, totalPrice } = useSelector(
    (state) => state.carts
  );
  const { products, loading, error, page } = useSelector(
    (state) => state.products
  );
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [openResult, setOpenResult] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = async () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("cart");
    Swal.fire({
      icon: "success",
      title: "Logout Successfull",
      text: "You have successfully Logout",
    });
    window.location.reload();
    navigate("/");
  };

  const handleSearch = async (value) => {
    try {
      setLoading(true);
      setOpenResult(false);
      const res = await api.get("/api/products/");
      const resData = res.data;
      const filteredSearch = resData.filter((item) =>
        item.title.toLowerCase().includes(value.toLowerCase())
      );
      setResults(filteredSearch);
      setLoading(false);
      setOpenResult(true);
    } catch (error) {
      setLoading(false);
      setError(true);
      console.error(error.message);
    }
  };

  const debouncedSearch = useCallback(
    debounce((value) => {
      handleSearch(value);
    }, 500),
    []
  );

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setOpenResult(value.length > 0);
    debouncedSearch(value);
  };

  const handleBlur = () => {
    setOpenResult(false); // Hide results when focus is lost
  };

  const handleFocus = () => {
    setOpenResult(query.length > 0); // Show results if there's a query when focused
  };

  useEffect(() => {
    return () => {
      debouncedSearch.cancel(); // Cancel any pending debounced calls
    };
  }, [debouncedSearch]);

  return (
    <nav className="p-4 flex flex-col lg:flex-row shadow-purple-200 shadow-sm bg-[#efdff9]">
      <div className="flex w-full items-center justify-between p-2 ">
        <div className="flex flex-col w-full lg:items-center space-x-4 lg:flex-row">
          <Link to="/" className="flex justify-start">
            <img
              src={myLogo}
              alt="Nav logo"
              className="w-14 h-14 lg:w-25 lg:h-25 rounded-full"
            />
          </Link>
          <div className="hidden relative lg:flex rounded-full w-full  lg:w-1/4 bg-gray-200 ">
            <input
              type="text"
              value={query}
              onChange={handleChange}
              onFocus={handleFocus} // Show results when input is focused
              onBlur={handleBlur} // Hide results when input loses focus
              className="flex w-full rounded-full py-2 px-2 outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Search our Products"
            />
            <button className="absolute right-0 bg-purple-500 rounded-full p-3 ">
              <IoIosSearch size={16} className="text-white" />
            </button>
            <div>
              {openResult && <SearchResult results={results} query={query} />}
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex flex-col items-center">
            <IoLocationOutline size={22} />
            <p className="text-sm">stores</p>
          </div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative flex flex-col items-center cursor-pointer"
          >
            <FaUserCircle size={22} />
            <p className="text-sm">Account</p>
          </button>
          {isOpen && user && (
            <div className="absolute flex flex-col h-40 w-64 top-26 right-0 z-40 space-y-4 bg-white rounded py-6 px-4">
              <Link
                to="/orders"
                className="underline cursor-pointer font-semibold hover:text-blue-500"
              >
                Orders
              </Link>
              <div className="underline font-semibold">
                <button
                  onClick={handleLogout}
                  className="cursor-pointer hover:text-blue-500 underline"
                >
                  Logout
                </button>
              </div>
            </div>
          )}

          <Link
            to="/cart-items"
            className="relative flex flex-col items-center"
          >
            <TiShoppingCart size={22} />
            <p className="text-sm">Basket</p>
            <span className="absolute -top-4 left-6 z-10 bg-red-500 text-white rounded-full py-1 px-2 text-xs">
              {totalQuantity}
            </span>
          </Link>
        </div>
      </div>
      {/* mobile search input */}
      <div className="mb-4 mt-2 relative flex rounded-full w-full  lg:hidden bg-gray-200 ">
        <input
          type="text"
          value={query}
          onChange={handleChange}
          onFocus={handleFocus} // Show results when input is focused
          onBlur={() => setTimeout(() => setIsOpen(false), 100)}
          className="flex w-full rounded-full py-2 px-2 outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Search our Products"
        />
        <button className="absolute right-0 bg-purple-500 rounded-full p-3 ">
          <IoIosSearch size={16} className="text-white" />
        </button>
        <div>
          {openResult && <SearchResult results={results} query={query} setOpenResult={setOpenResult}/>}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
