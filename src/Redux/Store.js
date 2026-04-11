import { configureStore } from "@reduxjs/toolkit";
import CategorySlice from "./CategorySlice/CategorySlice";
import ProductSlice from "./ProductSlice/ProductSlice";
import ProductByCatSlice from "./ProductByCatSlice/ProductsByCatSlice";

export const Store = configureStore({
  reducer: {
    categories: CategorySlice,
    products: ProductSlice,
    productsByCat: ProductByCatSlice,
  },
});
