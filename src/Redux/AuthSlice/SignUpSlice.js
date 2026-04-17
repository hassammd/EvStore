import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword } from "firebase/auth";

import { auth } from "../../../Firebase";

const initialState = {
  user: null,
  loading: false,
  error: null,
};

const signUpUser = createAsyncThunk(
  "auth/signUp",
  async ({ email, password, name }, { rejectWithValue }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      console.log(userCredential);
    } catch (error) {
      console.log(error);
    }

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
  },
);

const SignUpSlice = createSlice({
  name: "SignIn",
  initialState,
  extraReducers: (addBuilder) => {
    addBuilder.addCase(signUpUser.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    addBuilder.addCase(signUpUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });
    addBuilder.addCase(signUpUser.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
  },
});

export { signUpUser };
export default SignUpSlice.reducer;
