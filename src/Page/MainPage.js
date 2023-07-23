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
  padding: 0px;
`

// 🔴 토스트 ui 관련 버그
//
// 1) 이전에 생성한 Toast가 존재할 때 북마크를 한번 더 갱신
//  -> 이전 토스트 로직 / 현재 토스트 로직이 겹쳐서 오류가 발생함
//  -> 이 부분 수정이 필요함
//
// 2) 상품 리스트 페이지 
//  -> 토스트 생성 시 높이가 다른 페이지와 다르게 표시됨
//  -> 해당 부분 원인 파악 후 수정 필요
//  -> 확인해보니 북마크 리스트도 동일함 (상품이 2줄 이상 표시될 경우 메인 페이지와 다르게 표시됨)
//  -> 추후 수정 필요


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
      }}
      
    request();}, [])

    return (
      <>
      <header>
        <Header />
      </header>
      <Main>
        <Container>
          <ItemList items={items}  bookmark_List={bookmark_List} setBookmark_List={setBookmark_List}/></Container>
        <Container> 
          <BookmarkList bookmark_List={bookmark_List} setBookmark_List={setBookmark_List}/> </Container>
      </Main>
      <footer>
        <Footer />
      </footer>
      </>
    );
  }
  
  export default MainPage;