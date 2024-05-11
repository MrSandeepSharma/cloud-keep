import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./authSlice";
import currentFolderSlice from "./currentFolderSlice";

const store = configureStore({
    reducer: {
        auth: authSlice,
        currentFolder: currentFolderSlice
    }
})

export default store;