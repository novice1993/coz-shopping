import './App.css';
import { useState } from 'react';
import MainPage from './Page/MainPage';
import ItemListPage from './Page/ItemListPage';
import BookmarkListPage from './Page/BookmarkListPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {

  // 🔴 북마크 리스트 페이지 -> 상품 리스트 페이지 전환 시 북마크 아이템 오류 발생 (북마크 표시했던 아이템이 사라짐)
  //  -> 해당 부분 수정 필요함
  //  -> 전반적으로 수정이 많이 필요해보임 
  // 
  // * 우선순위를 정하자 (일단 해야하는 것 나열)
  //  1) 컴포넌트 구조 수정 
  //  2) 컴포넌트 구조 수정 전, redux-toolkit 적용 (컴포넌트 이동 조금 더 수월하게 하기 위해)
  //  3) styled-components 코드와 일반 js로직 파일 구분
  //
  //  순서 : (2) -> (1) -> (3)
  //  redux-toolkit 부터 적용 
  
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainPage/>}/>
        <Route path='/products/list' element={<ItemListPage/>}/>
        <Route path='/bookmark' element={<BookmarkListPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
