import styled from 'styled-components'
import { motion } from 'framer-motion'

import AnimatedPage from './AnimatedPage'
import Heading from '../../components/Heading'
import Text from '../../components/Text'
import AnimatedSection from '../../components/AnimatedSection'

import qr from '../../assets/dao-hero-cropped.webp'

const LandingPage = () =>
    <AnimatedPage>
        <LeftSide>
            <AnimatedSection key='project-idea'>
                <Heading type='small'>Project Idea</Heading>
                <Text size='medium' marginBottom='30px'>Create a new way of socialising with the people. Generate an image with the NFT in your possession that you are proud of and add a QR code which contains link to your social networks. Show the people who are you and what you like.</Text>
            </AnimatedSection>
            <AnimatedSection key='stickerize-image' delay={.5}>
                <Heading type='small'>Modern Visit Card</Heading>
                <Text size='medium' marginBottom='30px'>Who needs a vintage visiting card? Order stickers with your newly generated image and share it with the people. Share your shiny sticker, connect with the similar people, people who share the interest in the same NFT collection.</Text>
            </AnimatedSection>
            <AnimatedSection key='sell-nft' delay={.7}>
                <Heading type='small'>Sell the NFT</Heading>
                <Text size='medium' marginBottom='30px'>Creators, resellers, advertise your product! Create an image with the NFT you want to sell and add a link to the application where it's being sold. Put the image on your social networks or share it with the people.</Text>
            </AnimatedSection>
            <AnimatedSection key='sell-nft' delay={.9}>
                <Heading type='small'>New Graffiti</Heading>
                <Text size='medium' marginBottom='30px'>Mint your art creations into the blockchain and create a sticker out of it. Link it to the social of your choice so people can see your work. Stickerize the city!</Text>
            </AnimatedSection>
        </LeftSide>
        <RightSide
            initial={{ scale: 0 }}
            animate={{ scale: 1, transition: { delay: 1.1 } }}
        >
            <QR src={qr} />
        </RightSide>
    </AnimatedPage>

const LeftSide = styled.div`
    width: calc(70% - 50px);
    display: inline-block;
    vertical-align: top;
    padding: 0 50px 0 0;
`

const RightSide = styled(motion.div)`
    width: 30%;
    display: inline-block;
    vertical-align: top;
    padding-top: 50px;
`

const QR = styled.img`
    width: 100%;
`

export default LandingPage