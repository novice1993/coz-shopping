import { configureStore } from "@reduxjs/toolkit";
import { bookmarkReducer } from "../reducer/Bookmark-Reducer";
import { itemReducer } from "../reducer/Item-Reducer";

const store = configureStore({
    reducer:{
        bookmarkList: bookmarkReducer,
        itemList: itemReducer,
    }
});

export default store;