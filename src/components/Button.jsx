import styled from 'styled-components'
import { motion } from 'framer-motion'

const Button = ({ children, onClick }) =>
    <StyledButton
        onClick={onClick}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
    >
        {children}
    </StyledButton>

const StyledButton = styled(motion.button)`
    height: 40px;
    padding: 0 30px;
    font-size: 24px;
    font-family: Inter, sans-serif;
    font-weight: bold;
    color: white;
    background-color: ${({ theme }) => theme.color.purple};
    border: none;
    border-radius: 20px;
    cursor: pointer;

    &:hover: { background-color: white; }

    margin: 20px 0;
`

export default Button