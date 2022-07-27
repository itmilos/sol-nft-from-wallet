import { useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { motion } from 'framer-motion'

import AnimatedPage from './AnimatedPage'
import Heading from '../../components/Heading'
import Text from '../../components/Text'

import AnimatedSection from '../../components/AnimatedSection'

import ape1 from '../../assets/mirko-basic-react-mag.png'
import ape2 from '../../assets/milos-rujevic-web-wizzard.png'
import ape3 from '../../assets/marko-grudic-marketing-guru.png'

const Member = ({
    backgroundImage,
    name,
    title,
    margin,
    setShowModal
}) =>
    <TeamMember
        margin={margin}
        onClick={() => setShowModal(true)}
    >
        <Shader>
            <Mask backgroundImage={backgroundImage} />
        </Shader>
        <NameLabel>{name}</NameLabel>
        <TitleLabel>{title}</TitleLabel>
    </TeamMember>

const AboutPage = () => {
    const [showModal, setShowModal] = useState(false)

    return <AnimatedPage withMargin>
        {showModal && <Modal
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
        />}
        <LeftSide>
            <AnimatedSection key='the-beginnings' delay={.4}>
                <Heading type='small'>The Beginnings</Heading>
                <Text size='medium' justify marginBottom='20px'>We are a team of close friends with multiple skill sets evolving around software creation and advertisement. It all began with several inhouse projects and ideas we had and worked on. Not long after we realised the full potential of this team. Capable of many and without impregnable obstacles! Step by step, app by app, we got a strong head start for our clients.</Text>
            </AnimatedSection>
            <AnimatedSection key='history' delay={.6}>
                <Heading type='small'>History</Heading>
                <Text size='medium' justify marginBottom='20px'>With a proven history of delivering top-notch quality products and services. We were able to scale the whole process and determine our ideal scenario:</Text>
                <Text size='medium' justify italic marginBottom='20px'>"Leave a mark we could be all proud of!"</Text>
            </AnimatedSection>
            <AnimatedSection key='how' delay={.8}>
                <Heading type='small'>How?</Heading>
                <Text size='medium' justify marginBottom='20px'>How? By cooperating only with reputable people and companies who are serious about the business with similar mindset as ours:</Text>
                <Text size='medium' justify italic marginBottom='20px'>"Creation of the quality, unique products and user experiences with a high level of attention towards details!"</Text>
                <Text size='medium' justify marginBottom='20px'>Sometimes things tend to look hard until we roll up our sleeves, jump into heads first with passion and Strength to overcome any obstacle! If you feel our story in your gutt and need such service, feel free to contact us!</Text>
            </AnimatedSection>
        </LeftSide>
        <RightSide
            initial={{ scale: 0 }}
            animate={{ scale: 1, transition: { delay: .3 } }}
        >
            <Heading type='small'>Meet the TEAM</Heading>
            <TeamContainer>
                <Member
                    margin
                    backgroundImage={ape1}
                    name='Mirko Basic'
                    title='Master Blaster'
                    setShowModal={setShowModal}
                />
                <Member
                    backgroundImage={ape2}
                    name='Milos Rujevic'
                    title='Mad Scientist'
                    setShowModal={setShowModal}
                />
                <Member
                    backgroundImage={ape3}
                    name='Marko Grudic'
                    title='Con Artist'
                    setShowModal={setShowModal}
                />
            </TeamContainer>
        </RightSide>
    </AnimatedPage>
}

const LeftSide = styled.div`
    width: calc(60% - 50px);
    display: inline-block;
    vertical-align: top;
    padding: 0 50px 50px 0;
`

const RightSide = styled(motion.div)`
    width: 40%;
    display: inline-block;
    vertical-align: top;
`

const Modal = styled(motion.div)`
    width: 70%;
    min-height: 300px;
    position: absolute;
    top: 0;
    z-index: 20;
    border-radius: 20px;
    background-color: rgba(70, 70, 70, .9);
    cursor: pointer;
`

const TeamContainer = styled.div`
    width: 100%;
    padding-bottom: 50px;
`

const TeamMember = styled.div`
    width: calc(45% - 40px);
    min-height: 100px;
    position: relative;
    display: inline-block;
    vertical-align: top;
    background-color: #4e44ce27;
    border-radius: 10px;
    padding: 20px;
    cursor: pointer;
    ${({ margin }) => margin && 'margin: 0 5% 20px 0;'}
`

const gradient = keyframes`
    0% {
        background-position: 0 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0 50%;
    }
`

const Shader = styled.div`
    width: 100%;
    height: 0;
    position: relative;
    padding-top: 100%;
    background: black;
    background-position: center;
    background-size: 100%;
    mix-blend-mode: color-dodge;
    background: #4B0082;
    background-attachment: fixed;
    background: linear-gradient(45deg, black, #9945FF, #f4310e, #f58308, #14F195, #777, #3c5e6d, #f4310e, #9945FF, #14F195, #14F195);
    background-size: 540% 540%;
    animation: ${gradient} 4s ease infinite;
    animation-timing-function: ease, step-start, cubic-bezier(0.1, 0.7, 1.0, 0.1);
    border-radius: 50%;
    margin-bottom: 20px;
`

const Mask = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    border: 3px solid #14F195;
    border-radius: 50%;
    background: black;
    background-size: 100%;
    background-position: center;
    mix-blend-mode: multiply;
    ${({ backgroundImage }) => `background-image: url(${backgroundImage});`}
    background-repeat: no-repeat;
`

const NameLabel = styled.p`
    line-height: 32px;
    font-size: 22px;
    font-family: Inter, sans-serif;
    font-weight: 400;
    color: #fff;
    text-align: center;
    margin: 0;
`

const TitleLabel = styled.p`
    line-height: 24px;
    font-size: 16px;
    font-family: Inter, sans-serif;
    font-weight: 400;
    color: rgba(150, 150, 150, 1);
    text-align: center;
    font-style: italic;
    margin: 0;
`

export default AboutPage
