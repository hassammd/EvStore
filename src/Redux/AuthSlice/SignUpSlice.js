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
      return {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
      };
    } catch (error) {
      rejectWithValue(error.message);
    }
  },
);

const SignUpSlice = createSlice({
  name: "SignIn",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(signUpUser.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(signUpUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(signUpUser.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
  },
});

export { signUpUser };
export default SignUpSlice.reducer;
