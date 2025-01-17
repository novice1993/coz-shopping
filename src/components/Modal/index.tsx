import { styled } from "styled-components";
import BookmarkButton from "../BookmarkButton";

import InfoBoxAndModal from "../../models/InfoBoxAndModal";


function Modal (props :InfoBoxAndModal) {

    const { item, bookmark, modalStateChange, bookmarkStateChange } = props;

    return (
        <Background>
            <Content onClick={modalStateChange}>
                <img src={(item.type === 'Brand') ? item.brand_image_url as string : item.image_url as string} />
                <ModalCloseButton>&#10005;</ModalCloseButton>
                <ItemInfoViewer>
                    <BookmarkButton bookmark={bookmark} bookmarkStateChange={bookmarkStateChange} parentComponent='Modal' />
                    <Title>{(item.type === 'Category') && '# '}{(item.type === 'Brand') ? item.brand_name : item.title}</Title>
                </ItemInfoViewer>
            </Content>
        </Background>
    )
}

export default Modal;


const Background = styled.div`

    position: fixed;
    z-index: 99;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(253, 250, 254, 0.5);

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`

const Content = styled.div`

    position: relative;
    z-index: 100;
    width: 744px;
    height: 480px;
    border-radius: 12px;

    & img {
        width: 744px;
        height: 480px;
        border-radius: 12px;
    }
`

const ModalCloseButton = styled.div`

    position: absolute;
    transform: translate(700px, -470px);
    color: rgba(255, 240, 240, 1);
    font-size: 2rem;

    &:hover {
        cursor: pointer;
    }
`

const ItemInfoViewer = styled.div`

    position: absolute;
    transform: translate(10px, -50px);
    padding: 0px;

    display: flex;
    flex-direction: row;
    justify-content: start;
    gap: 5px;
`

const Title = styled.div`

    color: white;
    font-weight: bolder;
    font-size: 1.5rem;
`

