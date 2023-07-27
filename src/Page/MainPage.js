import { styled } from "styled-components";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addItemList } from "../redux/Item-Reducer";
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import ItemList from "../Component/ItemList";
import BookmarkList from "../Component/BookmarkList";


function MainPage () {

  const itemList = useSelector(state => state.itemList);
  const dispatch = useDispatch();


  const getItemListFromServer = async () => {

    try {
      const res = await fetch('http://cozshopping.codestates-seb.link/api/v1/products?count=8')
      const itemListData = await res.json();
      dispatch(addItemList(itemListData));
      
    } catch (error) {
      console.log('response error', error);

    }
  }

  useEffect(() => {
    getItemListFromServer()
  }, [])


    return (
      <>
      <header>
        <Header />
      </header>
      <Main>
        <Container> <ItemList/> </Container>
        <Container> <BookmarkList/> </Container>
      </Main>
      <footer>
        <Footer />
      </footer>
      </>
    );
  }
  
  export default MainPage;


// 컴포넌트 생성
const Main = styled.main`
  display: flex;
  flex-direction: column;
`

const Container = styled.div`
  flex: 1 0 0;
  padding: 0px;
`
