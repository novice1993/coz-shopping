import { styled } from "styled-components";


const BookmarkButton = ({ bookmark, bookmarkStateChange }) => {

    const changeBookmarkState = () => {
        bookmark ? bookmarkStateChange(false) : bookmarkStateChange(true)
    }   

    return (
        <StartShapeButton
        onClick={changeBookmarkState}
        bookmark={bookmark}>
            &#9733;
        </StartShapeButton>
    )
}

export default BookmarkButton;


const StartShapeButton = styled.div`
    position: absolute;
    z-index: 50;
    transform: translate(227px, -48px);
    color: ${(props) => (props.bookmark) ? '#FFD361;' : '#DFDFDF;'};
    font-size: 1.5rem;
    cursor: pointer;
`