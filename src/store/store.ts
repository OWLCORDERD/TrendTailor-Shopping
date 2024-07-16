import { combineReducers, configureStore } from "@reduxjs/toolkit";
import searchClothesReducer from "./searchClothes";

/* redux toolkit combineReducers 메소드를 사용하여 reducer들을 하나의 객체로 묶음 */
const rootReducers = combineReducers({
  searchDB: searchClothesReducer,
});

export const store = configureStore({
  reducer: rootReducers,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
