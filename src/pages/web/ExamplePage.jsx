import { useState } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'

import AnimatedPage from './AnimatedPage'
import Heading from '../../components/Heading'
import Text from '../../components/Text'
import Button from '../../components/Button'

import degen from '../../assets/degen-ape.png'
import qr from '../../assets/qr-code.png'

const ExamplePage = () => {
    const [page, setPage] = useState(0)

    return <AnimatedPage>
        <LeftSide>
            {page >= 1 && <Section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                <Heading type='small'>Connect Phantom Wallet</Heading>
                <Text size='medium' marginBottom='30px'>Connect your Phantom Wallet with the application and choose the NFT you are the most proud of.</Text>
            </Section>}

            {page >= 3 && <Section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                <Heading type='small'>Enter the Link</Heading>
                <Text size='medium' marginBottom='30px'>Enter the link of the page you want to connect to your NFT. It can be LinkTree, LinkedIn, YouTube, web page, etc.</Text>
            </Section>}

            {page >= 5 && <Section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                <Heading type='small'>Get Sticker or NFT</Heading>
                <Text size='medium' marginBottom='30px'>Enter your address and we'll send you your generated sticker. Another thing you can do, you can mint your newly created image with your QR code, mint it and send it to someone.</Text>
            </Section>}

            {page !== 5 && <Button onClick={() => setPage(page => ++page)}>
                {page === 0 && 'Start'}
                {page === 1 && 'Select NFT'}
                {page === 2 && 'Link Social'}
                {page === 3 && 'Generate QR Code'}
                {page === 4 && 'Create Sticker'}
            </Button>}
        </LeftSide>
        <RightSide>
            {page >= 2 && <ImageContainer
                initial={{ x: '100%', opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: '-100%', opacity: 0 }}
                transition={{ duration: .3 }}
            >
                <MainImage src={degen} />
            </ImageContainer>}
            {page >= 4 && <ImageContainer
                offset={30}
                initial={{ x: '100%', opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: '-100%', opacity: 0 }}
                transition={{ duration: .3 }}
                whileHover={{ scale: 1.01, x: '2%' }}
            >
                <QRImage src={qr} />
            </ImageContainer>}
        </RightSide>
    </AnimatedPage>
}

const LeftSide = styled.div`
    width: 50%;
    display: inline-block;
    vertical-align: top;
`

const RightSide = styled.div`
    width: 50%;
    display: inline-block;
    vertical-align: top;
    position: relative;
`

const Section = styled(motion.div)`
    width: 100%;
`

const ImageContainer = styled(motion.div)`
    width: 400px;
    position: absolute;
    top: 70px;
    left: 140px;
    transform: perspective(500px) rotateY(20deg);
`

const MainImage = styled.img`
    width: 100%;
    transform: perspective(500px) rotateY(20deg);
    border-radius: 5px;
    box-shadow:
        -2px 0 1px #fff,
        -2px 0 20px #fff,
        -10px 0 10px #0ba9ca,
        -10px 0 20px #0ba9ca
    ;
`

const QRImage = styled.img`
    width: 100%;
    position: relative;
    left: 30px;
    transform: perspective(500px) rotateY(20deg);
    filter: drop-shadow(-10px 10px 10px rgba(255, 255, 194, .6));
`

export default ExamplePage
