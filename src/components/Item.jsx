import { styled } from "styled-components";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addBookmark, deleteBookmark } from "../redux/Bookmark-Reducer";
import Modal from "./Modal";
import ItemViewerBox from "./ItemViewerBox";


// ItemList, ItemListPage에서 서버 데이터 받아서
// -> Item 컴포넌트에 개발 item 전달
// -> 일반 ItemViewerBox, Modal 관리 
//  => 둘이 공유하는 것 -> item 데이터와 북마크 

// 🔴 bookmark 상태 어디서 관리할지 (일단 보류)
// 북마크는 전역상태여야 하는가, 지역상태여야 하는가 -> 지역상태 (개별 아이템에 적용되는 것)
// 북마크 상태는 Modal과 ItemViewrBox에서 공유한다 -> 이들의 상위 컴포넌트인 Item에서 관리하는 것이 맞다
// BookmarkButton 컴포넌트에서는 어떤 로직을 처리할 것인가? => 

function Item ({ item }) {

    /// 로직을 처음부터 다시 작성해보자,, 

    // 1) Modal 관련 상태
    const [modalState, setModalState] = useState(false);
    const dispatch = useDispatch();

    const modalStateChange = () => {
        setModalState(!modalState);
    }

    // 2) Bookmark 관련 상태
    const bookmarkList = useSelector(state => state.bookmarkList);
    let previousBookmarkAdded = bookmarkList.find(bookmarkItem => bookmarkItem.id === item.id); 
    
    const [bookmark, setBookmark] = useState(previousBookmarkAdded !== undefined ? true : false); 
    
    const bookmarkStateChange = (state) => {
        setBookmark(state);
    }


    // 로직 복귀
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