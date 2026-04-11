import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  products: [],
  loading: false,
  error: null,
};

const fetchProductsByCat = createAsyncThunk(
  "category/product",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `https://dummyjson.com/products/category/${payload}`,
      );

      return res.data.products;
    } catch (error) {
      return rejectWithValue("something went Wrong");
    }
  },
);

const ProductByCatSlice = createSlice({
  name: "productByCat",
  initialState,
  reducers: {},
  extraReducers: (addBuilder) => {
    addBuilder.addCase(fetchProductsByCat.pending, (state, action) => {
      state.loading = true;
    });
    addBuilder.addCase(fetchProductsByCat.fulfilled, (state, action) => {
      state.products = action.payload;
    });
    addBuilder.addCase(fetchProductsByCat.rejected, (state, action) => {
      state.error = "error";
    });
  },
});

export { fetchProductsByCat };
export default ProductByCatSlice.reducer;
