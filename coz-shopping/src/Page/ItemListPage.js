import { styled } from "styled-components";
import Header from "../Component/MainComponent/Header";

const Container = styled.div`
    width: 100vw;
    height: 100vh;

    display: flex;
    flex-direction: column;
`

const HeaderBox = styled.header`
    flex: 1 0 0;

    border-bottom: 1px solid black;
`

const Main = styled.main`
    flex: 9 0 0;
`

function ItemListPage () {
    return (
        <Container>
            <HeaderBox>
                <Header />
            </HeaderBox>
            <Main>ItemListPage</Main>
        </Container>
    )
}

export default ItemListPage;