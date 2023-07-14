import { useState, useEffect } from "react";
import { styled } from "styled-components";
import allImg from '../img/all.jpg';
import productImg from '../img/product.jpg';
import categoryImg from '../img/category.png';
import exhibitionImg from '../img/exhibition.png';
import brandImg from '../img/brand.png';

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

function ItemFilter ({
    filter, setFilter, // 필터 관련 상태
    setItems, // 북마크 전역 상태관리 함수
    all_Items,  // 로컬 스토리지 데이터
    index 
}) {

    useEffect(() => { // 필터를 변경했을 때

        if(filter === '' || filter === 'all'){
            const renderingItems = all_Items.filter((item, idx) => (index-8 <= idx && idx < index))
            
            console.log(index);
            setItems(renderingItems);

          } else {
            const filtered = all_Items.filter((item) => item.type === filter);
            const filtered_data = filtered.filter((item, idx) => (index-8 <= idx && idx < index));
            
            console.log(index);
            setItems(filtered_data)
          }

    }, [filter])


    return (
        <Container>
            <ButtonContainer onClick={() => {setFilter('all')}}>
                <Img src={allImg}/>
                <Text>전체</Text>
            </ButtonContainer>

            <ButtonContainer onClick={() => setFilter('Product')}>
                <Img src={productImg}/>
                <Text>상품</Text>
            </ButtonContainer>

            <ButtonContainer onClick={() => setFilter('Category')}>
                <Img src={categoryImg}/>
                <Text>카테고리</Text>
            </ButtonContainer>

            <ButtonContainer onClick={() => setFilter('Exhibition')}>
                <Img src={exhibitionImg}/>
                <Text>기획전</Text>
            </ButtonContainer>

            <ButtonContainer onClick={() => setFilter('Brand')}>
                <Img src={brandImg}/>
                <Text>브랜드</Text>
            </ButtonContainer>
        </Container>
    )
}

export default ItemFilter;