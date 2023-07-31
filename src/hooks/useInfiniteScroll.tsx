import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { addItemList } from "../redux/Item-Reducer";
import getItemFromServer from "../utils/getItemFromServer";

const useInfiniteScroll = () => {

    const [loading, setLoading] = useState(false);
    const observerTargetRef = useRef(null);
    const dispatch = useDispatch();

    const callback = (entries: IntersectionObserverEntry[]) => {

        entries.forEach((entry) => {

            if(entry.isIntersecting){

                getItemFromServer(8)
                .then(itemListData => {
                    setLoading(true);
                    return itemListData
                })
                .then(itemListData => {setTimeout(() => {
                    dispatch(addItemList(itemListData))
                    setLoading(false)
                }, 2000)})
            }
        })
    }

    const options = {
        threshold: 0.2,
    }

    const observer = new IntersectionObserver(callback, options);


    return { observerTargetRef, observer, loading };      
    
}


export default useInfiniteScroll;