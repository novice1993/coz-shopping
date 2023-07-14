import { styled } from "styled-components";
import BookmarkItem from "../BookmarkItem";
import { useEffect } from "react";

const Container = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
`

const Title = styled.div`
    flex: 1 0 0;
    padding-top: 10px;
    padding-left: 50px;

    font-weight: bolder;
    font-size: 1.2rem;
`

const ItemBox = styled.div`
    flex: 9 0 0;

    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
    gap: 95px;

`

const Emptybox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    font-size: 2rem;
    font-weight: 345;
    color: gray;

    border: 1px solid gray;
    width: 100%;
    margin: 10px;
    margin-left: 45px;
    margin-right: 45px;

`


function BookmarkList ({ bookmark_List, setBookmark_List }) {

    // MainPage로 이동 시 -> 로컬 스토리지에 있는 전체 북마크 리스트를 화면에 불러옴
    useEffect(() => {
        const all_bookmark = JSON.parse(localStorage.getItem('bookmark'));
        setBookmark_List(all_bookmark);
    }, [])

    return (
        <Container>
            <Title>북마크 리스트</Title>
            <ItemBox>
                { (bookmark_List.length !== 0) ?
                bookmark_List.map((bookmarkItem, idx) => {
                    return (idx < 4) && <BookmarkItem key={bookmarkItem.id} bookmarkItem={bookmarkItem} bookmark_List={bookmark_List} setBookmark_List={setBookmark_List}/>
                })
                : <Emptybox>상품이 없습니다</Emptybox>
                }
            </ItemBox>
        </Container>
    )
}

export default BookmarkList;