import styled from 'styled-components'

const Input = ({ label, onChange, fullWidth, marginBottom }) =>
    <Container fullWidth={fullWidth} marginBottom={marginBottom}>
        <StyledLabel>{label}</StyledLabel>
        <StyledInput onChange={onChange} />
    </Container>

const Container = styled.div`
    width: 60%;
    padding: 0 20%;

    ${({ fullWidth }) => fullWidth && `
        width: 100%;
        padding: 0;
    `}

    ${({ marginBottom }) => marginBottom && `margin-bottom: ${marginBottom};`}
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
    box-sizing: border-box;
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
