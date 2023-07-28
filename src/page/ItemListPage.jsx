import { styled } from "styled-components";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addItemList } from "../redux/Item-Reducer";

import getItemFromServer from "../utils/getItemFromServer";
import useGetFilterdItemList from "../hooks/useGetFilterdItemList";

import Header from "../components/Header";
import Footer from "../components/Footer";
import ItemFilter from "../components/ItemFilter";
import Item from "../components/Item";


function ItemListPage () {

    const itemList = useSelector(state => state.itemList);
    const dispatch = useDispatch();

    const { filterdItemList, itemFilterChange } = useGetFilterdItemList(itemList);



    // 무한스크롤 관련 로직
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
                <ItemFilter itemFilterChange={itemFilterChange}/>
                <ItemBox>
                {filterdItemList.map((item) => {
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