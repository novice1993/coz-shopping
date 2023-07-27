import { styled } from "styled-components";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addItemList } from "../redux/Item-Reducer";
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import ItemFilter from "../Component/ItemFilter";
import Item from "../Component/Item";


function ItemListPage () {

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


      // 무한 스크롤 -> 레퍼런스 참고해서 구현함 => 이를 활용해서 데이터 올바르게 처리할 로직 구현해야 함 (https://abangpa1ace.tistory.com/118) 참고
      const handleScroll =() => {

        const { scrollHeight, scrollTop, clientHeight } = document.documentElement;

        if (scrollTop + clientHeight >= scrollHeight) {
          getItemListFromServer();
          window.scrollTo(0, scrollTop-1);
        }
        
      }


      useEffect(() => {
        window.addEventListener('scroll', handleScroll); 
        return () => window.removeEventListener('scroll', handleScroll)}, [handleScroll])
    

    return (
        <Container>
            <HeaderBox>
                <Header />
            </HeaderBox>
            <Main>
                <ItemFilter/>
                <ItemBox>
                    {itemList.map((item) => {
                        return <Item key={item.id} item={item}/>
                    })}
                </ItemBox>
            </Main>
            <FooterBox>
                <Footer />
            </FooterBox>
        </Container>
    )
}

export default ItemListPage;



// 컴포넌트 생성
const Container = styled.div`
    width: 100vw;
    height: 100vh;

    display: flex;
    flex-direction: column;
`

const HeaderBox = styled.header`
    flex: 1 0 0;
`

const FooterBox = styled.header`
    flex: 0.7 0 0;
`

const Main = styled.main`
    flex: 8 0 0;

    display: flex;
    flex-direction: column;
`

const ItemBox = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
`