import './App.css';
import MainPage from './Page/MainPage';
import ItemListPage from './Page/ItemListPage';
import BookmarkListPage from './Page/BookmarkListPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' Component={MainPage}/>
        <Route path='/products/list' Component={ItemListPage}/>
        <Route path='/bookmark' Component={BookmarkListPage}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
