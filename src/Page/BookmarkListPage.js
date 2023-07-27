import { styled } from "styled-components";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import ItemFilter from "../Component/ItemFilter";
import BookmarkItem from "../Component/BookmarkItem";


function BookmarkListPage () {

    const bookmarkList = useSelector(state => state.bookmarkList);
    const [filter, setFilter] = useState(''); 


  
    return (
        <Container>
            <HeaderBox>
                <Header />
            </HeaderBox>
            <Main>
                <ItemFilter setFilter={setFilter}/>
                <ItemBox>
                    {bookmarkList.map((item) => {
                        return (<BookmarkItem key={item.id} bookmarkItem={item} filter={filter}/>)
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