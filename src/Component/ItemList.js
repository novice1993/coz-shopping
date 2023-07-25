import { styled } from "styled-components";
import Item from "./Item";

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
    /* gap: 95px; */

    /* margin-top: 10px; */
`

function ItemList ({ items }) { // 1) MainPage가 마운트 될 때 서버에서 받아온 데이터  2) 북마크 관련 전역 상태  3) 토스트 ui 관련 상태
    return (
        <Container>
            <Title>상품 리스트</Title>
            <ItemBox>
                {items.map((item) => {
                    return <Item key={item.id} item={item}/>
                })}
            </ItemBox>
        </Container>
    )
}

export default ItemList;