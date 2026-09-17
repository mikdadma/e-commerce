import { createSlice } from "@reduxjs/toolkit";

const getWishlistKey = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user ? `wishlist_${user.email}` : "wishlist";
};

const savedWishlist = localStorage.getItem(getWishlistKey());

const wishlistSlice = createSlice({
  name: "wishlist",

  initialState: {
    items: savedWishlist ? JSON.parse(savedWishlist) : []
  },

  reducers: {
    addToWishlist: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (!existingItem) {
        state.items.push(action.payload);
      }

      localStorage.setItem(
        getWishlistKey(),
        JSON.stringify(state.items)
      );
    },

    removeFromWishlist: (state, action) => {
      state.items = state.items.filter(
        (item) => item.id !== action.payload
      );

      localStorage.setItem(
        getWishlistKey(),
        JSON.stringify(state.items)
      );
    },

    setWishlistItems: (state, action) => {
      state.items = action.payload;
    },

    clearWishlistState: (state) => {
      state.items = [];
    }
  }
});

export const {
  addToWishlist,
  removeFromWishlist,
  setWishlistItems,
  clearWishlistState
} = wishlistSlice.actions;

export default wishlistSlice.reducer;