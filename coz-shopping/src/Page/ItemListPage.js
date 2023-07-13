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
    const [filter, setFilter] = useState(''); // 필터링 조건
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


      // 무한 스크롤 -> 레퍼런스 참고해서 구현함 => 이를 활용해서 데이터 올바르게 처리할 로직 구현해야 함 (https://abangpa1ace.tistory.com/118) 참고
      const handleScroll =() => {

        const { scrollHeight, scrollTop, clientHeight } = document.documentElement;

        if (scrollTop + clientHeight >= scrollHeight) {

            const request = async () => {
                try {
                  const res = await fetch('http://cozshopping.codestates-seb.link/api/v1/products?count=8') 
                  const data = await res.json();
      
                  const previousItem = JSON.parse(localStorage.getItem('all_Items')); // 1) 기존에 로컬에 저장한 상품 데이터 

                  console.log(previousItem);

                  const newItem = data.filter((item) => { // 2) 기존 데이터 - 새로 불러온 데이터 : 중복 검사
                    let result = 0;
                    for(let i=0; i<previousItem.length; i++){(previousItem[i].id === item.id) && (result = result + 1)} 
                    return (result === 0);
                  })

                  console.log(newItem);
                
                  const newItemList =  [...previousItem, ...newItem] // 3) 기존 데이터 + 신규 데이터 => 로컬에 저장
                  localStorage.setItem('all_Items', JSON.stringify(newItemList));

                  (filter === '' || filter === 'all') ? setItems(newItemList) // 4) 현재 필터 고려 -> 렌더링 될 상태로 설정
                  : setItems(newItemList.filter((item) => item.type === filter))  
                  
                } catch (error) {
                  console.log('Response error', error);
                }
              }
          
              request();

          window.scrollTo(0, scrollTop-1)
        }
      }

      useEffect(() => {
        window.addEventListener('scroll', handleScroll); 
        return () => window.removeEventListener('scroll', handleScroll);
      }, [handleScroll])
      


    return (
        <Container>
            <HeaderBox>
                <Header />
            </HeaderBox>
            <Main>
                <ItemFilter filter={filter} setFilter={setFilter} setItems={setItems} all_Items={all_Items} />
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