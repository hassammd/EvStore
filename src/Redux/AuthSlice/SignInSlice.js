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
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userSignIn = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      return {
        email: userSignIn.user.email,
      };
    } catch (error) {
      return rejectWithValue(error.code);
    }
  },
);

const SignInSlice = createSlice({
  name: "signIn",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signInUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signInUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(signInUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export { signInUser };

export default SignInSlice.reducer;
