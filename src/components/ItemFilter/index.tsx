import { styled } from "styled-components";
import FilterIcon from "./FilterIcon";
import FilterChange from "../../models/FilterChange";

import allImg from 'images/all.jpg';
import productImg from 'images/product.jpg';
import categoryImg from 'images/category.png';
import exhibitionImg from 'images/exhibition.png';
import brandImg from 'images/brand.png';

interface OwnProps {
    itemFilterChange: FilterChange,
}

function ItemFilter ({ itemFilterChange } : OwnProps) {

    return (
        <Container>
            <FilterIcon itemFilterChange={itemFilterChange} type='All' img={allImg} text='전체' />
            <FilterIcon itemFilterChange={itemFilterChange} type='Product' img={productImg} text='상품' />
            <FilterIcon itemFilterChange={itemFilterChange} type='Category' img={categoryImg} text='카테고리' />
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