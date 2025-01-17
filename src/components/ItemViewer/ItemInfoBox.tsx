import { styled } from "styled-components"
import InfoBoxAndModal from "../../models/InfoBoxAndModal"

import BookmarkButton from "../BookmarkButton"


const ItemInfoBox = (props: InfoBoxAndModal) => {

    const { item, bookmark,  bookmarkStateChange, modalStateChange } = props;
    

    return (

        <> 
        {(item.type === 'Product') && ( // product type
            <Container>
                <Img src={item.image_url as string} onClick={modalStateChange}/>
                <BookmarkButton bookmark={bookmark} bookmarkStateChange={bookmarkStateChange} parentComponent='ItemInfoBox'/>
                <ContentContainer>
                    <Title>{item.title}</Title>
                    <DiscountPer>{(item.discountPercentage !== null) && `${item.discountPercentage}%`}</DiscountPer>
                </ContentContainer>
                <Price>{parseInt(item.price as string).toLocaleString()}원</Price>
            </Container>
        )}


        {(item.type === 'Category') && ( // Category type
            <Container>
                <Img src={item.image_url as string} onClick={modalStateChange}/>
                <BookmarkButton bookmark={bookmark} bookmarkStateChange={bookmarkStateChange} parentComponent='ItemInfoBox'/>
                <Title># {item.title}</Title>
            </Container>
        )}
        

        {(item.type === 'Exhibition') && ( // Exhibition type
            <Container>
                <Img src={item.image_url as string} onClick={modalStateChange}/>
                <BookmarkButton bookmark={bookmark} bookmarkStateChange={bookmarkStateChange} parentComponent='ItemInfoBox'/>
                <Title>{item.title}</Title>
                <SubTitle>{item.sub_title}</SubTitle>
            </Container>
        )}
        
        
        {(item.type === 'Brand') && ( // Brand type
            <Container>
                <Img src={item.brand_image_url as string} onClick={modalStateChange}/>
                <BookmarkButton bookmark={bookmark} bookmarkStateChange={bookmarkStateChange} parentComponent='ItemInfoBox'/>
                <ContentContainer>
                    <Title>{item.brand_name}</Title>
                    <InterestedCustomer>관심고객수</InterestedCustomer>
                </ContentContainer>
                <Followers>{(item.follower as number).toLocaleString()}</Followers>
            </Container>
            
        )}
        </>

    )

}

export default ItemInfoBox;


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
    width: 264px;
    height: 210px;
    border-radius: 12px;
    border: 1px solid black;
    margin-bottom: 5px;
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