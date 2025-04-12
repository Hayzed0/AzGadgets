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
import DashBoard from "../pages/dashboard/DashBoard";
import ViewAllOrders from "../pages/dashboard/orders/ViewAllOrders";
import ViewAllProducts from "../pages/dashboard/products/ViewAllProducts";
import ViewAllUsers from "../pages/dashboard/users/ViewAllUsers";
import AdminRoute from "./AdminRoute";
import DashBoardHome from "../pages/dashboard/DashBoardHome";

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
        path: "/products/:id",
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
  {
    path: "/dashboard",
    element: (
      <AdminRoute>
        <DashBoard />
      </AdminRoute>
    ),
    children: [
      {
        path: "",
        element: <DashBoardHome />,
      },
      {
        path: "all-orders",
        element: <ViewAllOrders />,
      },
      {
        path: "view-all-products",
        element: (
          <AdminRoute>
            {" "}
            <ViewAllProducts />{" "}
          </AdminRoute>
        ),
      },
      {
        path: "view-all-users",
        element: (
          <AdminRoute>
            {" "}
            <ViewAllUsers />{" "}
          </AdminRoute>
        ),
      },
    ],
  },
]);

export default router;
