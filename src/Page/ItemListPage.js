import { styled } from "styled-components";
import { useState, useEffect } from "react";
import Header from "../Component/MainComponent/Header";
import Footer from "../Component/MainComponent/Footer";
import ItemFilter from "../Component/ItemFilter";
import Item from "../Component/Item";


function ItemListPage ({ bookmark_List, setBookmark_List }) {

    const [items, setItems] = useState([]); // 서버에서 받아오는 상품 데이터
    const [filter, setFilter] = useState(''); 

    /**
     * 🔴 ItemListPage 무한스크롤 렌더링 관련 로직은 수정함
     *    1) 필터링 관련 로직 수정 필요 -> 상태 어디서 관리할 것인가? + 구현 로직
     *      1-2) 필터 관련 상태/상태관리함수 네이밍 수정
     *    2) 무한 스크롤 다시 알아본 후 로직 수정 (지금 가독성이 너무 떨어짐 + 내가 제대로 이해 못한 코드가 많음)
     * 
     */



    useEffect(() => { 

      setFilter(''); // 필터 초기화
      
      fetch('http://cozshopping.codestates-seb.link/api/v1/products?count=8')
        .then(res => res.json())
        .then(data => {
          localStorage.setItem('all_Items', JSON.stringify(data));
          setItems(data)})
        .catch(error => console.error('response error', error))
      
      }, [])


      // 무한 스크롤 -> 레퍼런스 참고해서 구현함 => 이를 활용해서 데이터 올바르게 처리할 로직 구현해야 함 (https://abangpa1ace.tistory.com/118) 참고
      const handleScroll =() => {

        const { scrollHeight, scrollTop, clientHeight } = document.documentElement;

        if (scrollTop + clientHeight >= scrollHeight) {

          fetch('http://cozshopping.codestates-seb.link/api/v1/products?count=8')
            .then(res => res.json())
            .then(data => {

              const existingItem = JSON.parse(localStorage.getItem('all_Items'));

              const notDuplicateItem = data.filter(item => {
                let result = 0;
                for(let i=0; i<existingItem.length; i++){(existingItem[i].id === item.id) && (result = result + 1)} 
                return (result === 0);
              })

              const renewalItem = [...existingItem, ...notDuplicateItem];
              localStorage.setItem('all_Items', JSON.stringify(renewalItem));


              if(filter === '' || filter === 'all'){
                setItems(renewalItem);
        
              } else {
                const filtered_items = renewalItem.filter((item) => item.type === filter);
                setItems(filtered_items)

              }})
              .catch(error => console.error('Response error', error))
          
          window.scrollTo(0, scrollTop-1)
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
                <ItemFilter setFilter={setFilter}/>
                <ItemBox>
                    {items.map((item) => {
                        return <Item 
                        key={item.id} item={item} 
                        bookmark_List={bookmark_List} setBookmark_List={setBookmark_List}/>
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