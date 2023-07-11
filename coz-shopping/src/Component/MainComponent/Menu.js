import { styled } from "styled-components";

const Container = styled.div`
    position: relative;
`

const Arrow = styled.div`

    position: absolute;
    
    transform: translate(15px);
    right: 1%;
    border-left: 30px solid transparent;
    border-right: 30px solid transparent;
    border-bottom: 30px solid red; 
`

const Box = styled.div`
    display: flex;
    flex-direction: column;

    position: absolute;
    z-index: 99;
    transform: translate(-80px, 20px);
    width: 150px;
    height: 140px;
    background-color: blue;
    border-radius: 10%;
    color: white;
`

const Content = styled.div`
    flex: 1 0 0;
    
    display: flex;
    justify-content: center;
    align-items: center;

    overflow: hidden;

    &:hover {
        cursor: pointer;
    }
`

function Menu () {
    return (
        <Container>
            <Arrow />
            <Box>
                <Content>OOO님, 안녕하세요!</Content>
                <Content>상품리스트 페이지</Content>
                <Content>북마크 페이지</Content>
            </Box>
        </Container>
    )
}

export default Menu;