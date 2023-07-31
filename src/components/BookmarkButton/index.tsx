import { styled } from "styled-components";
import { toast } from "react-toastify";
import starYellow from '../../asset/bookmark-on.png';
import starGray from '../../asset/bookmark-off.png';
import React from "react";

interface OwnProps {
    parentComponent? : string,
    bookmark : boolean,
    bookmarkStateChange: (state:boolean) => void
}

const BookmarkButton = (props: OwnProps) => {

    const { parentComponent, bookmark, bookmarkStateChange } = props;

    const notifyToastMessage = (state: boolean) => {
        const toastMessage = state ? '상품이 북마크에 추가 되었습니다' : '상품이 북마크에서 제거 되었습니다.';
        toast(toastMessage, {closeButton: false, icon: <img src={state ? starYellow : starGray}/>});
    }

    const changeBookmarkState = () => {
        bookmarkStateChange(!bookmark);
        notifyToastMessage(!bookmark);
    }

    if(parentComponent === 'ItemInfoBox'){
        return (
            <ButtonInItemList
            onClick={changeBookmarkState}
            bookmark={bookmark}>
                <img src={bookmark ? starYellow : starGray}/>
            </ButtonInItemList>
        )
    }
    
    if(parentComponent === 'Modal'){
        return (
            <ButtonInModal
            onClick={changeBookmarkState}
            bookmark={bookmark}>
                {/* <img src={bookmark ? starYellow : starGray}/> */}
                &#9733;
            </ButtonInModal>
        )
    }
}

export default BookmarkButton;


interface ButtonProps {
    bookmark: boolean,
}

const ButtonInItemList = styled.div<ButtonProps>`
    position: absolute;
    z-index: 50;
    transform: translate(227px, -48px);
    color: ${(props) => (props.bookmark) ? '#FFD361;' : '#DFDFDF;'};
    font-size: 1.5rem;
    cursor: pointer;
`

const ButtonInModal = styled.div<ButtonProps>`

    color: ${(props) => (props.bookmark) ? '#FFD361;' : '#DFDFDF;'};
    font-size: 1.5rem;
    cursor: pointer;

`