import { styled } from "styled-components";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ItemList from "../components/MainPage-ItemList";
import BookmarkList from "../components/MainPage-BookmarkList";


function MainPage () {

    return (
      <>
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
      </>
    );
  }
  
  export default MainPage;


const Main = styled.main`
  display: flex;
  flex-direction: column;
`

const Container = styled.div`
  flex: 1 0 0;
  padding: 0px;
`
