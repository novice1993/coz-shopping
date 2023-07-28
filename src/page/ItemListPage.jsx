import { styled } from "styled-components";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { addItemList } from "../redux/Item-Reducer";

import getItemFromServer from "../utils/getItemFromServer";
import useGetItemList from "../hooks/useGetItemList";
import useGetFilterdItemList from "../hooks/useGetFilterdItemList";

import Header from "../components/Header";
import Footer from "../components/Footer";
import ItemFilter from "../components/ItemFilter";
import Item from "../components/Item";


function ItemListPage () {

    const itemList = useGetItemList();
    const dispatch = useDispatch();
    const targetRef = useRef(null);

    const { filterdItemList, itemFilterChange } = useGetFilterdItemList(itemList);


    // intersectionObserver 통해 무한스크롤 구현
    useEffect(() => {

        const callback = (entries) => {
          
          entries.forEach((entry) => {
            
            if (entry.isIntersecting) {
                
                getItemFromServer()
                .then(itemListData => dispatch(addItemList(itemListData)));

            }})
        }
    
        const options = {
          threshold: 0.5,
        };
    
        const observer = new IntersectionObserver(callback, options);
    
        if (targetRef.current) {
          observer.observe(targetRef.current);
        }
    
        // 컴포넌트 언마운트 시 옵저버 해제
        return () => {
          if (targetRef.current) {
            observer.unobserve(targetRef.current);
          }
        };
      }, []);


    return (
        
        <Container>
            <HeaderBox>
                <Header />
            </HeaderBox>
            <Main>
                <ItemFilter itemFilterChange={itemFilterChange}/>
                <ItemBox>
                {filterdItemList.map((item) => {
                    return <Item key={item.id} item={item} />
                })}
                </ItemBox>
            </Main>
            <FooterBox ref={targetRef}>
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