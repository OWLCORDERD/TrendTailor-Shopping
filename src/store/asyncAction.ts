import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { clothes } from "component/Main/Peed/Peed";

interface stateType {
  status: string;
  data: clothes[];
  searchData: clothes[];
  seasonData: clothes[];
  currentProduct: clothes | undefined;
  err: any;
}

const initialState: stateType = {
  status: "",
  data: [],
  searchData: [],
  seasonData: [],
  currentProduct: undefined,
  err: "",
};

const fetchClothes = async () => {
  const res = await axios.get("/api/clothes", {
    params: {
      query: "스트릿패션",
      display: 100,
    },
    headers: {
      "X-Naver-Client-Id": process.env.NEXT_PUBLIC_NAVER_API_CLIENT_ID,
      "X-Naver-Client-Secret": process.env.NEXT_PUBLIC_NAVER_API_CLIENT_SECRET,
    },
  });

  return res.data.items;
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

const getClothesAsync = createAsyncThunk("api/clothes", async () => {
  const clothesData = await fetchClothes();

  return clothesData as clothes[];
});

const getSearchClothesAsync = createAsyncThunk(
  "api/seasonClothes",
  async (searchQuery: string) => {
    const seasonClothesData = await searchClothes(searchQuery);

    return seasonClothesData as clothes[];
  }
);

export const clothesDBSlice = createSlice({
  name: "clothes",
  initialState,
  reducers: {
    currentProduct(state, action) {
      const findIndex = state.data.find(
        (item) => item.productId === action.payload
      );
      state.currentProduct = findIndex;
    },
    currentSearchProduct(state, action) {
      const findIndex = state.searchData.find(
        (item) => item.productId === action.payload
      );
      state.currentProduct = findIndex;
    },
    updateSeasonData(state, action) {
      state.seasonData = action.payload;
    },
    currentSeasonProduct(state, action) {
      const findIndex = state.seasonData.find(
        (item) => item.productId === action.payload
      );
      state.currentProduct = findIndex;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getClothesAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getClothesAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload;
      })
      .addCase(getSearchClothesAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getSearchClothesAsync.fulfilled, (state, action) => {
        /*네이버 API에서 응답값으로 전송받은 items 배열의 의류 데이터 객체 내부에서
        title 의류 제목에 문자열 내부에 태그가 포함되어있어 정규식으로 제거하는 작업 진행 */
        const replaceTxt = action.payload.map((cloth) => {
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
      });
  },
});

export default clothesDBSlice.reducer;
export const {
  currentProduct,
  currentSearchProduct,
  updateSeasonData,
  currentSeasonProduct,
} = clothesDBSlice.actions;
export { getClothesAsync, getSearchClothesAsync };
