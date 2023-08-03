import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addItemList } from "../reducer/Item-Reducer";
import getItemFromServer from "../utils/getItemFromServer";

import StateProps from "../models/StateProps";


const useGetItemList = () => {

    const itemList = useSelector((state: StateProps) => state.itemList);
    const dispatch = useDispatch();
    
    useEffect(() => {

        getItemFromServer(8)
        .then(itemListData => dispatch(addItemList(itemListData)));

    },[])

    return itemList;
}

export default useGetItemList;