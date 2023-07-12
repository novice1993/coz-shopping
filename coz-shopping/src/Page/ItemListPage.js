import { styled } from "styled-components";
import Header from "../Component/MainComponent/Header";
import Footer from "../Component/MainComponent/Footer";

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

const FooterBox = styled.header`
    flex: 1 0 0;
`

const Main = styled.main`
    flex: 8 0 0;
`

function ItemListPage () {
    return (
        <Container>
            <HeaderBox>
                <Header />
            </HeaderBox>
            <Main>ItemListPage</Main>
            <FooterBox>
                <Footer />
            </FooterBox>
        </Container>
    )
}

export default ItemListPage;