import { createSlice } from "@reduxjs/toolkit";

const previousAddedBookmarkList = JSON.parse(localStorage.getItem('bookmark'));

const bookmarkSlice = createSlice({
    name: 'bookmarkList',
    initialState: previousAddedBookmarkList !== null ? previousAddedBookmarkList : [],
    reducers: {
        addBookmark: (state, action) => [action.payload, ...state],
        deleteBookmark: (state, action) => state.filter(item => item.id !== action.payload.id)
    }
})

export const { addBookmark, deleteBookmark } = bookmarkSlice.actions;
export const bookmarkReducer = bookmarkSlice.reducer;