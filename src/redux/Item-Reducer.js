import { createSlice } from "@reduxjs/toolkit";

const itemSlice = createSlice({
    name: 'itemList',
    initialState: [],
    reducers: {
        addItemList: (state, action) => {

            const notOverlappingItem = action.payload.filter((item) => {

                let result = 0;

                for(let i=0; i<state.length; i++){
                    (state[i].id === item.id) && (result += 1)
                }
                
                return (result === 0);
            })

            return [...state, ...notOverlappingItem];
        }
    }
})

export const { addItemList } = itemSlice.actions;
export const itemReducer = itemSlice.reducer;