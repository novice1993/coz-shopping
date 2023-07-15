import './App.css';
import { useEffect, useState } from 'react';
import MainPage from './Page/MainPage';
import ItemListPage from './Page/ItemListPage';
import BookmarkListPage from './Page/BookmarkListPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {

  const bookmarkData = JSON.parse(localStorage.getItem('bookmark'));
  const [bookmark_List, setBookmark_List] = useState( (bookmarkData !== null) ? bookmarkData : [] );

  


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainPage bookmark_List={bookmark_List} setBookmark_List={setBookmark_List}/>}/>
        <Route path='/products/list' element={<ItemListPage bookmark_List={bookmark_List} setBookmark_List={setBookmark_List}/>}/>
        <Route path='/bookmark' element={<BookmarkListPage bookmark_List={bookmark_List} setBookmark_List={setBookmark_List}/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
