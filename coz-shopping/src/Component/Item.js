import { styled } from "styled-components";
import { useState, useEffect } from "react";
import Modal from "./Modal";

// 전체 type 공통 적용
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

function Item ({ item, bookmark_List, setBookmark_List }) {

    const [bookmark, setBookmark] = useState(false); 
    const [modal, setModal] = useState(false); 
    const check = bookmark_List.find((bookmakrItem) => bookmakrItem.id === item.id); // 이전에 북마크 등록된 아이템인지 체크

    const bookmarkButtonClick = () => { setBookmark(!bookmark); }
    const modalButtonClick = () => { setModal(true); }

    useEffect(() => { // item 정보 다시 불러왔을 때 -> 이전에 북마크 등록한 item일 경우 -> true값 부여
        (check !== undefined) && setBookmark(true)}, [item]) 


    useEffect(() => { // 북마크 신규 등록 or 해제 -> 1) 로컬 데이터 갱신  2) 북마크 전역상태 갱신

        if(bookmark === true && check === undefined){

            const newData = [...bookmark_List, item]
            localStorage.setItem('bookmark', JSON.stringify(newData));
            setBookmark_List(newData);

        } else if (bookmark === false) {
            
            const newData = bookmark_List.filter((bookmarkItem) => {return bookmarkItem.id !== item.id});
            
            // 상품 리스트에서 북마크 해제 했을 때
            if(bookmark_List.length !== newData.length){
                localStorage.setItem('bookmark', JSON.stringify(newData));
                setBookmark_List(newData)
            }
        }
    }, [bookmark])

    // 북마크 리스트에서 북마크 해제했을 때 (상품 리스트 연동 해제)
    useEffect(() => {
        (check === undefined) && setBookmark(false)}, [bookmark_List])


    return (
        <>
        {(modal) && <Modal item={item} setModal={setModal} bookmark={bookmark} setBookmark={setBookmark}/>}

        {(item.type === 'Product') && ( // product type
            <div onClick={modalButtonClick}>
                <Img src={item.image_url}/>
                <BookmarkButton onClick={(event) => {
                    event.stopPropagation();
                    bookmarkButtonClick()}} bookmark={bookmark}>&#9733;</BookmarkButton>
                <ContentContainer>
                    <Title>{item.title}</Title>
                    <DiscountPer>{(item.discountPercentage !== null) && `${item.discountPercentage}%`}</DiscountPer>
                </ContentContainer>
                <Price>{parseInt(item.price).toLocaleString()}원</Price>
            </div>
        )}

        {(item.type === 'Category') && ( // Category type
            <div onClick={modalButtonClick}>
                <Img src={item.image_url}/>
                <BookmarkButton onClick={(event) => {
                    event.stopPropagation();
                    bookmarkButtonClick()}} bookmark={bookmark}>&#9733;</BookmarkButton>
                <Title># {item.title}</Title>
            </div>
        )}
        
        {(item.type === 'Exhibition') && ( // Exhibition type
            <div onClick={modalButtonClick}>
                <Img src={item.image_url}/>
                <BookmarkButton onClick={(event) => {
                    event.stopPropagation();
                    bookmarkButtonClick()}} bookmark={bookmark}>&#9733;</BookmarkButton>
                <Title>{item.title}</Title>
                <SubTitle>{item.sub_title}</SubTitle>
            </div>
        )}
        
        {(item.type === 'Brand') && ( // Brand type
            <div onClick={modalButtonClick}>
                <Img src={item.brand_image_url}/>
                <BookmarkButton onClick={(event) => {
                    event.stopPropagation();
                    bookmarkButtonClick()}} bookmark={bookmark}>&#9733;</BookmarkButton>
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