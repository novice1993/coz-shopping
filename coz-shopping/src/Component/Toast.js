import { styled } from "styled-components";

const Container = styled.div`
    position: absolute;
    transform: translate(1450px,650px);
    display: none;

    &.notification {
        display: block;
        transition: transform 2s ease-in-out;
        animation: toast-in-right 2s;
    }

    @keyframes toast-in-right {
        from {
          transform: translate(1450px,650px);
        }
        to {
          transform: translate(950px,650px);
        }
    }
`

const Message = styled.div`
    position: relative;
    border: 1px solid black;
    
    background-color: blue;
    color: white;
    font-size: 2rem;
`


function Toast ({ toast, toastContent }) {
    return (
        <Container className={(toast) ? 'notification' : ''}>
            <Message toastContent={toastContent}>{toastContent}</Message>
        </Container>
    )
}

export default Toast;