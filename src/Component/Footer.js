import { styled } from "styled-components";

const Container = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    border-top: 0.1px solid gray;

    color: gray;
`

const Content1 = styled.div`
    flex: 1 0 0;
    
    display: flex;
    justify-content: center;
    align-items: end;
    
`
const Content2 = styled.div`
    flex: 1 0 0;
    text-align: center;
`


function Footer () {

    return (
        <Container>
            <Content1>개인정보 처리방침 | 이용 약관</Content1>
            <Content2>All rights reserved @ Codestates</Content2>
        </Container>
    )
}

export default Footer;