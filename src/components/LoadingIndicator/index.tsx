import { styled } from "styled-components";
import { PulseLoader } from "react-spinners";

const indicatorMent = '상품 정보를 불러오고 있습니다';

const LoadingIndicator = () => {

    return (
        <Container>
            <br/><h2>{indicatorMent}</h2><br/>
            <PulseLoader color="rgba(56, 71, 204, 1)" /><br/><br/>
        </Container>
    )
}

export default LoadingIndicator;

const Container = styled.div`
    text-align: center;
    color: rgba(56, 71, 204, 1);
`