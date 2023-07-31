import { useState, useEffect } from "react";
import ItemProps from "../models/ItemProps";

const useGetFilterdItemList = (unfilterdItemList: ItemProps[]) => {

    const [itemFilter, setItemFilter] = useState('All');
    const [filterdItemList, setFilterdItemList] = useState(unfilterdItemList);

    const itemFilterChange = (filter: string) => {
        setItemFilter(filter);
    }

    useEffect(() => {
        
        if(itemFilter === 'All'){
            setFilterdItemList(unfilterdItemList);
        } else {
            setFilterdItemList(unfilterdItemList.filter((item :ItemProps)=> item.type === itemFilter));
        }

    }, [itemFilter, unfilterdItemList])

    return { filterdItemList, itemFilterChange };

}

export default useGetFilterdItemList;