import {configureStore} from "@reduxjs/toolkit"
import productReducer from "./features/productSlice"
import cartReducer from "./features/cartSlice"

const store = configureStore({
    reducer: {
        products: productReducer,
        carts: cartReducer

    }
})

export default store