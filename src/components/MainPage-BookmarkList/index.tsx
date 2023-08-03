import { styled } from "styled-components";
import ItemViewer from "../ItemViewer";
import { useSelector } from "react-redux";
import StateProps from "../../models/StateProps";

const sectionTitle = '북마크 리스트'
const emptyMessage = '상품이 없습니다'

function BookmarkList () {

    const bookmarkList = useSelector((state: StateProps) => state.bookmarkList);

    return (
        <Container>
            <Main>
                <Title>{sectionTitle}</Title>
                <ItemBox>
                    { (bookmarkList.length !== 0) ?
                    bookmarkList.map((item, idx) => {
                        return (idx < 4) && <ItemViewer key={item.id} item={item}/>
                    })
                    : <Emptybox>{emptyMessage}</Emptybox>
                    }
                </ItemBox>
            </Main>
        </Container>
    )
}

export default BookmarkList;

const Container = styled.div`

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`

const Main = styled.main`

    display: flex;
    flex-direction: column;
    margin-top: 20px;
    align-items: flex-start;
`

const Title = styled.h2`

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