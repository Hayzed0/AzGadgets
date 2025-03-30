import { createSlice } from "@reduxjs/toolkit";

const loadCartFromLocalStorage = () => {
  const savedCart = localStorage.getItem("cart");
  return savedCart
    ? JSON.parse(savedCart)
    : {
        cartItems: [],
        totalQuantity: 0,
        totalPrice: 0,
      };
};

const setCartToLocalStorage = (state) => {
  localStorage.setItem("cart", JSON.stringify(state));
};

const initialState = loadCartFromLocalStorage();

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cartItems.push({ ...action.payload, quantity: 1 });
      state.totalQuantity += 1;
      state.totalPrice += action.payload.price;

      setCartToLocalStorage(state);
    },

    removeFromCart: (state, action) => {
      const index = state.cartItems.findIndex(
        (item) => item.id === action.payload._id
      );

      if (index !== -1) {
        state.totalQuantity -= state.cartItems[index].quantity;
        state.totalPrice -=
          state.cartItems[index].quantity * state.cartItems[index].price;
        state.cartItems.splice(index, 1);
      }
      setCartToLocalStorage(state);
    },
    updateCart: (state, action) => {
      const { id, amount } = action.payload;

      state.cartItems = state.cartItems.map((item) =>
        item._id === id ? { ...item, quantity: amount } : item
      );

      state.totalQuantity = state.cartItems.reduce(
        (total, item) => total + item.quantity,
        0
      );
      state.totalPrice = state.cartItems.reduce(
        (total, item) => total + item.quantity * item.price,
        0
      );

      setCartToLocalStorage(state);
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.totalPrice = 0;
      state.totalQuantity = 0;
      setCartToLocalStorage(state);
    },
  },
});

export const { addToCart, removeFromCart, updateCart, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
