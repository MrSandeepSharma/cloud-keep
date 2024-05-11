import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  path: "root",
};

const currentFolderSlice = createSlice({
  name: "currentFolder",
  initialState,
  reducers: {
    setCurrentFolder: (state, action) => {
      state.path = action.payload;
    },
  },
});

export const { setCurrentFolder } = currentFolderSlice.actions;

export default currentFolderSlice.reducer;