import { styled } from "styled-components";
import { useSelector } from "react-redux";

import useGetFilterdItemList from "../hooks/useGetFilterdItemList";
import StateProps from "../models/StateProps";
import ItemProps from "../models/ItemProps";

import Header from "../components/Header";
import Footer from "../components/Footer";
import ItemFilter from "../components/ItemFilter";
import ItemViewer from "../components/ItemViewer";


function BookmarkListPage () {

    const bookmarkList = useSelector((state: StateProps) => state.bookmarkList);
    const { filterdItemList, itemFilterChange } = useGetFilterdItemList(bookmarkList);

  
    return (
        <Container>
            <HeaderBox>
                <Header />
            </HeaderBox>
            <Main>
                <ItemFilter itemFilterChange={itemFilterChange}/>
                <ItemBoxContainer>
                    <ItemBox>
                        {filterdItemList.map((item: ItemProps) => {
                            return (<ItemViewer key={item.id} item={item}/>)
                        })}
                    </ItemBox>
                </ItemBoxContainer>
            </Main>
            <FooterBox>
                <Footer />
            </FooterBox>
        </Container>
    )
}

export default BookmarkListPage;


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

const ItemBoxContainer = styled.section`

    display: flex;
    flex-direction: row;
    justify-content: center;
`

const ItemBox = styled.div`

    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
`