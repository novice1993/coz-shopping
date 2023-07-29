import { useRef } from "react";
import { useDispatch } from "react-redux";
import { addItemList } from "../redux/Item-Reducer";
import getItemFromServer from "../utils/getItemFromServer";

const useInfiniteScroll = () => {

    const observerTargetRef = useRef(null);
    const dispatch = useDispatch();

    const callback = (entries) => {

        entries.forEach((entry) => {

            if(entry.isIntersecting){

                getItemFromServer()
                .then(itemListData => dispatch(addItemList(itemListData)));
            }
        })
    }

    const options = {
        threshold: 0.5,
    }

    const observer = new IntersectionObserver(callback, options);


    return { observerTargetRef, observer };      
    
}


export default useInfiniteScroll;