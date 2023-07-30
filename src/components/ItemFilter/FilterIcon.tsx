import { styled } from "styled-components";
import FilterChange from "../../models/FilterChange";

interface OwnProps {
    itemFilterChange: FilterChange,
    type: string,
    img: string,
    text: string
}


const FilterIcon = ( props :OwnProps ) => {

    const { itemFilterChange, type, img, text } = props

    return (
        <ButtonContainer onClick={() => itemFilterChange(type)}>
            <Img src={img}/>
            <Text>{text}</Text>
        </ButtonContainer>
    )

}

export default FilterIcon;


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