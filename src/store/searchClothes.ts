import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { clothes } from "component/Main/Peed/Peed";

interface stateType {
  keyword: string;
  searchData: clothes[];
  currentProduct: clothes | undefined;
}

interface resultType {
  searchData: clothes[];
  searchQuery: string;
}

const initialState: stateType = {
  keyword: "",
  searchData: [],
  currentProduct: undefined,
};

const searchClothes = async (searchQuery: string) => {
  const res = await axios.get("/api/clothes", {
    params: {
      query: searchQuery,
      display: 50,
    },
    headers: {
      "X-Naver-Client-Id": process.env.NEXT_PUBLIC_NAVER_API_CLIENT_ID,
      "X-Naver-Client-Secret": process.env.NEXT_PUBLIC_NAVER_API_CLIENT_SECRET,
    },
  });

  return res.data.items;
};

const getSearchClothesAsync = createAsyncThunk(
  "api/searchClothes",
  async (searchQuery: string) => {
    const searchData = await searchClothes(searchQuery);

    return { searchData, searchQuery } as resultType;
  }
);

export const searchClothesDB = createSlice({
  name: "clothes",
  initialState,
  reducers: {
    currentSearchProduct(state, action) {
      const findIndex = state.searchData.find(
        (item) => item.productId === action.payload
      );
      state.currentProduct = findIndex;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getSearchClothesAsync.fulfilled, (state, action) => {
      /*네이버 API에서 응답값으로 전송받은 items 배열의 의류 데이터 객체 내부에서
        title 의류 제목에 문자열 내부에 태그가 포함되어있어 정규식으로 제거하는 작업 진행 */
      const replaceTxt = action.payload.searchData.map((cloth) => {
        return {
          title: cloth.title.replace(/<[^>]*>?/g, ""),
          link: cloth.link,
          image: cloth.image,
          lprice: cloth.lprice,
          hprice: cloth.hprice,
          mallName: cloth.mallName,
          productId: cloth.productId,
          productType: cloth.productType,
          brand: cloth.brand,
          maker: cloth.maker,
          category1: cloth.category1,
          category2: cloth.category2,
          category3: cloth.category3,
          category4: cloth.category4,
        };
      });

      state.searchData = replaceTxt;
      state.keyword = action.payload.searchQuery;
    });
  },
});

export default searchClothesDB.reducer;
export const { currentSearchProduct } = searchClothesDB.actions;
export { getSearchClothesAsync };
