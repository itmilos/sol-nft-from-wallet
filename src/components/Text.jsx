import styled from 'styled-components'

const Text = ({ children, size, bold, justify, italic, center, marginBottom }) =>
    <StyledParagraph
        size={size}
        bold={bold}
        justify={justify}
        italic={italic}
        center={center}
        marginBottom={marginBottom}
    >
        {children}
    </StyledParagraph>

const StyledParagraph = styled.p`
    width: 100%;
    line-height: 32px;
    font-size: 24px;
    font-family: Inter, sans-serif;
    font-weight: 400;
    color: rgba(150, 150, 150, 1);
    text-overflow: ellipsis;
    overflow: hidden;
    margin: 0;

    ${props => props.size === 'medium' && `
        line-height: 24px;
        font-size: 16px;
    `}

    ${({ bold }) => bold && 'font-weight: bold;'}
    ${({ justify }) => justify && `
        text-align: justify;
        text-justify: inter-word;
    `}
    ${({ italic }) => italic && 'font-style: italic;'}
    ${({ center }) => center && 'text-align: center;'}
    ${({ marginBottom }) => marginBottom && `margin-bottom: ${marginBottom}`}
`

export default Text
