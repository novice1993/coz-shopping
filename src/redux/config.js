import { configureStore } from "@reduxjs/toolkit";
import { bookmarkReducer } from "./Bookmark-Reducer";
import { itemReducer } from "./Item-Reducer";

const store = configureStore({
    reducer:{
        bookmarkList: bookmarkReducer,
        itemList: itemReducer,
    }
});

export default store;