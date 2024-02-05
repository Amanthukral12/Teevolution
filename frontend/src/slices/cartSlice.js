import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      console.log("item", item.qty);
      const existItem = state.cartItems.find((x) => x._id === item._id);
      if (existItem) {
        console.log(existItem.qty);
        existItem.qty += item.qty;
      } else {
        state.cartItems = [...state.cartItems, item];
      }

      //Calculate items price
      updateCart(state);
    },
  },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
