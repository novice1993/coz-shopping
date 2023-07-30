import { styled } from "styled-components";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ItemList from "../components/MainPage-ItemList";
import BookmarkList from "../components/MainPage-BookmarkList";


function MainPage () {

    return (
      <TotalContainer>
      <header>
        <Header/>
      </header>
      <Main>
        <Container> <ItemList/> </Container>
        <Container> <BookmarkList/> </Container>
      </Main>
      <footer>
        <Footer />
      </footer>
      </TotalContainer>
    );
  }
  
  export default MainPage;

const TotalContainer = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;
`

const Main = styled.main`
  flex: 8 0 0;

  display: flex;
  flex-direction: column;
`

const Container = styled.div`
  flex: 1 0 0;
  padding: 0px;
`
