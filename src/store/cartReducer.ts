import { createSlice } from "@reduxjs/toolkit";
import { clothes } from "component/Main/Peed/Peed";

interface cart {
  loginSuccess: boolean;
  item: clothes[];
}

const initialState: cart = {
  loginSuccess: false,
  item: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCart(state, action) {
      if (state.loginSuccess === true) {
        state.item.push(action.payload);
      }
    },
  },
});

export const cartReducers = cartSlice.reducer;
