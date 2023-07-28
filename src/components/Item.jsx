import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addBookmark, deleteBookmark } from "../redux/Bookmark-Reducer";
import useManageBookmarkList from "../hooks/useManageBookmarkList";

import Modal from "./Modal";
import ItemViewerBox from "./ItemViewerBox";


function Item ({ item }) {

    const { bookmark, bookmarkStateChange } = useManageBookmarkList(item);
    const [modalState, setModalState] = useState(false);

    const modalStateChange = () => {
        setModalState(!modalState);
    }


    if(modalState === true) {

        return (
            <Modal
            item={item} 
            bookmark={bookmark}
            bookmarkStateChange={bookmarkStateChange}
            modalStateChange={modalStateChange}
            />)
    }

    else {

        return (
            <ItemViewerBox
            item={item}
            bookmark={bookmark}
            bookmarkStateChange={bookmarkStateChange}
            modalStateChange={modalStateChange}
            />)
    }

}

export default Item;