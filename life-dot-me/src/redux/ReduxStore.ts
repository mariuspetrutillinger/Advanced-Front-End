import { configureStore } from "@reduxjs/toolkit";
import mostLikedReducer from "./mostLikedReducer.ts";

const store = configureStore({
  reducer: {
    mostLiked: mostLikedReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;