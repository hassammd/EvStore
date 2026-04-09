import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// initial state
const initialState = {
  category: [],
  loading: false,
  error: null,
};
//fetch category

export const fetchCategory = createAsyncThunk(
  "category",
  async (payload, { fulfillWithValue }) => {
    try {
      const response = await axios.get(
        "https://dummyjson.com/products/categories",
      );
      const categoryList = response.data;

      const categories = Promise.all(
        categoryList.map(async (items) => {
          const productRes = await axios.get(
            `https://dummyjson.com/products/category/${items.slug}`,
          );
          const thumbnail = productRes.data.products[0].thumbnail;
          return { ...items, image: thumbnail };
        }),
      );

      return categories;
    } catch (error) {
      fulfillWithValue("Something went Wrong");
    }
  },
);

const CategorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (addBuilder) => {
    addBuilder.addCase(fetchCategory.pending, (state, action) => {
      state.loading = true;
    });
    addBuilder.addCase(fetchCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.category = action.payload;
    });
    addBuilder.addCase(fetchCategory.rejected, (state, action) => {
      state.error = action.payload;
    });
  },
});

export default CategorySlice.reducer;
