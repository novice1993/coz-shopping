import { styled } from "styled-components";
import { useState, useEffect } from "react";

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

    const bookmarkButtonClick = () => { 
        setBookmark(!bookmark);
    }

    useEffect(() => {
        (bookmark) ? setBookmark_List([...bookmark_List, item])
        : (setBookmark_List(bookmark_List.filter((bookmarkItem) => {return bookmarkItem.id !== item.id})))
    }, [bookmark])

    useEffect(() => { // 북마크 리스트에서 북마크 해제 -> 상품 리스트 버튼에서도 해제
        (bookmark_List.find((bookmakrItem) => bookmakrItem.id === item.id) === undefined) && setBookmark(false)
        
        const bookmarData = JSON.stringify(bookmark_List) // 로컬 스토리지에 저장
        localStorage.setItem('bookmark', bookmarData);
    }, [bookmark_List])

    return (
        <>
        {(item.type === 'Product') && ( // product type
            <div>
                <ImgContainer>
                    <Img src={item.image_url}/>
                    <BookmarkButton onClick={() => bookmarkButtonClick()} bookmark={bookmark}>&#9733;</BookmarkButton>
                </ImgContainer>
                <ContentContainer>
                    <Title>{item.title}</Title>
                    <DiscountPer>{(item.discountPercentage !== null) && `${item.discountPercentage}%`}</DiscountPer>
                </ContentContainer>
                <Price>{parseInt(item.price).toLocaleString()}원</Price>
            </div>
        )}

        {(item.type === 'Category') && ( // Category type
            <div>
                <ImgContainer>
                    <Img src={item.image_url}/>
                    <BookmarkButton onClick={() => bookmarkButtonClick(item)} bookmark={bookmark}>&#9733;</BookmarkButton>
                </ImgContainer>
                <Title># {item.title}</Title>
            </div>
        )}
        
        {(item.type === 'Exhibition') && ( // Exhibition type
            <div>
                <ImgContainer>
                    <Img src={item.image_url}/>
                    <BookmarkButton onClick={() => bookmarkButtonClick(item)} bookmark={bookmark}>&#9733;</BookmarkButton>
                </ImgContainer>
                <Title>{item.title}</Title>
                <SubTitle>{item.sub_title}</SubTitle>
            </div>
        )}
        
        {(item.type === 'Brand') && ( // Brand type
            <div>
                <ImgContainer>
                    <Img src={item.brand_image_url}/>
                    <BookmarkButton onClick={() => bookmarkButtonClick(item)} bookmark={bookmark}>&#9733;</BookmarkButton>
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