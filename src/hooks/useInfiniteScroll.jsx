import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { addItemList, itemReducer } from "../redux/Item-Reducer";
import getItemFromServer from "../utils/getItemFromServer";

const useInfiniteScroll = () => {

    const [loading, setLoading] = useState(false);
    const observerTargetRef = useRef(null);
    const dispatch = useDispatch();

    const callback = (entries) => {

        entries.forEach((entry) => {

            if(entry.isIntersecting){

                getItemFromServer()
                .then(itemReducer => {
                    setLoading(true);
                    return itemReducer
                })
                .then(itemListData => {setTimeout(() => {
                    dispatch(addItemList(itemListData))
                    setLoading(false)
                }, 1500)})
            }
        })
    }

    const options = {
        threshold: 0.8,
    }

    const observer = new IntersectionObserver(callback, options);


    return { observerTargetRef, observer, loading };      
    
}


export default useInfiniteScroll;