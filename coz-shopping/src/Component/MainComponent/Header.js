import { useState } from "react";
import { styled } from "styled-components";
import { Link } from "react-router-dom";
import Menu from "./Menu";

const Container = styled.nav`
 height: 100%;

 display: flex;
 flex-direction: row;
 justify-content: space-between;
 align-items: center;
`

const LogoNameContainer = styled.div`

    margin-left: 50px;

    & :hover {
        cursor: pointer;
    }

    & .Link {
        color: black;
        text-decoration: none;
    }

`

const Logo = styled.img`
`

const Name = styled.span`
    padding-left: 10px;
    font-size: 1.5rem;
    font-weight: bolder;
`

const MenuContainer = styled.div`
    z-index: 90;
    margin-right: 50px;
    margin-bottom: 5px;
`

const MenuButton = styled.span`
    font-size: 2.5rem;

    &:hover {
    cursor: pointer;
 }
`

function Header () {

    const [menu, setMenu] = useState(false); // 햄버거 버튼 클릭 -> 메뉴바 on/off

    return (
        <Container>
            <LogoNameContainer>
                <Link to='/' className="Link">
                    <Logo src="../../../public/img/logo.jpg"/>
                    <Name>COZ Shopping</Name>
                </Link>
            </LogoNameContainer>
            <MenuContainer>
                <MenuButton onClick={() => setMenu(!menu)}>&#9776;</MenuButton>
                {(menu) && <Menu />}
            </MenuContainer>
        </Container>
    )
}

export default Header;