import styled from 'styled-components'

import { motion } from 'framer-motion'

import Robohash from 'react-robohash'

const RobohashComponent = ({ walletAddress }) =>
    <RobohashContainer id='robohash-container'>
        <Robohash name={walletAddress} type='robot' />
    </RobohashContainer>

const RobohashContainer = styled(motion.div)`
    text-align: center;
`

export default RobohashComponent
