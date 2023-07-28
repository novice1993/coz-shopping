import { styled } from "styled-components";
import { useEffect } from "react";

const Container = styled.div`
    position: absolute;
    z-index: 999;
    transform: translate(145px,900px);
    display: none;

    &.notification {
        display: block;
        transition: transform 2s ease-in-out;
        animation: toast-in-right 2s;
    }

    @keyframes toast-in-right {
        from {
          transform: translate(1450px,700px);
        }
        to {
          transform: translate(1080px,700px);
        }
    }
`

const Message = styled.div`
    position: relative;
    padding: 14px;
    border: 1px solid black;
    border-radius: 0.8rem;
    box-shadow: 1px 1px 8px rgba(184, 184, 184, 0.89);
    
    background-color: white;
    color: black;
    font-weight: bolder;
    font-size: 1.2rem;
`

const BookmarkButton = styled.span`
    color: ${(props) => (props.toastContent==='상품이 북마크에서 제거되었습니다.') ? '#DFDFDF;' : '#FFD361;'};
`


function Toast ({ toast, toastContent }) {

    return (
        <Container className={(toast) ? 'notification' : ''}>
            <Message toastContent={toastContent}>
                <BookmarkButton toastContent={toastContent}>&#9733;</BookmarkButton> {toastContent}
            </Message>
        </Container>
    )
}

export default Toast;