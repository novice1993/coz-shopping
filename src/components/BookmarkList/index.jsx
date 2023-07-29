import { styled } from "styled-components";
import Item from "../ItemViewer";
import { useSelector } from "react-redux";


function BookmarkList () {

    const bookmarkList = useSelector(state => state.bookmarkList);

    return (
        <Container>
            <Title>북마크 리스트</Title>
            <ItemBox>
                { (bookmarkList.length !== 0) ?
                bookmarkList.map((item, idx) => {
                    return (idx < 4) && <Item key={item.id} item={item}/>
                })
                : <Emptybox>상품이 없습니다</Emptybox>
                }
            </ItemBox>
        </Container>
    )
}

export default BookmarkList;

// 컴포넌트 생성
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
    margin-bottom: 20px;
    margin-left: 45px;
    margin-right: 45px;

`