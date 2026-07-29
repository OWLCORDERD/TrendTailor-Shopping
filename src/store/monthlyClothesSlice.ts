import { db } from "@/shared/lib/firebase";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";

interface stateType {
  keyword: string;
  searchData: trendClothes[];
  searchRecommendData: trendClothes | null;
  currentProduct: trendClothes | undefined;
}

interface resultType {
  searchData: trendClothes[];
  searchQuery: string;
}

const initialState: stateType = {
  keyword: "",
  searchData: [],
  searchRecommendData: null,
  currentProduct: undefined,
};

const searchClothes = async (query: string, type: string) => {
  const resData = await getDocs(collection(db, 'clothes'));

  const clothesData: trendClothes[] = [];

  if (resData.empty) {
    return [];
  }

  if (type === 'all') {
    resData.forEach((doc) => {
      const data = doc.data();
  
      // 사용자가 검색한 키워드가 포함된 제목 의류만 필터링
      if (data.title.includes(query)) {
        clothesData.push({
            title: data.title,
            image: data.image,
            link: data.link,
            price: data.price,
            productId: data.productId,
            brand: data.brand,
            viewCount: data.viewCount,
            likeCount: data.likeCount,
            genderCategory: data.genderCategory,
            category: data.category,
            keywordName: data.keywordName,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
        });
      }
    })

    return clothesData;
  } else {
    resData.forEach((doc) => {
      const data = doc.data();
  
      // 사용자가 검색한 키워드가 포함된 제목 의류만 필터링
      if (data.productId === query) {
        clothesData.push({
          title: data.title,
          image: data.image,
          link: data.link,
          price: data.price,
          productId: data.productId,
          brand: data.brand,
          viewCount: data.viewCount,
          likeCount: data.likeCount,
          genderCategory: data.genderCategory,
          category: data.category,
          keywordName: data.keywordName,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
        });
      }
    })

    return clothesData[0];
  }
};

// 2026.01.06: 의류 검색 조회
const getSearchClothes = createAsyncThunk(
  "api/searchAllClothes",
  async (searchQuery: string) => {
    const searchData = await searchClothes(searchQuery, 'all');
    return { searchData, searchQuery } as resultType;
  }
);

// 2026.01.06: 추천 의류 단일 조회
const getRecommendClothes = createAsyncThunk(
  "api/recommendClothes",
  async (productId: string) => {
    const searchData = await searchClothes(productId, 'single');
    return searchData as trendClothes | null;
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
    builder.addCase(getSearchClothes.fulfilled, (state, action) => {
      state.searchData = action.payload.searchData;
      state.keyword = action.payload.searchQuery;
    });
    builder.addCase(getRecommendClothes.fulfilled, (state, action) => {
      state.searchRecommendData = action.payload;
    });
  },
});

export default searchClothesDB.reducer;
export const { currentSearchProduct } = searchClothesDB.actions;
export { getSearchClothes, getRecommendClothes };
