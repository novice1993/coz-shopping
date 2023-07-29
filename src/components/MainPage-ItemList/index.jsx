import { styled } from "styled-components";
import useGetItemList from "../../hooks/useGetItemList";
import ItemViewer from "../ItemViewer";

const sectionTitle = '상품 리스트'

function ItemList () {

    const itemList = useGetItemList();

    return (
        <Container>
            <Title>{sectionTitle}</Title>
            <ItemBox>
                {itemList.map((item, idx) => {
                    return (idx < 4) && <ItemViewer key={item.id} item={item}/>
                })}
            </ItemBox>
        </Container>
    )
}

export default ItemList;


const Container = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
`

const Title = styled.h2`
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
`