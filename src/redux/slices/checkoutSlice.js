import { createSlice } from "@reduxjs/toolkit";

const checkoutSlice = createSlice({
  name: "checkout",

  initialState: {
    item: null
  },

  reducers: {
    setCheckoutItem: (state, action) => {
      state.item = action.payload;
    },

    clearCheckoutItem: (state) => {
      state.item = null;
    }
  }
});

export const {
  setCheckoutItem,
  clearCheckoutItem
} = checkoutSlice.actions;

export default checkoutSlice.reducer;