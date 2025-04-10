import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  product: [],
  loading: false,
  page: 1,
  error: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setProducts: (state, action) => {
      if (Array.isArray(action.payload.products)) {
        state.products = action.payload.reset ? action.payload.products : [...state.products, ...action.payload.products]; // ✅ Append when not resetting
      } else {
        console.error("Invalid payload: Expected array, got", action.payload);
      }
    },
    setProduct: (state, action) => {
      state.product = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
    addProductSuccess: (state, action) => {
      state.products.push(action.payload);
    },
    updateProductSuccess: (state, action) => {
      state.products = state.products.map((product) =>
        product._id === action.payload._id ? action.payload : product
      );
    },
    deleteProductSuccess: (state, action) => {
      state.products = state.products.filter(
        (product) => product._id !== action.payload
      );
    },
    setPageIncrement: (state) => {
      state.page +=1
    }
  },
});

export const {
  setLoading,
  setProducts,
  setProduct,
  setError,
  setPageIncrement,
  addProductSuccess,
  updateProductSuccess,
  deleteProductSuccess,
} = productSlice.actions;

export default productSlice.reducer;
