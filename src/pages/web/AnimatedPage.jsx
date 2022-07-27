import styled from 'styled-components'
import { motion } from 'framer-motion'

const AnimatedPage = ({ children, withMargin }) =>
    <Content
        initial={{ x: '100%', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: '-100%', opacity: 0 }}
        transition={{ duration: .3 }}
        withMargin={withMargin}
    >
        {children}
    </Content>

const Content = styled(motion.div)`
    position: relative;
    width: 70%;
    min-height: calc(100vh - 154px);
    padding: 0 15%;
    z-index: 3;
    ${({ withMargin }) => withMargin && 'margin-bottom: 100px;'}
`

export default AnimatedPage