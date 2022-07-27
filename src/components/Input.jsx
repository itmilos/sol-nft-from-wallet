import styled from 'styled-components'

const Input = ({ label, onChange }) =>
    <Container>
        <StyledLabel>{label}</StyledLabel>
        <StyledInput onChange={onChange} />
    </Container>

const Container = styled.div`
    width: 60%;
    padding: 0 20%;
`

const StyledLabel = styled.label`
    line-height: 32px;
    display: block;
    font-size: 16px;
    font-weight: 400;
    color: rgba(150, 150, 150, 1);
`

const StyledInput = styled.input`
    width: 100%;
    height: 36px;
    border-radius: 10px;
    border: none;
    outline: none;
    line-height: 24px;
    font-size: 16px;
    font-family: Inter, sans-serif;
    font-weight: 400;
    background-color: #9945ff54;
    color: white;
    padding: 6px 20px;

    &:hover { background-color: #9945ff72; }
    &:focus { background-color: #9945ff90; }
`

export default Input
