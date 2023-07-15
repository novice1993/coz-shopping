import { styled } from "styled-components";
import { useState, useEffect } from "react";
import Header from "../Component/MainComponent/Header";
import Footer from "../Component/MainComponent/Footer";
import ItemList from "../Component/MainComponent/ItemList";
import BookmarkList from "../Component/MainComponent/BookmarkList";
import Toast from "../Component/Toast";

const Main = styled.main`
  display: flex;
  flex-direction: column;
`

const Container = styled.div`
  flex: 1 0 0;
`

// 🥦 Toast 메세지 구현
//  - MainPage의 북마크 리스트 일부 구현한 상황
//  - 북마크 버튼 눌렀을 때 토스트 메세지 뜸
//  - 북마크 별표 추가 + 색상 적용 필요
//  - Cmarket hooks 참고해서 opacity도 적용해보기

// 🥦 이상 완료 시 추가 진행할 부분
//  - MainPage의 아이템 리스트
//  - ItemListPage, BookmarkListPage 에도 적용
//  - 모두 완료했다면 디자인 적용 -> 버그 테스트


function MainPage ({ bookmark_List, setBookmark_List }) {

  const [items, setItems] = useState([]); // 서버에서 받아온 상품 리스트
  const [toast, setToast] = useState(false); // toast 메세지 띄울지 여부
  const [toastContent, setToastContent] = useState('테스트'); // toast에 들어가는 문구
  

  useEffect(() => {
      console.log(toastContent)}, [toastContent])

  useEffect(() => {
    console.log(toast)}, [toast])

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
        <Container> <ItemList items={items}  bookmark_List={bookmark_List} setBookmark_List={setBookmark_List}/> </Container>
        <Container> 
          <BookmarkList bookmark_List={bookmark_List} setBookmark_List={setBookmark_List}
          setToast={setToast} setToastContent={setToastContent}/> </Container>
      </Main>
      <footer>
        <Footer />
      </footer>
      <Toast toast={toast} toastContent={toastContent}/>
      </>
    );
  }
  
  export default MainPage;