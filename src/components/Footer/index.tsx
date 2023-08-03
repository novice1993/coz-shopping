import { styled } from "styled-components";

const text1 = '개인정보 처리방침 | 이용 약관'
const text2 = 'All rights reserved @ Codestates'


function Footer () {

    return (
        <Container>
            <Text1>{text1}</Text1>
            <Text2>{text2}</Text2>
        </Container>
    )
}

export default Footer;


const Container = styled.div`

    height: 100%;
    display: flex;
    flex-direction: column;
    border-top: 0.1px solid gray;
    color: gray;
`

const Text1 = styled.div`

    flex: 1 0 0;
    display: flex;
    justify-content: center;
    align-items: end;
    
`
const Text2 = styled.div`

    flex: 1 0 0;
    text-align: center;
`