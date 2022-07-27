import styled from 'styled-components'

const Heading = ({ type, marginBottom, children }) => type === 'small' ?
    <SmallHeading marginBottom={marginBottom}>{children}</SmallHeading> :
    <BigHeading marginBottom={marginBottom}>{children}</BigHeading>

const commonHeadingProps = `
    font-family: Inter, sans-serif;
    color: whirete;
`

const BigHeading = styled.h1`
    ${commonHeadingProps}
    line-height: 72px;
    font-size: 64px;
    letter-spacing: -3px;
    color: white;
    margin: 0;

    ${({ marginBottom }) => marginBottom && `margin-bottom: ${marginBottom}`}
`

const SmallHeading = styled.h2`
    ${commonHeadingProps}
    line-height: 40px;
    font-size: 32px;
    letter-spacing: -2px;
    color: white;
    margin: 0;

    ${({ marginBottom }) => marginBottom && `margin-bottom: ${marginBottom}`}
`

export default Heading