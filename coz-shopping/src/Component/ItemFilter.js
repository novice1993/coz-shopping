import { useState, useEffect } from "react";
import { styled } from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 40px;

`

const ButtonContainer = styled.div`
    margin: 10px;

    &:hover {
        cursor: pointer;
    }
`

const Img = styled.img`
    width: 82px;
    height: 82px;
    border: 1px;
    border-radius: 50%;
`

const Text = styled.div`
    text-align: center;
`

function ItemFilter ({ setItems, all_Items }) {

    const [filter, setFilter] = useState(''); // 필터링 조건

    useEffect(() => {

        (filter === 'all') ? setItems(all_Items)
        : setItems(all_Items.filter((item) => item.type === filter))

    }, [filter])


    return (
        <Container>
            <ButtonContainer onClick={() => {setFilter('all')}}>
                <Img src="https://m.munguland.com/web/product/big/201810/c52ab7e6724aca49540a62832cf76b3d.jpg"/>
                <Text>전체</Text>
            </ButtonContainer>

            <ButtonContainer onClick={() => setFilter('Product')}>
                <Img src="https://m.munguland.com/web/product/big/201810/c52ab7e6724aca49540a62832cf76b3d.jpg"/>
                <Text>상품</Text>
            </ButtonContainer>

            <ButtonContainer onClick={() => setFilter('Category')}>
                <Img src="https://m.munguland.com/web/product/big/201810/c52ab7e6724aca49540a62832cf76b3d.jpg"/>
                <Text>카테고리</Text>
            </ButtonContainer>

            <ButtonContainer onClick={() => setFilter('Exhibition')}>
                <Img src="https://m.munguland.com/web/product/big/201810/c52ab7e6724aca49540a62832cf76b3d.jpg"/>
                <Text>기획전</Text>
            </ButtonContainer>

            <ButtonContainer onClick={() => setFilter('Brand')}>
                <Img src="https://m.munguland.com/web/product/big/201810/c52ab7e6724aca49540a62832cf76b3d.jpg"/>
                <Text>브랜드</Text>
            </ButtonContainer>
        </Container>
    )
}

export default ItemFilter;