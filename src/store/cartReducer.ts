import { createSlice } from "@reduxjs/toolkit";
import { clothes } from "component/Main/Peed/Peed";
import { PURGE } from "redux-persist";

interface cart {
  user: string;
  item: clothes[];
}

const initialState: cart = {
  user: "",
  item: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCart(state, action) {
      const filter: clothes | undefined = state.item.find(
        (clothes) => clothes.title === action.payload.product.title
      );

      if (filter === undefined) {
        state.item.push(action.payload.product);
        state.user = action.payload.username;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => initialState);
  },
});

export const cartReducers = cartSlice.reducer;
export const { addCart } = cartSlice.actions;
