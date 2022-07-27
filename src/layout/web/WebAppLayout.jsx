import styled, { keyframes } from 'styled-components'
import { AnimatePresence } from 'framer-motion'
import { Routes, Route, useLocation } from 'react-router-dom'

import bg from '../../assets/index_scale_adoption.webp'
import circle from '../../assets/circle.png'
import solana from '../../assets/s-logo.webp'

import Header from './Header'
import TitleContainer from './TitleContainer'
import LandingPage from '../../pages/web/LandingPage'
import ExamplePage from '../../pages/web/ExamplePage'
import QRPage from '../../pages/web/QRPage'
import AboutPage from '../../pages/web/AboutPage'
import AboutPage2 from '../../pages/web/About2Page'

const ComputerHomePage = () => {
    const location = useLocation()

    return <Container>
        <Main>
            <Header />
            <AnimatePresence>
                <TitleContainer />
                <Content>
                    <Routes location={location} key={location.pathname}>
                        <Route path='/' element={<LandingPage />} />
                        <Route path='example' element={<ExamplePage />} />
                        <Route path='qr' element={<QRPage />} />
                        <Route path='about' element={<AboutPage2 />} />
                    </Routes>
                </Content>
            </AnimatePresence>
        </Main>
        <SolanaLogo src={solana} />
        <BGImage src={bg} />
        <MovingCircle src={circle} alt='background-circle' />
    </Container>
}

const Container = styled.div`
    position: relative;
    width: 100%;
    height: 100vh;
    background-color: black;
    overflow: hidden;
`

const Main = styled.div`
    width: 100%;
    height: 100vh;
    position: relative;
    z-index: 3;
`

const Content = styled.div`
    width: 100%;
    position: relative;
    height: calc(100% - 124px);
    overflow-y: scroll;
`

const BGImage = styled.img`
    position: absolute;
    top: 0;
    right: 0;
    z-index: 2;
    width: 60%;
    opacity: .2;
`
const SolanaLogo = styled.img`
    width: 200px;
    position: absolute;
    bottom: 0%;
    left: 15%;
    z-index: 2;
    opacity: .3;
`

const pulse = keyframes`
    0% {
        transform : scale(.9) translateX(-40%) translateY(-10%) rotate(180deg);
        opacity   : .4;
    }
    50% {
        transform : scale(1.3) translateX(-40%) translateY(25%) rotate(0);
        opacity   : .6;
    }
    100% {
        transform : scale(.8) translateX(20%) translateY(25%) rotate(180deg);
        opacity   : .3;
    }
`

const MovingCircle = styled.img`
    height: 700px;
    width: 700px;
    position: absolute;
    left: -100px;
    bottom: -100px;
    z-index: 1;
    animation: ${pulse} 5s linear   alternate infinite;
`

export default ComputerHomePage