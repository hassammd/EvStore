import { configureStore } from "@reduxjs/toolkit";
import CategorySlice from "./CategorySlice/CategorySlice";

export const Store = configureStore({
  reducer: {
    categories: CategorySlice,
  },
});
