import styled from 'styled-components'

import bg from '../../assets/index_scale_adoption_mobile.webp'

import LandingPage from './LandingPage'
import QRaftNFTPage from './QRaftNFTPage'
import { Grid } from  'react-loader-spinner'

import store from '../../state/state'

const MobileHomePage = () => {
    const spinner = store(state => state.spinner)
    const phantomWallet = store(state => state.phantomWallet)

    return <Container>
        <Main>
            {phantomWallet ?
                <QRaftNFTPage /> :
                <LandingPage />
            }
            {spinner && <SpinnerBG>
                <Grid
                    height='250'
                    width='250'
                    radius='9'
                    color='white'
                    ariaLabel='three-dots-loading'
                />
            </SpinnerBG>}
        </Main>
        <BGImage src={bg} />
    </Container>
}

const Container = styled.div`
    position: relative;
    width: 100%;
    min-height: 100vh;
    background-color: black;
    color: white;
    text-align: right;
`

const Main = styled.div`
    width: 80%;
    min-height: 100vh;
    padding: 20px 10%;
    position: relative;
    z-index: 3;
    text-align: center;
`

const SpinnerBG = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: 4;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, .9);
`

const BGImage = styled.img`
    width: 70vw;
    position: absolute;
    top: 0;
    right: 0;
    opacity: 0.3;
    z-index: 2;
`

export default MobileHomePage