import { createSlice } from "@reduxjs/toolkit";

const getCartKey = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user ? `cart_${user.email}` : "cart";
};

const savedCart = localStorage.getItem(getCartKey());

const cartSlice = createSlice({
  name: "cart",

  initialState: {
    items: savedCart ? JSON.parse(savedCart) : []
  },

  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      const quantity = action.payload.quantity || 1;

      if (existingItem) {
        existingItem.quantity += quantity;

        if (existingItem.quantity > existingItem.stock) {
          existingItem.quantity = existingItem.stock;
        }
      } else {
        state.items.push({
          ...action.payload,
          quantity: quantity
        });
      }

      localStorage.setItem(
        getCartKey(),
        JSON.stringify(state.items)
      );
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        (item) => item.id !== action.payload
      );

      localStorage.setItem(
        getCartKey(),
        JSON.stringify(state.items)
      );
    },

    increaseQuantity: (state, action) => {
      const item = state.items.find(
        (item) => item.id === action.payload
      );

      if (!item) return;

      if (item.quantity < item.stock) {
        item.quantity += 1;
      }

      localStorage.setItem(
        getCartKey(),
        JSON.stringify(state.items)
      );
    },

    decreaseQuantity: (state, action) => {
      const item = state.items.find(
        (item) => item.id === action.payload
      );

      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }

      localStorage.setItem(
        getCartKey(),
        JSON.stringify(state.items)
      );
    },

    clearCart: (state) => {
      state.items = [];

      localStorage.removeItem(getCartKey());
    },

    setCartItems: (state, action) => {
      state.items = action.payload;
    },

    clearCartState: (state) => {
      state.items = [];
    }
  }
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
  setCartItems,
  clearCartState
} = cartSlice.actions;

export default cartSlice.reducer;