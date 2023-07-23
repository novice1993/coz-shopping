import { styled } from "styled-components";
import { useEffect } from "react";

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

const Container = styled.div`
    position: absolute;
    transform: translate(10px, -50px);
    padding: 0px;

    display: flex;
    flex-direction: row;
    justify-content: start;
    gap: 5px;
`

const BookmarkButton = styled.div`

    color: ${(props) => (props.bookmark) ? '#FFD361;' : '#DFDFDF;'};
    font-size: 1.5rem;
    cursor: pointer;
`

const Title = styled.div`
    color: white;
    font-weight: bolder;
    font-size: 1.5rem;
`

function Modal ({ item, setModal, bookmark, setBookmark, setToast, setToastContent }) {

    const bookmarkButtonClick = () => {
        setBookmark(!bookmark)
        setToast(true)}

    useEffect(() => {

        if(bookmark === true){
            setToastContent('상품이 북마크에 추가되었습니다.');
            setTimeout(() => { setToast(false) }, 3000);
        } else {
            setToastContent('상품이 북마크에서 제거되었습니다.');
            setTimeout(() => { setToast(false) }, 3000);
        }
    }, [bookmark])

    return (
        <Background onClick={() => {setModal(false)}}>
            <Content>
                <img src={(item.type === 'Brand') ? item.brand_image_url : item.image_url} />
                <ModalCloseButton onClick={() => {setModal(false)}}>&#10005;</ModalCloseButton>
                <Container>
                    <BookmarkButton bookmark={bookmark} onClick={bookmarkButtonClick} >&#9733;</BookmarkButton>
                    <Title>{(item.type === 'Category') && '# '}{(item.type === 'Brand') ? item.brand_name : item.title}</Title>
                </Container>
            </Content>
        </Background>
    )
}

export default Modal;