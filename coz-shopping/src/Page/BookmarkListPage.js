import { styled } from "styled-components";
import { useState, useEffect } from "react";
import Header from "../Component/MainComponent/Header";
import Footer from "../Component/MainComponent/Footer";
import ItemFilter from "../Component/ItemFilter";
import BookmarkItem from "../Component/BookmarkItem";


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

function BookmarkListPage ({
    bookmark_List, setBookmark_List }) { // 북마크 관련 전역 상태

    const all_bookmark = JSON.parse(localStorage.getItem('bookmark'));
    const [filter, setFilter] = useState(''); 

    // 1. 화면 마운트 -> 로컬 데이터를 전역 상태로 지정
    useEffect(() => {setBookmark_List(all_bookmark)}, [])

    return (
        <Container>
            <HeaderBox>
                <Header />
            </HeaderBox>
            <Main>
            <ItemFilter
            filter={filter} setFilter={setFilter}  bookmark_List={bookmark_List} setItems={setBookmark_List} all_Items={all_bookmark} />
                <ItemBox>
                    {bookmark_List.map((item) => {
                        return (<BookmarkItem 
                            key={item.id}
                            // props  1) 렌더링에 사용될 개별 요소  2) 북마크 전역 상태  3) 전역 상태관리 함수 
                            bookmarkItem={item} bookmark_List={bookmark_List} setBookmark_List={setBookmark_List} />) 
                    })}
                </ItemBox>
            </Main>
            <FooterBox>
                <Footer />
            </FooterBox>
        </Container>
    )
}

export default BookmarkListPage;


/**
 * 
 * // 🔴 배열의 index 값 이용해서 무한 스크롤 구현 중 -> 아래/위로 자유롭게 이동 가능하도록 구현 (스크롤 윗 부분도 알아볼 것)
   // 상품 리스트도 동일한 로직 적용해서 수정
 * 
 * 1. index 관련 상태
 * const [index, setIndex] = useState(4); // 화면엪 표시될 상품 index 관련 상태 
 * 
 * 
 * 2. 마운트 시 useEffect 
 * const data = all_bookmark.filter((item, idx) => {
            return (idx<index);
        })
        setBookmarkPage(data);


    3. 무한 스크롤 관련 로직

    // 무한 스크롤 -> 레퍼런스 참고해서 구현함 => 이를 활용해서 데이터 올바르게 처리할 로직 구현해야 함 (https://abangpa1ace.tistory.com/118) 참고
    const handleScroll =() => {

        const { scrollHeight, scrollTop, clientHeight } = document.documentElement;

        if (scrollTop + clientHeight >= scrollHeight) {
            if(index < all_bookmark.length){
            setIndex(index+4);}

            window.scrollTo(0, scrollTop-1)
        }
      }

      useEffect(() => {
        window.addEventListener('scroll', handleScroll); 
        return () => window.removeEventListener('scroll', handleScroll);
      }, [handleScroll])

      useEffect(() => {
        const data = all_bookmark.filter((item, idx) => {
            return (idx>index-5 && idx<index)
        })
        setBookmarkPage(data);

      }, [index])


 */