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
    const [filter, setFilter] = useState(''); 
    const [index, setIndex] = useState(0); // 화면에 표시할 아이템 개수 관련 상태

    const all_Items = JSON.parse(localStorage.getItem('all_Items')); // 로컬에 저장한 상품 데이터

    useEffect(() => {setIndex(8)}, []) // 화면에 표시할 아이템 개수
    useEffect(() => { setIndex(8)}, [filter]) // 필터 변경 -> index 초기화


    useEffect(() => { // index 혹은 filter 변경 -> 화면에 렌더링 되는 아이템 변화 (scroll 움직임과 연동)

      console.log(index);
      
      const request = async () => {
        try {
        
          // 1. index가 변경되면 -> 서버에서 데이터를 받아오고
          const res = await fetch('http://cozshopping.codestates-seb.link/api/v1/products?count=8') 
          const data = await res.json();
      
          // 2. 기존에 저장했던 데이터를 불러와서
          const previousItem = JSON.parse(localStorage.getItem('all_Items')); 
      
          // 3-1. 저장했던 데이터가 있을 경우
          if(previousItem !== null){
            // 중복 체크를 시행함
            const newItem = data.filter((item) => { 
              let result = 0;
              for(let i=0; i<previousItem.length; i++){(previousItem[i].id === item.id) && (result = result + 1)} 
              return (result === 0);
            })
      
            // 기존 + 신규 데이터 합산한 새로운 데이터 -> 로컬 데이터에 저장
            const newItemList =  [...previousItem, ...newItem] 
            localStorage.setItem('all_Items', JSON.stringify(newItemList));

            // 3-22. 저장했던 데이터가 없을 경우
          } else {
            // 서버에서 받아온 데이터 저장 
            localStorage.setItem('all_Items', JSON.stringify(data));}

        } catch (error) {
          console.log('Response error', error);
        }
      }
  
      request();

      if(filter === '' || filter === 'all'){
        const renderingItems = all_Items.filter((item, idx) => (index-8 <= idx && idx < index))
        setItems(renderingItems);
      } else {
        const filtered = all_Items.filter((item) => item.type === filter);
        const filtered_data = filtered.filter((item, idx) => (index-8 <= idx && idx < index));
        setItems(filtered_data)
      }

      }, [index, filter])

      // 무한 스크롤 -> 레퍼런스 참고해서 구현함 => 이를 활용해서 데이터 올바르게 처리할 로직 구현해야 함 (https://abangpa1ace.tistory.com/118) 참고
      const handleScroll =() => {

        console.log('스크롤 이벤트 발생 중')

        const { scrollHeight, scrollTop, clientHeight } = document.documentElement;

        if(scrollTop === 0){
            (0 < index-8) && setIndex(index-8);
            window.scrollTo(0,1)}

        if (scrollTop + clientHeight >= scrollHeight) {

          if(items.length === 0 || document.documentElement.scrollHeight <= document.documentElement.clientHeight){ // 더 이상 렌더링할 아이템이 없을 경우 -> index를 증가시키지 않음
            setIndex(index-8);
            return;
          } else {
            setIndex(index+8);
          }
          window.scrollTo(0, scrollTop-5)}
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
                <ItemFilter setFilter={setFilter}/>
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