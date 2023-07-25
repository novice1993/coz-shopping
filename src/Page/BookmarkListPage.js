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


    useEffect(() => { // index 혹은 filter 변경 -> 화면에 렌더링 되는 아이템 변화 (scroll 움직임과 연동)
  
        // 1) 필터링 설정 안하거나 or '전체' 선택했을 때
        if(filter === '' || filter === 'all'){
            setBookmark_List(all_bookmark)
        }

        // 2) 특정 필터링 설정했을 때
        else {
            const filtered_data = all_bookmark.filter((item) => item.type === filter);
            setBookmark_List(filtered_data)}

    }, [filter])


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
                            all_bookmark={all_bookmark} filter={filter}/>)
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