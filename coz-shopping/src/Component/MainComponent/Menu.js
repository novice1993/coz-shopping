import { styled } from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
    position: relative;
`

const Arrow = styled.div`

    position: absolute;
    
    transform: translate(15px);
    right: 1%;
    border-left: 30px solid transparent;
    border-right: 30px solid transparent;
    border-bottom: 30px solid blue; 
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

    & :hover {
        cursor: pointer;
    }

    & .Link {
        color: white;
        text-decoration: none;
    }
`

function Menu () {
    return (
        <Container>
            <Arrow />
            <Box>
                <Content>OOO님, 안녕하세요!</Content>
                <Content>
                    <Link to='/products/list' className="Link">상품리스트 페이지</ Link>
                </Content>
                <Content>
                    <Link to='/bookmark' className="Link">북마크 페이지</Link>
                </Content>
            </Box>
        </Container>
    )
}

export default Menu;