import { useState } from "react";
import { styled } from "styled-components";
import { Link } from "react-router-dom";
import Menu from "../HeaderMenu";
import LogoImg from '../../asset/logo.jpg'

const name = 'COZ Shopping'


function Header () {

    const [menu, setMenu] = useState(false);

    const setHeaderMenu = (): void => {
        setMenu(!menu);
    }


    return (
        <Container>
            <LogoNameContainer>
                <Link to='/' className="Link">
                    <Logo src={LogoImg}/>
                    <Name>{name}</Name>
                </Link>
            </LogoNameContainer>
            <MenuContainer>
                <MenuButton onClick={setHeaderMenu}>&#9776;</MenuButton>
                {(menu) && <Menu />}
            </MenuContainer>
        </Container>
    )
}

export default Header;


const Container = styled.nav`

    height: 100%;
    border-bottom: 1px solid rgba(184, 184, 184, 0.89);
    box-shadow: 0px 2px 15px rgba(184, 184, 184, 0.89);
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
    font-size: 2.4rem;
    font-weight: bold;
`

const MenuContainer = styled.div`
    z-index: 90;
    margin-right: 50px;
`

const MenuButton = styled.span`
    font-size: 3.5rem;

    &:hover {
    cursor: pointer;
 }
`