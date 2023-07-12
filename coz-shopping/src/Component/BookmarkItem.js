import { styled } from "styled-components";
import { useState, useEffect } from "react";
import { useFetcher } from "react-router-dom";

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

function BookmakrItem ({ bookmarkItem, bookmark_List, setBookmark_List }) {

    const [bookmark, setBookmark] = useState(true); // 아이템 북마크 여부

    const bookmarkButtonClick = () => { 
        setBookmark(!bookmark);
    }

    useEffect(() => {
        if(!bookmark){
            setBookmark_List(bookmark_List.filter((item) => {
                return item.id !== bookmarkItem.id
            }))
        }

    }, [bookmark])

    useEffect(() => {
        const bookmarkData = JSON.stringify(bookmark_List) // 로컬 스토리지에 저장
        localStorage.setItem('bookmark', bookmarkData);

    }, [bookmark_List])

    return (
        <>
        {(bookmarkItem.type === 'Product') && ( // product type
            <div>
                <ImgContainer>
                    <Img src={bookmarkItem.image_url}/>
                    <BookmarkButton onClick={() => bookmarkButtonClick()} bookmark={bookmark}>&#9733;</BookmarkButton>
                </ImgContainer>
                <ContentContainer>
                    <Title>{bookmarkItem.title}</Title>
                    <DiscountPer>{(bookmarkItem.discountPercentage !== null) && `${bookmarkItem.discountPercentage}%`}</DiscountPer>
                </ContentContainer>
                <Price>{parseInt(bookmarkItem.price).toLocaleString()}원</Price>
            </div>
        )}

        {(bookmarkItem.type === 'Category') && ( // Category type
            <div>
                <ImgContainer>
                    <Img src={bookmarkItem.image_url}/>
                    <BookmarkButton onClick={() => bookmarkButtonClick()} bookmark={bookmark}>&#9733;</BookmarkButton>
                </ImgContainer>
                <Title># {bookmarkItem.title}</Title>
            </div>
        )}
        
        {(bookmarkItem.type === 'Exhibition') && ( // Exhibition type
            <div>
                <ImgContainer>
                    <Img src={bookmarkItem.image_url}/>
                    <BookmarkButton onClick={() => bookmarkButtonClick()} bookmark={bookmark}>&#9733;</BookmarkButton>
                </ImgContainer>
                <Title>{bookmarkItem.title}</Title>
                <SubTitle>{bookmarkItem.sub_title}</SubTitle>
            </div>
        )}
        
        {(bookmarkItem.type === 'Brand') && ( // Brand type
            <div>
                <ImgContainer>
                    <Img src={bookmarkItem.brand_image_url}/>
                    <BookmarkButton onClick={() => bookmarkButtonClick()} bookmark={bookmark}>&#9733;</BookmarkButton>
                </ImgContainer>
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

export default BookmakrItem;