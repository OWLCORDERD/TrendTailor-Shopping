import { styleKeyword } from "@/data/styleKeyword";
import forceDirectGraphRenderer from "@/lib/customRenderer";
import { db } from "@/lib/firebase";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import { useAppDispatch } from "./hooks";

export interface SimulationInstanceState {
  keywordGraphRoot: any;
}

export const initialState: SimulationInstanceState = {
  keywordGraphRoot: null,
};

// 패션 키워드별 샘플 데이터 조회
export const keywordSampleClothes = createAsyncThunk(
  "simulationInstance/getKeywordSampleClothes",
  async (__dirname, { getState, dispatch }) => {
    const state = getState() as { simulationInstance: SimulationInstanceState };
    const collectionRef = collection(db, "clothes");

    const docs = await getDocs(collectionRef);

    if (docs.empty) {
      return [];
    }

    const searchData = new Map();
    const categorySet = new Set(["상의", "하의", "아우터"]);

    styleKeyword.children.forEach(({ name: keyword, children: categories }) => {
      docs.forEach((doc) => {
        const data = doc.data();

        if (data.searchStyle !== keyword) return;
        if (!categorySet.has(data.searchCategory)) return;

        const key = `${keyword} ${data.searchCategory}`;

        let list = searchData.get(key);
        if (!list) {
          list = [];
          searchData.set(key, list);
        }

        if (list.length >= 10) return;

        const {
          title,
          image,
          link,
          lprice,
          hprice,
          mallName,
          productId,
          productType,
          brand,
          maker,
          category1,
          category2,
          category3,
          category4,
        } = data;

        list.push({
          title,
          image,
          link,
          lprice,
          hprice,
          mallName,
          productId,
          productType,
          brand,
          maker,
          category1,
          category2,
          category3,
          category4,
        });
      });

      categories.forEach((item) => {
        const key = `${keyword} ${item.name}`;
        if (searchData.has(key)) {
          item.children = searchData.get(key);
        }
      });
    });

    return styleKeyword;
  }
);

// export const newDrawRootGraph = createAsyncThunk('simulationInstance/drawNewGraph',
//   async (_, { getState, dispatch }) => {
//   const renderer = new forceDirectGraphRenderer();
//   renderer.init();
// });

const simulationInstanceSlice = createSlice({
  name: "styleSimulationInstance",
  initialState: initialState,
  reducers: {
    drawForceGraph: (state, action) => {
      const renderer = new forceDirectGraphRenderer(action.payload);

      renderer.init();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(keywordSampleClothes.fulfilled, (state, action) => {
      state.keywordGraphRoot = action.payload as any;
    });
    builder.addCase(keywordSampleClothes.rejected, (state, action) => {
      console.error("Failed to fetch keyword sample clothes:", action.error);
    });
  },
});

export default simulationInstanceSlice.reducer;
export const { drawForceGraph } = simulationInstanceSlice.actions;
