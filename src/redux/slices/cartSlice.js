import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",

  initialState: {
    items: []
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
  },

    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        (item) => item.id !== action.payload
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
  },

    decreaseQuantity: (state, action) => {
      const item = state.items.find(
        (item) => item.id === action.payload
      );

      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },

    clearCart: (state) => {
          state.items = [];
    }

  }
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart
} = cartSlice.actions;

export default cartSlice.reducer;