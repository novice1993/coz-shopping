import { styled } from "styled-components";
import FilterIcon from "./FilterIcon";
import FilterChange from "../../models/FilterChange";

import allImg from '../../asset/FilterImg-All.jpg';
import productImg from '../../asset/FilterImg-Product.jpg';
import categoryImg from '../../asset/FilterImg-Category.png'
import exhibitionImg from '../../asset/FilterImg-Exhibition.png';
import brandImg from '../../asset/FilterImg-Brand.png';

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