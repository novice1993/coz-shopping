import { styled } from "styled-components";
import { useState, useEffect } from "react";
import Modal from "./Modal";

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

function BookmarkItem ({
     bookmarkItem, // 렌더링 할 개별 아이템
     bookmark_List, setBookmark_List,
     all_bookmark, filter,  // 1) 로컬 스토리지 (북마크 리스트)  2) 렌더링할 아이템 기준 index  3) 필터링 조건
    }) {

    const [bookmark, setBookmark] = useState(true); 
    const [modal, setModal] = useState(false); 

    const bookmarkButtonClick = () => {
        setBookmark(!bookmark)}

    const modalButtonClick = () => { setModal(!modal) }


    // 북마크 취소 -> 1) 로컬 스토리지 데이터 갱신  2) 전역 상태 변경 ( 북마크 리스트에서 해당 아이템 삭제 )
    useEffect(() => {

        if(!bookmark){
            
            const bookmarkData = (all_bookmark.filter((item) => item.id !== bookmarkItem.id)) // 갱신된 북마크 리스트 (북마크 해제한 아이템 제외)
            localStorage.setItem('bookmark', JSON.stringify(bookmarkData));

            // 1. MainPage의 BookmarkList에서 아이템 삭제했을 때
            if (filter === undefined) {
                setBookmark_List(bookmarkData)}

            // 2. BookmarkListPage 에서 아이템 삭제했을 때 -> filter 조건에 맞춰서 렌더링 설정
            else {
                if(filter === '' || filter === 'all'){
                    setBookmark_List(bookmarkData)
                } else {
                    const filtered_data = bookmarkData.filter((item) => item.type === filter);
                    setBookmark_List(filtered_data)}
            }

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