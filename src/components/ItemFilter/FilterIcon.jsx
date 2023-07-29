import { styled } from "styled-components";

const FilterIcon = ({ itemFilterChange, type, img, text }) => {

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