import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../Firebase";

const initialState = {
  user: null,
  loading: false,
  error: null,
};

const signInUser = createAsyncThunk(
  "auth/signin",
  async (payload, { rejectWithValue }) => {
    try {
      const userSignIn = await signInWithEmailAndPassword(auth);
    } catch (error) {
      rejectWithValue("Something Went Wrong");
    }
  },
);

const SignInSlice = createSlice({
  name: "signIn",
  initialState,
  reducers: {},
  extraReducers: (addBuilder) => {
    addBuilder.addCase(signInUser.pending, (state) => {
      state.loading = true;
    });
    addBuilder.addCase(signInUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });
    addBuilder.addCase(signInUser.rejected, (state, action) => {
      state.error = action.payload;
    });
  },
});

export { signInUser };

export default SignInSlice.reducer;
