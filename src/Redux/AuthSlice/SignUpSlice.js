import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

import { auth, db } from "../../../Firebase";
import { doc, setDoc } from "firebase/firestore";

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
      const user = userCredential.user;
      await updateProfile(user, {
        displayName: name,
      });
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: name,
        email: email,
        createdAt: new Date().toISOString(),
        role: "s",
      });

      return {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: name,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const SignUpSlice = createSlice({
  name: "SignUp",
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
