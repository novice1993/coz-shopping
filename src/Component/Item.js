import { styled } from "styled-components";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addBookmark, deleteBookmark } from "../redux/Bookmark-Reducer";
import Modal from "./Modal";



function Item ({ item }) {

    const bookmarkList = useSelector(state => state.bookmarkList);
    const dispatch = useDispatch();

    let previousBookmarkAdded = bookmarkList.find(bookmakrItem => bookmakrItem.id === item.id); 
    previousBookmarkAdded !== undefined ? (previousBookmarkAdded = 'yes') : (previousBookmarkAdded = 'no');

    const [bookmark, setBookmark] = useState(previousBookmarkAdded === 'yes' ? true : false); 
    const [modal, setModal] = useState(false); 


    const bookmarkButtonClick = () => {
        setBookmark(!bookmark)
    }

    const modalButtonClick = () => { 
        setModal(true);
    }


    useEffect(() => { 

        (bookmark === true && previousBookmarkAdded === 'no') && dispatch(addBookmark(item));
        (bookmark === false) && dispatch(deleteBookmark(item));

    }, [bookmark])


    useEffect(() => {

        localStorage.setItem('bookmark', JSON.stringify(bookmarkList)); 
        (previousBookmarkAdded === 'no') && setBookmark(false) // 북마크 관련 컴포넌트에서 북마크 해제 -> 상품 리스트 컴포넌트에도 연동

    }, [bookmarkList])


    return (
        <>
        {(modal) && 
            <Modal
            item={item} setModal={setModal}
            bookmark={bookmark} setBookmark={setBookmark}/>}

        {(item.type === 'Product') && ( // product type
            <Container onClick={modalButtonClick}>
                <Img src={item.image_url}/>
                <BookmarkButton onClick={(event) => {
                    event.stopPropagation();
                    bookmarkButtonClick()}} bookmark={bookmark}>&#9733;</BookmarkButton>
                <ContentContainer>
                    <Title>{item.title}</Title>
                    <DiscountPer>{(item.discountPercentage !== null) && `${item.discountPercentage}%`}</DiscountPer>
                </ContentContainer>
                <Price>{parseInt(item.price).toLocaleString()}원</Price>
            </Container>
        )}

        {(item.type === 'Category') && ( // Category type
            <Container onClick={modalButtonClick}>
                <Img src={item.image_url}/>
                <BookmarkButton onClick={(event) => {
                    event.stopPropagation();
                    bookmarkButtonClick()}} bookmark={bookmark}>&#9733;</BookmarkButton>
                <Title># {item.title}</Title>
            </Container>
        )}
        
        {(item.type === 'Exhibition') && ( // Exhibition type
            <Container onClick={modalButtonClick}>
                <Img src={item.image_url}/>
                <BookmarkButton onClick={(event) => {
                    event.stopPropagation();
                    bookmarkButtonClick()}} bookmark={bookmark}>&#9733;</BookmarkButton>
                <Title>{item.title}</Title>
                <SubTitle>{item.sub_title}</SubTitle>
            </Container>
        )}
        
        {(item.type === 'Brand') && ( // Brand type
            <Container onClick={modalButtonClick}>
                <Img src={item.brand_image_url}/>
                <BookmarkButton onClick={(event) => {
                    event.stopPropagation();
                    bookmarkButtonClick()}} bookmark={bookmark}>&#9733;</BookmarkButton>
                <ContentContainer>
                    <Title>{item.brand_name}</Title>
                    <InterestedCustomer>관심고객수</InterestedCustomer>
                </ContentContainer>
                <Followers>{parseInt(item.follower).toLocaleString()}</Followers>
            </Container>
        )}
        </>
    )
}

export default Item;


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
    position: relative;
    z-index: -200;
    width: 264px;
    height: 210px;
    border-radius: 12px;
    border: 1px solid black;

    margin-bottom: 5px;
`

const BookmarkButton = styled.div`
    position: absolute;
    z-index: 50;
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