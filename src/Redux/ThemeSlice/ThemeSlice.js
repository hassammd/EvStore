import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDark: false,
};
const ThemeSlice = createSlice({
  name: "themeToggle",
  initialState,
  reducers: {
    toggleTheme: (state, action) => {
      state.isDark = !state.isDark;
    },
  },
});

export const { toggleTheme } = ThemeSlice.actions;
export default ThemeSlice.reducer;
