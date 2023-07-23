import { styled } from "styled-components";
import { useState, useEffect } from "react";
import Header from "../Component/MainComponent/Header";
import Footer from "../Component/MainComponent/Footer";
import ItemFilter from "../Component/ItemFilter";
import Item from "../Component/Item";


function ItemListPage ({ bookmark_List, setBookmark_List }) {

    const [items, setItems] = useState([]); // 서버에서 받아오는 상품 데이터
    const [filter, setFilter] = useState(''); 

    const all_Items = JSON.parse(localStorage.getItem('all_Items')); // 로컬에 저장한 상품 데이터

    /**
     *  1. 로직을 3개 만들어야 하나?
     *    1) 처음에 컴포넌트 마운트 되었을 때 -> 서버에서 데이터 받아온 후 렌더링 (중복 검사는 안해도 될듯?)
     *    2) 스크롤 이벤트 발생했을 때 (새롭게 데이터 받아옴 + 중복검사?)
     *    3) 필터 설정했을 때 (필터 설정,,,) -> 해당 상태 필터로 옮기는 게 더 맞지 않나?
     */



    // 🟢 1) 서버에서 데이터 받아오는 로직인 것 같음

    useEffect(() => { // index 혹은 filter 변경 -> 화면에 렌더링 되는 아이템 변화 (scroll 움직임과 연동)
      
      const request = async () => {
        try {
        
          // 1) 서버에서 데이터 불러온 후 -> 파싱함
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

            // 3-2. 저장했던 데이터가 없을 경우
          } else {
            // 서버에서 받아온 데이터 저장 
            localStorage.setItem('all_Items', JSON.stringify(data));}

        } catch (error) {
          console.log('Response error', error)}
        }
  
      request();

      if(filter === '' || filter === 'all'){
        setItems(all_Items);

      } else {
        const filtered_items = all_Items.filter((item) => item.type === filter);
        setItems(filtered_items)
      }

      }, [filter])





      // 무한 스크롤 -> 레퍼런스 참고해서 구현함 => 이를 활용해서 데이터 올바르게 처리할 로직 구현해야 함 (https://abangpa1ace.tistory.com/118) 참고
      const handleScroll =() => {

        const { scrollHeight, scrollTop, clientHeight } = document.documentElement;

        if (scrollTop + clientHeight >= scrollHeight) {


          const request = async () => {
            try {
            
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
    
                // 3-2. 저장했던 데이터가 없을 경우
              } else {
                // 서버에서 받아온 데이터 저장 
                localStorage.setItem('all_Items', JSON.stringify(data));}
    
            } catch (error) {
              console.log('Response error', error)}
            }
      
          request();
    
          if(filter === '' || filter === 'all'){
            setItems(all_Items);
    
          } else {
            const filtered_items = all_Items.filter((item) => item.type === filter);
            setItems(filtered_items)
          }
          

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