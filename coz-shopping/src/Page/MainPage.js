import { styled } from "styled-components";
import { useState, useEffect } from "react";
import Header from "../Component/MainComponent/Header";
import Footer from "../Component/MainComponent/Footer";
import ItemList from "../Component/MainComponent/ItemList";
import BookmarkList from "../Component/MainComponent/BookmarkList";

const Main = styled.main`
  display: flex;
  flex-direction: column;
`

const Container = styled.div`
  flex: 1 0 0;
`

function MainPage ({ bookmark_List, setBookmark_List }) {

  const [items, setItems] = useState([]); // 서버에서 받아온 상품 리스트


  useEffect(() => {

    const request = async () => {
      try {
        const res = await fetch('http://cozshopping.codestates-seb.link/api/v1/products?count=4') 
        const data = await res.json();
        setItems(data);

      } catch (error) {
        console.log('Response error', error);
      }
    }
    
    request();

  }, [])


    return (
      <>
      <header>
        <Header />
      </header>
      <Main>
        <Container> <ItemList items={items}  bookmark_List={bookmark_List} setBookmark_List={setBookmark_List}/> </Container>
        <Container> <BookmarkList bookmark_List={bookmark_List} setBookmark_List={setBookmark_List}/> </Container>
      </Main>
      <footer>
        <Footer />
      </footer>
      </>
    );
  }
  
  export default MainPage;