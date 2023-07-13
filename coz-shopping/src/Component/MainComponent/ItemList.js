import { styled } from "styled-components";
import Item from "../Item";

const Container = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
`

const Title = styled.div`
    flex: 1 0 0;
    padding-top: 10px;
    padding-left: 50px;

    font-weight: bolder;
    font-size: 1.2rem;
`

const ItemBox = styled.div`
    flex: 9 0 0;

    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
    gap: 95px;

    margin-top: 10px;
`

function ItemList ({ items, bookmark_List, setBookmark_List }) {
    return (
        <Container>
            <Title>상품 리스트</Title>
            <ItemBox>
                {items.map((item) => {
                    return <Item key={item.id} item={item} bookmark_List={bookmark_List} setBookmark_List={setBookmark_List}/>
                })}
            </ItemBox>
        </Container>
    )
}

export default ItemList;