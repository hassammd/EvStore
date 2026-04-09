import { configureStore } from "@reduxjs/toolkit";
import CategorySlice from "./CategorySlice/CategorySlice";
import ProductSlice from "./ProductSlice/ProductSlice";

export const Store = configureStore({
  reducer: {
    categories: CategorySlice,
    products: ProductSlice,
  },
});
