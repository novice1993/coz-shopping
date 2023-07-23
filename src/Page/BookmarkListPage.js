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
`

const FooterBox = styled.div`
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

function BookmarkListPage ({
    bookmark_List, setBookmark_List }) {

    const all_bookmark = JSON.parse(localStorage.getItem('bookmark'));
    const [filter, setFilter] = useState(''); 
    const [index, setIndex] = useState(0); // 화면에 표시할 아이템 개수 관련 상태


    useEffect(() => {setIndex(8)}, []) // 화면에 표시할 아이템 개수
    useEffect(() => {setIndex(8)}, [filter]) // filter 변경 -> index 초기화


    useEffect(() => { // index 혹은 filter 변경 -> 화면에 렌더링 되는 아이템 변화 (scroll 움직임과 연동)
  
        // 1) 필터링 설정 안하거나 or '전체' 선택했을 때
        if(filter === '' || filter === 'all'){
            const data = all_bookmark.filter((item, idx) => (index-8 <= idx && idx < index))

            console.log(data);
            setBookmark_List(data)}

        // 2) 특정 필터링 설정했을 때
        else {
            const filtered = all_bookmark.filter((item) => item.type === filter);
            const filtered_data = filtered.filter((item, idx) => (index-8 <= idx && idx < index));

            console.log(filtered_data);
            setBookmark_List(filtered_data)}

    }, [index, filter])


    const handleScroll =() => { // 스크롤 위,아래로 이동 -> 렌더링되는 아이템 변경

        const { scrollHeight, scrollTop, clientHeight } = document.documentElement;

        if(scrollTop === 0){

            (0 < index-8) && setIndex(index-8);
            window.scrollTo(0,1);
        }

        if (scrollTop + clientHeight >= scrollHeight) { 

            let standard_Length; // filter에 따라 렌더링 기준이 되는 index 다르게 적용

            if (filter === '' || filter === 'all') {
                standard_Length = all_bookmark.length }
            
            else {
                const filtered = all_bookmark.filter((item) => item.type === filter);
                const filtered_data = filtered.filter((item, idx) => (index-8 <= idx && idx < index));

                standard_Length = filtered_data.length;}

            (index < standard_Length) && setIndex(index+8);
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
                <ItemFilter setFilter={setFilter}/>
                <ItemBox>
                    {bookmark_List.map((item) => {
                        return (<BookmarkItem 
                            key={item.id}
                            bookmarkItem={item} // 1) 렌더링 할 개별 아이템
                            bookmark_List={bookmark_List} setBookmark_List={setBookmark_List} // 2) 북마크 관련 전역 상태 -> 북마크 등록/삭제 연관
                            all_bookmark={all_bookmark} index={index} filter={filter}/>)
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