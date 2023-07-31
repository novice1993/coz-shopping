import { styled } from "styled-components";
import { Link } from "react-router-dom";
import itemImg from '../../asset/item.png'


function Menu () {
    return (
        <Container>
            <Arrow />
            <Box>
                <Content>OOO님, 안녕하세요!</Content>
                <Content>
                    <Link to='/products/list' className="Link"><img src={itemImg}/> 상품리스트 페이지</ Link>
                </Content>
                <Content>
                    <Link to='/bookmark' className="Link">&#9734; 북마크 페이지</Link>
                </Content>
            </Box>
            
        </Container>
    )
}

export default Menu;


const Container = styled.div`
    position: relative;
`

const Arrow = styled.div`
    position: absolute;
    transform: translate(15px);
    right: 15%;
    border-left: 30px solid transparent;
    border-right: 30px solid transparent;
    border-bottom: 30px solid white; 
`

const Box = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    transform: translate(-110px, 20px);
    width: 180px;
    height: 140px;
    background-color: white;
    box-shadow: 4px 4px 10px rgba(184, 184, 184, 0.89);;
    border-radius: 10%;
    color: black;
`

const Content = styled.div`
    flex: 1 0 0;
    position: relative;
    z-index: 400;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;

    & :hover {
        cursor: pointer;
    }

    & .Link {
        color: black;
        text-decoration: none;

        & img {
            width: 15px;
            height: auto;
        }
    }
`