import './App.css';
import { useState } from 'react';
import MainPage from './Page/MainPage';
import ItemListPage from './Page/ItemListPage';
import BookmarkListPage from './Page/BookmarkListPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {

  // 북마크 관련 상태 => 북마크 체크 여부 (전역 상태로 만들 경우, 하나 체크하면 전체가 다 체크 됨)
  //  -> Main의 상품리스트, 북마크리스트에서 사용 
  //  -> 상품리스트 페이지, 북마크 리스트 페이지에서 모두 사용

  const bookmarkData = JSON.parse(localStorage.getItem('bookmark'));
  const [bookmark_List, setBookmark_List] = useState((bookmarkData !== null) ? bookmarkData : []); // 북마크 리스트

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainPage bookmark_List={bookmark_List} setBookmark_List={setBookmark_List}/>}/>
        <Route path='/products/list' element={<ItemListPage />}/>
        <Route path='/bookmark' element={<BookmarkListPage />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
