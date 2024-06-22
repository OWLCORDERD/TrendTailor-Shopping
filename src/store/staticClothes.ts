import { createSlice } from "@reduxjs/toolkit";
import { clothes } from "component/Main/Peed/Peed";

interface initialTypes {
  trendData: clothes[];
  seasonData: clothes[];
  currentProduct: clothes | undefined;
}

const initialState: initialTypes = {
  trendData: [],
  seasonData: [],
  currentProduct: undefined,
};

const staticClothesDB = createSlice({
  name: "staticClothes",
  initialState,
  reducers: {
    currentProduct(state, action) {
      const findClothes = state.trendData.find(
        (clothes) => clothes.productId === action.payload
      );

      if (findClothes === undefined) {
        const findSeasonClothes = state.seasonData.find(
          (clothes) => clothes.productId === action.payload
        );
        state.currentProduct = findSeasonClothes;
      }

      state.currentProduct = findClothes;
    },
    trendClothesDataUpdate(state, action) {
      state.trendData = action.payload;
    },
    seasonClothesUpdate(state, action) {
      state.seasonData = action.payload;
    },
  },
});

export default staticClothesDB.reducer;
export const { currentProduct, trendClothesDataUpdate, seasonClothesUpdate } =
  staticClothesDB.actions;
