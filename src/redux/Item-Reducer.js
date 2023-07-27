import { createSlice } from "@reduxjs/toolkit";

const itemSlice = createSlice({
    name: 'itemList',
    initialState: [],
    reducers: {
        addItemList: (previousAddedItemList, action) => {

            const notOverlappingItem = action.payload.filter((item) => {

                let result = 0;

                for(let i=0; i<previousAddedItemList.length; i++){
                    (previousAddedItemList[i].id === item.id) && (result += 1)
                }
                
                return (result === 0);
            })

            return [...previousAddedItemList, ...notOverlappingItem];
        }
    }
})

export const { addItemList } = itemSlice.actions;
export const itemReducer = itemSlice.reducer;