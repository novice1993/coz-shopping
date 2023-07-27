import { styled } from "styled-components";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteBookmark } from "../redux/Bookmark-Reducer";
import Modal from "./Modal";


function BookmarkItem ({ bookmarkItem }) {

    const bookmarkList = useSelector(state => state.bookmarkList);
    const dispatch = useDispatch();

    const [bookmark, setBookmark] = useState(true); 
    const [modal, setModal] = useState(false); 


    const bookmarkButtonClick = () => {
        setBookmark(false)
    }

    const modalButtonClick = () => {
        setModal(!modal)
    }


    useEffect(() => {

        if(bookmark === false){
            
            dispatch(deleteBookmark(bookmarkItem));
            localStorage.setItem('bookmark', JSON.stringify(bookmarkList));

        }}, [bookmark]) 
        

    return (
        <>
        {(modal) && 
            <Modal
            item={bookmarkItem} setModal={setModal}
            bookmark={bookmark} setBookmark={setBookmark}/>}

        {(bookmarkItem.type === 'Product') && ( // product type
            <Container onClick={modalButtonClick}>
                <Img src={bookmarkItem.image_url}/>
                <BookmarkButton onClick={(event) => {
                    event.stopPropagation();
                    bookmarkButtonClick()}} bookmark={bookmark}>&#9733;</BookmarkButton>
                <ContentContainer>
                    <Title>{bookmarkItem.title}</Title>
                    <DiscountPer>{(bookmarkItem.discountPercentage !== null) && `${bookmarkItem.discountPercentage}%`}</DiscountPer>
                </ContentContainer>
                <Price>{parseInt(bookmarkItem.price).toLocaleString()}원</Price>
            </Container>
        )}

        {(bookmarkItem.type === 'Category') && ( // Category type
            <Container onClick={modalButtonClick}>
                <Img src={bookmarkItem.image_url}/>
                <BookmarkButton onClick={(event) => {
                    event.stopPropagation();
                    bookmarkButtonClick()}} bookmark={bookmark}>&#9733;</BookmarkButton>
                <Title># {bookmarkItem.title}</Title>
            </Container>
        )}
        
        {(bookmarkItem.type === 'Exhibition') && ( // Exhibition type
            <Container onClick={modalButtonClick}>
                <Img src={bookmarkItem.image_url}/>
                <BookmarkButton onClick={(event) => {
                    event.stopPropagation();
                    bookmarkButtonClick()}} bookmark={bookmark}>&#9733;</BookmarkButton>
                <Title>{bookmarkItem.title}</Title>
                <SubTitle>{bookmarkItem.sub_title}</SubTitle>
            </Container>
        )}
        
        {(bookmarkItem.type === 'Brand') && ( // Brand type
            <Container onClick={modalButtonClick}>
                <Img src={bookmarkItem.brand_image_url}/>
                <BookmarkButton onClick={(event) => {
                    event.stopPropagation();
                    bookmarkButtonClick()}} bookmark={bookmark}>&#9733;</BookmarkButton>
                <ContentContainer>
                    <Title>{bookmarkItem.brand_name}</Title>
                    <InterestedCustomer>관심고객수</InterestedCustomer>
                </ContentContainer>
                <Followers>{parseInt(bookmarkItem.follower).toLocaleString()}</Followers>
            </Container>
        )}
        </>
    )
}

export default BookmarkItem;


// 전체 type 공통 적용

const Container = styled.div`
    margin-left: 45px;
    margin-right: 45px;
    margin-top: 10px;
    margin-bottom: 10px;
`

const ContentContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

const Img = styled.img`
    z-index: 0;
    width: 264px;
    height: 210px;
    border-radius: 12px;
    border: 1px solid black;

    margin-bottom: 5px;
`

const BookmarkButton = styled.div`
    position: absolute;
    transform: translate(227px, -48px);
    color: ${(props) => (props.bookmark) ? '#FFD361;' : '#DFDFDF;'};
    font-size: 1.5rem;
    cursor: pointer;
`

const Title = styled.div`
    font-weight: bolder;
`

// Product type
const Price = styled.div`
    text-align: right;
`
const DiscountPer = styled.div`
    font-weight: bolder;
    color: blue;
`
// Exhibition type 
const SubTitle = styled.div`
`

// Brand type
const InterestedCustomer = styled.div`
    font-weight: bolder;
`

const Followers = styled.div`
    text-align: right;
`