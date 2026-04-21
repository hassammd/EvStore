import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  loading: false,
  error: null,
};

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.cart.find((items) => items.id === newItem.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cart.push({ ...newItem, quantity: 1 });
      }
    },
    increaseQty: (state, action) => {
      const currentItem = state.cart.find((item) => item.id === action.payload);
      if (currentItem) {
        currentItem.quantity += 1;
      }
    },
    decreaseQty: (state, action) => {
      const currentItem = state.cart.find(
        (items) => items.id === action.payload,
      );
      if (currentItem && currentItem.quantity > 1) {
        currentItem.quantity -= 1;
      }
    },
    removeItem: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },
    clearCart: (state, action) => {
      state.cart = [];
    },
  },
});

export const { addToCart, increaseQty, decreaseQty, removeItem, clearCart } =
  CartSlice.actions;
export default CartSlice.reducer;
