import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import searchClothesReducer from "./searchClothes";
import staticClothesReducer from "./staticClothes";
import { cartReducers } from "./cartReducer";

const rootReducers = combineReducers({
  cart: cartReducers,
  searchDB: searchClothesReducer,
  clothesDB: staticClothesReducer,
});

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["cart", "clothesDB"],
  blacklist: ["searchDB"],
};

const persistedReducer = persistReducer(persistConfig, rootReducers);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
