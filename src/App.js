import './App.css';
import MainPage from './page/MainPage'
import ItemListPage from './page/ItemListPage';
import BookmarkListPage from './page/BookmarkListPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


// 나머지 리팩토링 부분
//
//  3) css 요소와 컴포넌트 요소 분리
//  4) 디렉토리 구조 수정 - 도메인 드라이븐 적용해보기 
//
//  5) css 수정 (화면 비율)
// 
//  6) ts 적용

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainPage/>}/>
        <Route path='/products/list' element={<ItemListPage/>}/>
        <Route path='/bookmark' element={<BookmarkListPage/>}/>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
