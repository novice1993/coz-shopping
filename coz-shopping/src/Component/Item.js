import { styled } from "styled-components";
import { useState } from "react";

// 전체 type 공통 적용
const Content_Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

const ImgContainer = styled.div`
    position: relative;
`

const Img = styled.img`
    width: 264px;
    height: 210px;
    border-radius: 12px;
    border: 1px solid black;

    margin-bottom: 5px;
`

const Bookmark_Button = styled.div`
    position: absolute;
    transform: translate(227px, -48px);
    color: ${(props) => (props.bookmark) ? '#FFD361;' : '#DFDFDF;'};
    /* color: #FFD361; */
    /* #DFDFDF; */
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
const Interested_Customer = styled.div`
    font-weight: bolder;
`

const Followers = styled.div`
    text-align: right;
`

function Item ({ item }) {

    const [bookmark, setBookmark] = useState(false); // 아이템 북마크 여부

    const bookmark_ButtonClick = (item) => { 
        if(item.bookmark === undefined){
            setBookmark(true)
            item.bookmark = bookmark;
        } else {
            setBookmark(!bookmark)
            item.bookmark = bookmark;
        }
    }

    return (
        <>
        {(item.type === 'Product') && ( // product type
            <div>
                <ImgContainer>
                    <Img src={item.image_url}/>
                    <Bookmark_Button onClick={() => bookmark_ButtonClick(item)} bookmark={bookmark}>&#9733;</Bookmark_Button>
                </ImgContainer>
                <Content_Container>
                    <Title>{item.title}</Title>
                    <DiscountPer>{(item.discountPercentage !== null) && `${item.discountPercentage}%`}</DiscountPer>
                </Content_Container>
                <Price>{parseInt(item.price).toLocaleString()}원</Price>
            </div>
        )}

        {(item.type === 'Category') && ( // Category type
            <div>
                <ImgContainer>
                    <Img src={item.image_url}/>
                    <Bookmark_Button onClick={() => bookmark_ButtonClick(item)} bookmark={bookmark}>&#9733;</Bookmark_Button>
                </ImgContainer>
                <Title># {item.title}</Title>
            </div>
        )}
        
        {(item.type === 'Exhibition') && ( // Exhibition type
            <div>
                <ImgContainer>
                    <Img src={item.image_url}/>
                    <Bookmark_Button onClick={() => bookmark_ButtonClick(item)} bookmark={bookmark}>&#9733;</Bookmark_Button>
                </ImgContainer>
                <Title>{item.title}</Title>
                <SubTitle>{item.sub_title}</SubTitle>
            </div>
        )}
        
        {(item.type === 'Brand') && ( // Brand type
            <div>
                <ImgContainer>
                    <Img src={item.brand_image_url}/>
                    <Bookmark_Button onClick={() => bookmark_ButtonClick(item)} bookmark={bookmark}>&#9733;</Bookmark_Button>
                </ImgContainer>
                <Content_Container>
                    <Title>{item.brand_name}</Title>
                    <Interested_Customer>관심고객수</Interested_Customer>
                </Content_Container>
                <Followers>{parseInt(item.follower).toLocaleString()}</Followers>
            </div>
        )}
        </>
    )
}

export default Item;