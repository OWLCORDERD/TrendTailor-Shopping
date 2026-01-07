import { db } from "@/lib/firebase";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";

interface stateType {
  keyword: string;
  searchData: clothes[];
  searchRecommendData: clothes | null;
  currentProduct: clothes | undefined;
}

interface resultType {
  searchData: clothes[];
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

  const clothesData: clothes[] = [];

  if (resData.empty) {
    return [];
  }

  if (type === 'all') {
    resData.forEach((doc) => {
      const data = doc.data();
  
      // 사용자가 검색한 키워드가 포함된 제목 의류만 필터링
      if (data.title.includes(query)) {
        clothesData.push({
            doc_id: doc.id,
            title: data.title,
            image: data.image,
            link: data.link,
            lprice: data.lprice,
            hprice: data.hprice,
            mallName: data.mallName,
            productId: data.productId,
            productType: data.productType,
            brand: data.brand,
            maker: data.maker,
            category1: data.category1,
            category2: data.category2,
            category3: data.category3,
            category4: data.category4,
            viewCount: data.viewCount,
            likeCount: data.likeCount,
            collectedAt: data.collectedAt,
            searchStyle: data.searchStyle,
            searchCategory: data.searchCategory,
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
            doc_id: doc.id,
            title: data.title,
            image: data.image,
            link: data.link,
            lprice: data.lprice,
            hprice: data.hprice,
            mallName: data.mallName,
            productId: data.productId,
            productType: data.productType,
            brand: data.brand,
            maker: data.maker,
            category1: data.category1,
            category2: data.category2,
            category3: data.category3,
            category4: data.category4,
            viewCount: data.viewCount,
            likeCount: data.likeCount,
            collectedAt: data.collectedAt,
            searchStyle: data.searchStyle,
            searchCategory: data.searchCategory,
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
    return searchData as clothes | null;
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
