import { styled } from "styled-components";
import FilterIcon from "./FilterIcon";

import allImg from '../../img/all.jpg';
import productImg from '../../img/product.jpg';
import categoryImg from '../../img/category.png';
import exhibitionImg from '../../img/exhibition.png';
import brandImg from '../../img/brand.png';


function ItemFilter ({ itemFilterChange }) {

    return (
        <Container>
            <FilterIcon itemFilterChange={itemFilterChange} type='All' img={allImg} text='전체' />
            <FilterIcon itemFilterChange={itemFilterChange} type='Product' img={productImg} text='상품' />
            <FilterIcon itemFilterChange={itemFilterChange} type='category' img={categoryImg} text='카테고리' />
            <FilterIcon itemFilterChange={itemFilterChange} type='Exhibition' img={exhibitionImg} text='기획전' />
            <FilterIcon itemFilterChange={itemFilterChange} type='Brand' img={brandImg} text='브랜드' />
        </Container>
    )
}

export default ItemFilter;


const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 40px;

`