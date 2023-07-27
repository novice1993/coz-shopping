import { styled } from "styled-components";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addItemList } from "../redux/Item-Reducer";
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import ItemFilter from "../Component/ItemFilter";
import Item from "../Component/Item";
import getItemFromServer from "../Utils/getItemFromServer";


function ItemListPage () {

    const itemList = useSelector(state => state.itemList);
    const dispatch = useDispatch();

    
    const handleScroll = () => {

        const { scrollHeight, scrollTop, clientHeight } = document.documentElement;

        if (scrollTop + clientHeight >= scrollHeight) {

            getItemFromServer()
            .then(itemListData => dispatch(addItemList(itemListData)));

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