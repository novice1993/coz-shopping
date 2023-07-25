import { styled } from "styled-components";
import { useState, useEffect } from "react";
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import ItemList from "../Component/ItemList";
import BookmarkList from "../Component/BookmarkList";


const Main = styled.main`
  display: flex;
  flex-direction: column;
`

const Container = styled.div`
  flex: 1 0 0;
  padding: 0px;
`

function MainPage () {

  const [items, setItems] = useState([]); // 서버에서 받아온 상품 리스트
  

  useEffect(() => {

    const request = async () => {
      try {
        const res = await fetch('http://cozshopping.codestates-seb.link/api/v1/products?count=4') 
        const data = await res.json();
        setItems(data);

      } catch (error) {
        console.log('Response error', error);
      }}
      
    request();}, [])

    return (
      <>
      <header>
        <Header />
      </header>
      <Main>
        <Container>
          <ItemList items={items}/></Container>
        <Container> 
          <BookmarkList/> </Container>
      </Main>
      <footer>
        <Footer />
      </footer>
      </>
    );
  }
  
  export default MainPage;