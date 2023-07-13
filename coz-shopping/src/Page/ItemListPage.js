import { styled } from "styled-components";
import { useState, useEffect } from "react";
import Header from "../Component/MainComponent/Header";
import Footer from "../Component/MainComponent/Footer";
import ItemFilter from "../Component/ItemFilter";
import Item from "../Component/Item";


const Container = styled.div`
    width: 100vw;
    height: 100vh;

    display: flex;
    flex-direction: column;
`

const HeaderBox = styled.header`
    flex: 1 0 0;

    border-bottom: 1px solid black;
`

const FooterBox = styled.header`
    flex: 1 0 0;
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
    gap: 95px;

    margin-top: 10px;
`

function ItemListPage ({ bookmark_List, setBookmark_List }) {

    const [items, setItems] = useState([]); // 서버에서 받아오는 상품 데이터
    const all_Items = JSON.parse(localStorage.getItem('all_Items')); // 로컬에 저장한 상품 데이터

    useEffect(() => {

        const request = async () => {
          try {
            const res = await fetch('http://cozshopping.codestates-seb.link/api/v1/products?count=8') 
            const data = await res.json();

            localStorage.setItem('all_Items', JSON.stringify(data)); // 불러온 데이터 로컬 스토리지에 저장
            setItems(data);
            
          } catch (error) {
            console.log('Response error', error);
          }
        }
    
        request();
    
      }, [])
    

    return (
        <Container>
            <HeaderBox>
                <Header />
            </HeaderBox>
            <Main>
                <ItemFilter setItems={setItems} all_Items={all_Items} />
                <ItemBox>
                    {items.map((item) => {
                        return <Item key={item.id} item={item} bookmark_List={bookmark_List} setBookmark_List={setBookmark_List}/>
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