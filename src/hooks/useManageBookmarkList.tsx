import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { addBookmark, deleteBookmark } from "../reducer/Bookmark-Reducer";

import StateProps from "../models/StateProps";
import ItemProps from "../models/ItemProps";


const useManageBookmarkList = (item: ItemProps) => {


    const bookmarkList = useSelector((state: StateProps) => state.bookmarkList);
    let previousBookmarkAdded = bookmarkList.find((bookmarkItem: ItemProps) => bookmarkItem.id === item.id);

    const [bookmark, setBookmark] = useState(previousBookmarkAdded !== undefined ? true : false); // 기존에 북마크 등록된 item인지 체크 -> 기등록일 경우 true 값 부여
    const dispatch = useDispatch();
    

    const bookmarkStateChange = (state: boolean) => {
        setBookmark(state);
    }


    useEffect(() => { 

        (bookmark === true && previousBookmarkAdded === undefined) && dispatch(addBookmark(item)); // 기존 미등록건 + bookmark 상태 treu 값인 경우 => bookmarkList에 추가
        (bookmark === false) && dispatch(deleteBookmark(item));

    }, [bookmark])


    useEffect(() => {

        localStorage.setItem('bookmark', JSON.stringify(bookmarkList)); 
        (previousBookmarkAdded === undefined) && bookmarkStateChange(false); // bookmarkList에서 해제 시 -> itemList에서도 해제 관련 렌더링 작동할 수 있게끔 설정 

    }, [bookmarkList])


    return { bookmark, bookmarkStateChange };

}

export default useManageBookmarkList;