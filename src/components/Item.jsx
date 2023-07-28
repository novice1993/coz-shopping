import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addBookmark, deleteBookmark } from "../redux/Bookmark-Reducer";
import Modal from "./Modal";
import ItemViewerBox from "./ItemViewerBox";


function Item ({ item }) {

    const [modalState, setModalState] = useState(false);

    const modalStateChange = () => {
        setModalState(!modalState);
    }

    const dispatch = useDispatch();

    // 2) Bookmark 관련 상태
    const bookmarkList = useSelector(state => state.bookmarkList);
    let previousBookmarkAdded = bookmarkList.find(bookmarkItem => bookmarkItem.id === item.id); 
    
    const [bookmark, setBookmark] = useState(previousBookmarkAdded !== undefined ? true : false); 
    
    const bookmarkStateChange = (state) => {
        setBookmark(state);
    }

    useEffect(() => { 

        (bookmark === true && previousBookmarkAdded === undefined) && dispatch(addBookmark(item));
        (bookmark === false) && dispatch(deleteBookmark(item));

    }, [bookmark])


    useEffect(() => {

        localStorage.setItem('bookmark', JSON.stringify(bookmarkList)); 
        (previousBookmarkAdded === 'no') && bookmarkStateChange(false); // 북마크 관련 컴포넌트에서 북마크 해제 -> 상품 리스트 컴포넌트에도 연동

    }, [bookmarkList])

    


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