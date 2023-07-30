import { styled } from "styled-components";
import { useEffect } from "react";

import useGetItemList from "../hooks/useGetItemList";
import useGetFilterdItemList from "../hooks/useGetFilterdItemList";
import useInfiniteScroll from "../hooks/useInfiniteScroll";

import ItemProps from "../models/ItemProps";

import Header from "../components/Header";
import Footer from "../components/Footer";
import ItemFilter from "../components/ItemFilter";
import ItemViewer from "../components/ItemViewer";
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
                <ItemBoxContainer>
                    <ItemBox>
                        {filterdItemList.map((item: ItemProps) => <ItemViewer key={item.id} item={item}/>)}
                    </ItemBox>
                </ItemBoxContainer>
            </Main>
            {loading && <LoadingIndicator />}

            <FooterBox ref={observerTargetRef}>
                <Footer />
            </FooterBox>
        </Container>
        
    )
}

export default ItemListPage;


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

const ItemBoxContainer = styled.section`
    display: flex;
    flex-direction: row;
    justify-content: center;
    
`

const ItemBox = styled.div`

    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
`