import { createSlice } from "@reduxjs/toolkit";
import { clothes } from "component/Main/Peed/Peed";

interface initialTypes {
  allData: clothes[];
  seasonData: clothes[];
  currentProduct: clothes | undefined;
}

const initialState: initialTypes = {
  allData: [],
  seasonData: [],
  currentProduct: undefined,
};

const staticClothesDB = createSlice({
  name: "staticClothes",
  initialState,
  reducers: {
    currentProduct(state, action) {
      const findAllClothes = state.allData.find(
        (clothes) => clothes.productId === action.payload
      );

      if (findAllClothes === undefined) {
        const findSeasonClothes = state.seasonData.find(
          (clothes) => clothes.productId === action.payload
        );
        state.currentProduct = findSeasonClothes;
      } else {
        state.currentProduct = findAllClothes;
      }
    },
    allClothesData(state, action) {
      state.allData = action.payload;
    },
    seasonClothesData(state, action) {
      state.seasonData = action.payload;
    },
  },
});

export default staticClothesDB.reducer;
export const { currentProduct, allClothesData, seasonClothesData } =
  staticClothesDB.actions;
