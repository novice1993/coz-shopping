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

function BookmarkListPage ({ bookmark_List, setBookmark_List }) {

    const all_bookmark = JSON.parse(localStorage.getItem('bookmark')); 
    const [bookmarkPage_Items, setBookmarkPage] = useState([]); // 북마크 페이지 화면에 노출되는 데이터 

    useEffect(() => {
        setBookmarkPage(all_bookmark)
    }, [])

    
    return (
        <Container>
            <HeaderBox>
                <Header />
            </HeaderBox>
            <Main>
            <ItemFilter bookmarkPage_Items={bookmarkPage_Items} setItems={setBookmarkPage} all_Items={all_bookmark} />
                <ItemBox>
                    {bookmarkPage_Items.map((item) => {
                        return (<BookmarkItem 
                            key={item.id}
                            bookmarkItem={item} bookmark_List={bookmark_List} setBookmark_List={setBookmark_List} // 로컬에 저장된 북마크 데이터
                            bookmarkPage_Items={bookmarkPage_Items} setBookmarkPage={setBookmarkPage}/>) // 북마크 리스트 페이지에 렌더링 되는 데이터 (필터링에 따라 변경됨)
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