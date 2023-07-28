import { useState, useEffect } from "react";

const useGetFilterdItemList = (unfilterdItemList) => {

    const [itemFilter, setItemFilter] = useState('All');
    const [filterdItemList, setFilterdItemList] = useState(unfilterdItemList);

    const itemFilterChange = (filter) => {
        setItemFilter(filter);
    }

    useEffect(() => {
        
        if(itemFilter === 'All'){
            setFilterdItemList(unfilterdItemList);
        } else {
            setFilterdItemList(unfilterdItemList.filter(item => item.type === itemFilter));
        }

    }, [itemFilter])

    return { filterdItemList, itemFilterChange };

}

export default useGetFilterdItemList;