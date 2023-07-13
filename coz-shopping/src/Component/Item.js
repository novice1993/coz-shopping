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

function Item ({ item, bookmark_List, setBookmark_List }) {

    const [bookmark, setBookmark] = useState(false); // 아이템 북마크 여부
    const [modal, setModal] = useState(false); // 모달창 on/off 
    const check = bookmark_List.find((bookmakrItem) => bookmakrItem.id === item.id); // 기존 북마크에 포함된 정보인지 체크

    const bookmarkButtonClick = () => { 
        setBookmark(!bookmark);
    }
    
    const modalButtonClick = () => {
        setModal(true);
    }


    useEffect(() => { // 1. 서버에서 item 불러오거나, 필터링 했을 때 -> 이전에 북마크 기처리 했을 시 별표에 색상 
        (check !== undefined) && setBookmark(true);
    }, [item])


    useEffect(() => { // bookmark true일 때 -> 신규로 체크한 것만 북마크에 추가 (1번 useEffect로 인한 외부효과 방지)

        (bookmark && check === undefined) && setBookmark_List([...bookmark_List, item]);
        (!bookmark) && (setBookmark_List(bookmark_List.filter((bookmarkItem) => {return bookmarkItem.id !== item.id})));
    }, [bookmark])


    useEffect(() => { // 북마크 체크 해제 시 -> 로컬 스토리지에 기록 저장
        
        (check === undefined) && setBookmark(false)

        const bookmarData = JSON.stringify(bookmark_List)
        localStorage.setItem('bookmark', bookmarData);
    
    }, [bookmark_List])

    return (
        <>
        {(modal) && <Modal item={item} setModal={setModal} bookmark={bookmark} setBookmark={setBookmark}/>}

        {(item.type === 'Product') && ( // product type
            <div onClick={modalButtonClick}>
                <ImgContainer>
                    <Img src={item.image_url}/>
                    <BookmarkButton onClick={(event) => {
                        event.stopPropagation();
                        bookmarkButtonClick()}} bookmark={bookmark}>&#9733;</BookmarkButton>
                </ImgContainer>
                <ContentContainer>
                    <Title>{item.title}</Title>
                    <DiscountPer>{(item.discountPercentage !== null) && `${item.discountPercentage}%`}</DiscountPer>
                </ContentContainer>
                <Price>{parseInt(item.price).toLocaleString()}원</Price>
            </div>
        )}

        {(item.type === 'Category') && ( // Category type
            <div onClick={modalButtonClick}>
                <ImgContainer>
                    <Img src={item.image_url}/>
                    <BookmarkButton onClick={(event) => {
                        event.stopPropagation();
                        bookmarkButtonClick()}} bookmark={bookmark}>&#9733;</BookmarkButton>
                </ImgContainer>
                <Title># {item.title}</Title>
            </div>
        )}
        
        {(item.type === 'Exhibition') && ( // Exhibition type
            <div onClick={modalButtonClick}>
                <ImgContainer>
                    <Img src={item.image_url}/>
                    <BookmarkButton onClick={(event) => {
                        event.stopPropagation();
                        bookmarkButtonClick()}} bookmark={bookmark}>&#9733;</BookmarkButton>
                </ImgContainer>
                <Title>{item.title}</Title>
                <SubTitle>{item.sub_title}</SubTitle>
            </div>
        )}
        
        {(item.type === 'Brand') && ( // Brand type
            <div onClick={modalButtonClick}>
                <ImgContainer>
                    <Img src={item.brand_image_url}/>
                    <BookmarkButton onClick={(event) => {
                        event.stopPropagation();
                        bookmarkButtonClick()}} bookmark={bookmark}>&#9733;</BookmarkButton>
                </ImgContainer>
                <ContentContainer>
                    <Title>{item.brand_name}</Title>
                    <InterestedCustomer>관심고객수</InterestedCustomer>
                </ContentContainer>
                <Followers>{parseInt(item.follower).toLocaleString()}</Followers>
            </div>
        )}
        </>
    )
}

export default Item;