import { styled } from "styled-components";
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import ItemList from "../Component/ItemList";
import BookmarkList from "../Component/BookmarkList";


function MainPage () {

    return (
      <>
      <header>
        <Header />
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


// 컴포넌트 생성
const Main = styled.main`
  display: flex;
  flex-direction: column;
`

const Container = styled.div`
  flex: 1 0 0;
  padding: 0px;
`
