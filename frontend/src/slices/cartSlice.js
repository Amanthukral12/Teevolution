import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [] };

const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

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
      state.itemsPrice = addDecimals(
        state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
      );

      //Calculate shipping price
      state.shippingPrice = addDecimals(state.itemsPrice > 600 ? 0 : 50);
      //Calculate tax price

      state.taxPrice = addDecimals(Number(0.18 * state.itemsPrice));
      //Calculate total price
      state.totalPrice = (
        Number(state.itemsPrice) +
        Number(state.shippingPrice) +
        Number(state.taxPrice)
      ).toFixed(2);

      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
