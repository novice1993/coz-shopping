import { configureStore } from "@reduxjs/toolkit";
import { bookmarkReducer } from "./Bookmark-Reducer";

const store = configureStore({
    reducer:{
        bookmarkList: bookmarkReducer,
    }
});

export default store;