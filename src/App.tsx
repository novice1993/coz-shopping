import './App.css';
import MainPage from './page/MainPage'
import ItemListPage from './page/ItemListPage';
import BookmarkListPage from './page/BookmarkListPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


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
