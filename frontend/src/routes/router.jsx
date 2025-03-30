

import React from 'react'
import { createBrowserRouter } from 'react-router'
import App from '../App'
import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import ProductsPage from '../pages/ProductsPage'
import CartPage from '../pages/CartPage'
import CheckoutPage from '../pages/CheckoutPage'

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
           {
            path: "/",
            element: <HomePage />
           },
           {
            path: "/login",
            element: <LoginPage />
           },
           {
            path: "/register",
            element: <RegisterPage />
           },
           {
            path: "/products/category/:categoryName",
            element: <ProductsPage />
           },
           {
            path: "/cart-items",
            element: <CartPage />
           },
           {
            path: "/checkout",
            element: <CheckoutPage />
           },
        ]
    }
])

export default router