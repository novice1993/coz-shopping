import { styled } from "styled-components";
import { toast } from "react-toastify";
import starYellow from '../img/bookmark-on.png';
import starGray from '../img/bookmark-off.png';

const BookmarkButton = ({ parentComponent, bookmark, bookmarkStateChange }) => {

    const notifyToastMessage = (state) => {
        const toastMessage = state ? '상품이 추가 되었습니다' : '상품이 제거 되었습니다.';
        toast(toastMessage, {closeButton: false, icon: <img src={state ? starYellow : starGray}/>});
    }

    const changeBookmarkState = (state) => {
        state = !bookmark;
        bookmarkStateChange(state);
        notifyToastMessage(state);
    }

    if(parentComponent === 'ItemViewerBox'){
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


const ButtonInItemList = styled.div`
    position: absolute;
    z-index: 50;
    transform: translate(227px, -48px);
    color: ${(props) => (props.bookmark) ? '#FFD361;' : '#DFDFDF;'};
    font-size: 1.5rem;
    cursor: pointer;
`

const ButtonInModal = styled.div`

    color: ${(props) => (props.bookmark) ? '#FFD361;' : '#DFDFDF;'};
    font-size: 1.5rem;
    cursor: pointer;

`