import { styled } from "styled-components";
import { useState, useEffect } from "react";
import Modal from "./Modal";


// 전체 type 공통 적용
const ContentContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

const ImgContainer = styled.div`
    position: relative;
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

function BookmarkItem ({ bookmarkItem, bookmark_List, setBookmark_List, bookmarkPage_Items, setBookmarkPage}) {

    const [bookmark, setBookmark] = useState(true); // 아이템 북마크 여부
    const [modal, setModal] = useState(false); // 모달창 on/off 


    const bookmarkButtonClick = () => { 
        setBookmark(!bookmark);
    }

    const modalButtonClick = () => {
        setModal(!modal);
    }


    useEffect(() => {
        if(!bookmark){
            setBookmark_List(bookmark_List.filter((item) => {
                return item.id !== bookmarkItem.id
            }))

            if(bookmarkPage_Items !== undefined ){ // 북마크 리스트 페이지에서 화면에 표시되는 데이터 갱신
                setBookmarkPage(bookmarkPage_Items.filter((item) => {
                    return item.id !== bookmarkItem.id
                }))
            }
        }
    }, [bookmark]) // 북마크에 변화 (버튼 클릭) -> 화면 렌더링에 관여하는 데이터를 갱신 (해당 화면에서는 갱신 ok)

    useEffect(() => {
        const bookmarkData = JSON.stringify(bookmark_List) // 로컬 스토리지에 저장
        localStorage.setItem('bookmark', bookmarkData);

    }, [bookmark_List])

    return (
        <>
        {(modal) && <Modal item={bookmarkItem} setModal={setModal} bookmark={bookmark} setBookmark={setBookmark}/>}
        {(bookmarkItem.type === 'Product') && ( // product type
            <div onClick={modalButtonClick}>
                <Img src={bookmarkItem.image_url}/>
                <BookmarkButton onClick={(event) => {
                    event.stopPropagation();
                    bookmarkButtonClick()}} bookmark={bookmark}>&#9733;</BookmarkButton>
                <ContentContainer>
                    <Title>{bookmarkItem.title}</Title>
                    <DiscountPer>{(bookmarkItem.discountPercentage !== null) && `${bookmarkItem.discountPercentage}%`}</DiscountPer>
                </ContentContainer>
                <Price>{parseInt(bookmarkItem.price).toLocaleString()}원</Price>
            </div>
        )}

        {(bookmarkItem.type === 'Category') && ( // Category type
            <div onClick={modalButtonClick}>
                <Img src={bookmarkItem.image_url}/>
                <BookmarkButton onClick={(event) => {
                    event.stopPropagation();
                    bookmarkButtonClick()}} bookmark={bookmark}>&#9733;</BookmarkButton>
                <Title># {bookmarkItem.title}</Title>
            </div>
        )}
        
        {(bookmarkItem.type === 'Exhibition') && ( // Exhibition type
            <div onClick={modalButtonClick}>
                <Img src={bookmarkItem.image_url}/>
                <BookmarkButton onClick={(event) => {
                    event.stopPropagation();
                    bookmarkButtonClick()}} bookmark={bookmark}>&#9733;</BookmarkButton>
                <Title>{bookmarkItem.title}</Title>
                <SubTitle>{bookmarkItem.sub_title}</SubTitle>
            </div>
        )}
        
        {(bookmarkItem.type === 'Brand') && ( // Brand type
            <div onClick={modalButtonClick}>
                <Img src={bookmarkItem.brand_image_url}/>
                <BookmarkButton onClick={(event) => {
                    event.stopPropagation();
                    bookmarkButtonClick()}} bookmark={bookmark}>&#9733;</BookmarkButton>
                <ContentContainer>
                    <Title>{bookmarkItem.brand_name}</Title>
                    <InterestedCustomer>관심고객수</InterestedCustomer>
                </ContentContainer>
                <Followers>{parseInt(bookmarkItem.follower).toLocaleString()}</Followers>
            </div>
        )}
        </>
    )
}

export default BookmarkItem;