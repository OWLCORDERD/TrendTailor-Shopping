import { drawForceGraphPayload } from "@/component/Dashboard/ui/Hero";
import { styleKeyword } from "@/data/styleKeyword";
import forceDirectGraphRenderer from "@/lib/customRenderer";
import { db } from "@/lib/firebase";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
interface currentKeywordClothesType {
  type: string;
  clothes: any[];
}
export interface SimulationInstanceState {
  keywordGraphRoot: any;
  currentDetail: {
    keyword: string;
    typeOfClothes: currentKeywordClothesType[];
  } | null;
  previewOpen: boolean;
}

export const initialState: SimulationInstanceState = {
  keywordGraphRoot: null,
  currentDetail: {
    keyword: "",
    typeOfClothes: [],
  },
  previewOpen: false,
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

const simulationInstanceSlice = createSlice({
  name: "styleSimulationInstance",
  initialState: initialState,
  reducers: {
    drawForceGraph: (state, action: PayloadAction<drawForceGraphPayload>) => {
      const renderer = new forceDirectGraphRenderer(
        action.payload.keywordGraphRoot
      );

      renderer.init();

      const replaceName = (name: string) => {
        if (name.includes("상의")) {
          return "TOP";
        } else if (name.includes("하의")) {
          return "BOTTOM";
        } else if (name.includes("아우터")) {
          return "OUTER";
        } else if (name.includes("미니멀")) {
          return `MINIMAL(${name})`;
        } else if (name.includes("스트릿")) {
          return `STREET(${name})`;
        } else if (name.includes("스포츠")) {
          return `SPORTS(${name})`;
        } else if (name.includes("빈티지")) {
          return `VINTAGE(${name})`;
        } else if (name.includes("오피스")) {
          return `OFFICE(${name})`;
        }
        return name;
      };

      renderer.dispatchCallback = (node: any) => {
        const nodeDetail = {
          keyword: replaceName(node.name),
          category: node.children.map((item: any) => {
            return {
              type: replaceName(item.name),
              clothes: item.children.map((clothes: any) => {
                return clothes;
              }),
            };
          }),
        };

        if (action.payload.updateCurrentDetail) {
          action.payload.updateCurrentDetail(nodeDetail);
        }
      };
    },
    currentKeywordDetailUpdate: (state, action: any) => {
      state.currentDetail = {
        keyword: action.payload.keyword,
        typeOfClothes: action.payload.category,
      };
      state.previewOpen = true;
    },
    closeDetailPreview: (state) => {
      state.previewOpen = false;
      state.currentDetail = {
        keyword: "",
        typeOfClothes: [],
      };
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
export const {
  drawForceGraph,
  currentKeywordDetailUpdate,
  closeDetailPreview,
} = simulationInstanceSlice.actions;
