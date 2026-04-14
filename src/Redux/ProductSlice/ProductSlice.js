import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//initial State
const initialState = {
  products: [],
  loading: false,
  error: null,
};

// fetch product from dummay jason

const fetchproducts = createAsyncThunk(
  "products",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "https://dummyjson.com/products?limit=0",
      );
      console.log("this is response", response);
      return response.data.products;
    } catch (error) {
      return rejectWithValue("Something went Wrong");
    }
  },
);

const ProductSlice = createSlice({
  name: "Products",
  initialState,
  reducers: {},
  extraReducers: (addBuilder) => {
    addBuilder.addCase(fetchproducts.pending, (state, action) => {
      state.loading = true;
    });
    addBuilder.addCase(fetchproducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
    });
    addBuilder.addCase(fetchproducts.rejected, (state, action) => {
      state.error = action.payload;
    });
  },
});

export { fetchproducts };
export default ProductSlice.reducer;
