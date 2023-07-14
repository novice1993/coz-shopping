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
    const [index, setIndex] = useState(0); // 렌더링 될 상품 index 관련 상태 


    // 🔴 현재 스크롤 움직임에 따라 (top, bottom) index 상태가 변경 -> 화면에 렌더링 되는 아이템 개수도 변경되고 있음
    // 🔴 변경해야 하는 점 -> index를 전체 개수에 맞추다보니 -> 필터링 걸었을 때도 해당 조건에 맞추어 변경됨 -> 필터에 해당하는 아이템 개수가 8개 미만이어도 index 값을 증가시킴
    //  => filter 상태 활용하여 수정 필요함

    useEffect(() => {
        setIndex(index+8)
    }, [])

      useEffect(() => { // index 변화 -> 화면에 렌더링 되는 아이템 idx도 변화 (화면 scroll과 연동)
        
        // 1) 필터링 설정 안하거나  2) 전체 선택했을 때
        if(filter === '' || filter === 'all'){
            const data = all_bookmark.filter((item, idx) => (index-8 <= idx && idx < index))
            setBookmark_List(data)}

        // 2) 특정 필터링 설정했을 때
        else {
            const filtered_data = all_bookmark.filter((item) => item.type === filter);
            const data = filtered_data.filter((item, idx) => (index-8 <= idx && idx < index));
            setBookmark_List(data)}

    }, [index, filter])


    // 무한 스크롤 -> 레퍼런스 참고해서 구현함 => 이를 활용해서 데이터 올바르게 처리할 로직 구현해야 함 (https://abangpa1ace.tistory.com/118) 참고
    const handleScroll =() => {

        const { scrollHeight, scrollTop, clientHeight } = document.documentElement;

        if(scrollTop === 0){
            console.log('top');

            (0 < index-8) && setIndex(index-8);
            window.scrollTo(0,1);
        }

        if (scrollTop + clientHeight >= scrollHeight) {
            console.log('bottom');
            
            (index < all_bookmark.length) && setIndex(index+8)
            window.scrollTo(0, scrollTop-1)
        }
      }

      useEffect(() => {
        window.addEventListener('scroll', handleScroll); 
        return () => window.removeEventListener('scroll', handleScroll);}, [handleScroll])


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