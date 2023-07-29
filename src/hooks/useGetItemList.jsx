import { useSelector, useDispatch } from "react-redux";
import { addItemList } from "../redux/Item-Reducer";
import getItemFromServer from "../utils/getItemFromServer";
import { useEffect } from "react";

const useGetItemList = () => {

    const itemList = useSelector(state => state.itemList);
    const dispatch = useDispatch();
    
    useEffect(() => {

        getItemFromServer(8)
        .then(itemListData => dispatch(addItemList(itemListData)));

    },[])

    return itemList;
}

export default useGetItemList;