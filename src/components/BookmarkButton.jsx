import { styled } from "styled-components";


const BookmarkButton = ({ parentComponent, bookmark, bookmarkStateChange }) => {

    const changeBookmarkState = () => {
        bookmark ? bookmarkStateChange(false) : bookmarkStateChange(true)
    }
    
    
    if(parentComponent === 'ItemViewerBox'){
        return (
            <ButtonInItemList
            onClick={changeBookmarkState}
            bookmark={bookmark}>
                &#9733;
            </ButtonInItemList>
        )
    }
    
    if(parentComponent === 'Modal'){
        return (
            <ButtonInModal
            onClick={changeBookmarkState}
            bookmark={bookmark}>
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