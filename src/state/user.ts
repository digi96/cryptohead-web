import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    headProfile: null,
  },
  reducers: {
    updateProfile: (state, action) => {
      state.headProfile = action.payload;
    },
  },
});

export const { updateProfile } = userSlice.actions;
export default userSlice.reducer;
