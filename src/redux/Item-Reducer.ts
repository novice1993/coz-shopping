import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import ItemProps from "../models/ItemProps";

const initialState: ItemProps[] = [];

const itemSlice = createSlice({
    name: 'itemList',
    initialState: initialState,
    reducers: {
        addItemList: (state: ItemProps[], action: PayloadAction<ItemProps[]>): ItemProps[] => {

            const notOverlappingItem = action.payload.filter((item: ItemProps) => { // 데이터 중복검사 시행

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