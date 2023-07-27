import { useSelector, useDispatch } from "react-redux";
import { addItemList } from "../redux/Item-Reducer";
import getItemFromServer from "../Utils/getItemFromServer";
import { useEffect } from "react";

const useGetItemList = () => {

    const itemList = useSelector(state => state.itemList);
    const dispatch = useDispatch();
    
    useEffect(() => {

        getItemFromServer()
        .then(itemListData => dispatch(addItemList(itemListData)));

    },[])

    return itemList;
}

export default useGetItemList;