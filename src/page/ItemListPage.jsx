import { styled } from "styled-components";
import { useEffect } from "react";

import useGetItemList from "../hooks/useGetItemList";
import useGetFilterdItemList from "../hooks/useGetFilterdItemList";
import useInfiniteScroll from "../hooks/useInfiniteScroll";

import Header from "../components/Header";
import Footer from "../components/Footer";
import ItemFilter from "../components/ItemFilter";
import Item from "../components/Item";
import LoadingIndicator from "../components/LoadingIndicator";


function ItemListPage () {

    const itemList = useGetItemList();
    const { filterdItemList, itemFilterChange } = useGetFilterdItemList(itemList);
    const { observer, observerTargetRef, loading } = useInfiniteScroll();


    useEffect(() => {

        if (observerTargetRef.current) {
            observer.observe(observerTargetRef.current);
          }
      
          return () => {
            if (observerTargetRef.current) {
              observer.unobserve(observerTargetRef.current);
            }
          };
        
    }, [])


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
            {loading && <LoadingIndicator />}
            <FooterBox ref={observerTargetRef}>
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