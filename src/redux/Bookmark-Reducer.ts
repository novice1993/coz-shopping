import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import ItemProps from "../models/ItemProps";


const previousAddedBookmarkList = JSON.parse(localStorage.getItem('bookmark') as string);
const initialState: ItemProps[] = previousAddedBookmarkList !== null ? previousAddedBookmarkList : [];

const bookmarkSlice = createSlice({
    name: 'bookmarkList',
    initialState: initialState,
    reducers: {
        addBookmark: (state: ItemProps[], action: PayloadAction<ItemProps>): ItemProps[] => [action.payload, ...state],
        deleteBookmark: (state: ItemProps[], action: PayloadAction<ItemProps>): ItemProps[] => state.filter((item: ItemProps) => item.id !== action.payload.id)
    }
})

export const { addBookmark, deleteBookmark } = bookmarkSlice.actions;
export const bookmarkReducer = bookmarkSlice.reducer;