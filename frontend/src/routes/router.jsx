import React from "react";
import { createBrowserRouter } from "react-router";
import App from "../App";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ProductsPage from "../pages/ProductsPage";
import CartPage from "../pages/CartPage";
import CheckoutPage from "../pages/CheckoutPage";
import PrivateRoute from "./privateRoute";
import SuccessPage from "../pages/SuccessPage";
import CancelPage from "../pages/CancelPage";
import AccountPage from "../pages/AccountPage";
import SingleProduct from "../pages/SingleProduct";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/products/category/:categoryName",
        element: <ProductsPage />,
      },
      {
        path: "/product/:productId",
        element: <SingleProduct />,
      },
      {
        path: "/cart-items",
        element: <CartPage />,
      },
      {
        path: "/checkout",
        element: (
          <PrivateRoute>
            <CheckoutPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/success",
        element: (
          <PrivateRoute>
            <SuccessPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/cancel",
        element: (
          <PrivateRoute>
            <CancelPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/orders",
        element: (
          <PrivateRoute>
            <AccountPage />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
