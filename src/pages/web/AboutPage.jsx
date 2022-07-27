import styled, { keyframes } from 'styled-components'

import AnimatedPage from './AnimatedPage'

import ape from '../../assets/milos-rujevic-web-wizzard.png'
import ape2 from '../../assets/mirko-basic-react-mag.png'
import ape3 from '../../assets/marko-grudic-marketing-guru.png'

const AboutPage = () =>
    <AnimatedPage>
        <p style={{color:'#fff'}}>We're an organization of close friends that offers software development and advertising services.
        </p>
        <p style={{color:'#fff'}}>
            Our team creates high-quality products and provides an overall unique user experience. We cooperate with like-minded people who are serious about the work and share our business philosophy.
        </p>

        <div className='container'>
            <div className='item'>
                <Container>
                    <ShaderLayer>
                        <Mask2 />
                    </ShaderLayer>
                </Container>
                <Container2>
                    <div className="flip section">
                        <a href="https://www.linkedin.com/in/basic-mirko/"><span data-hover="Dev.">Mirko Basic</span></a>
                    </div>
                </Container2>
                <p>
                    Full stack developer, who is tackling the waves on web3 like a childs play!
                    He built his career around systematical approach & leave no stones unturned.
                    Driven by challenges and a strong will to stir the technologies into a more user friendly innovations!
                    Moves like a butterfly stings like a full-proof system.
                </p>

            </div>
            <div className='item'>
                <Container>
                    <ShaderLayer2>
                        <Mask3 />
                    </ShaderLayer2>
                </Container>
                <Container2>
                    <div className="flip section">
                        <a href="https://www.linkedin.com/in/marko-grudic/"><span data-hover="Con artist">Marko Grudic</span></a>
                    </div>
                </Container2>
                <p>Con artist. Those who are in marketing are devils minions. In Markos case his career path direction is now more specified related to the fields of crypto, web3, real estate & employment.
                    His favorite part of the job is: promoting great things which are beneficial for the masses & being fully confident in the projects, teams behind it.
                </p>
            </div>
            <div className='item'>
                <Container>
                    <ShaderLayer3>
                        <Mask />
                    </ShaderLayer3>
                </Container>
                <Container2>
                    <div className="flip section">
                        <a href="https://www.linkedin.com/in/itmilos-delivery-manager-serbia-germany/"><span data-hover="web3 mad">Milos Rujevic</span></a>
                    </div>
                </Container2>
                <p>Innovative mad scientist of the web3. With a proven history of implementing key details/innovations into companies as well as systems. Milos built his career around problem solving & creative thinking!
                    Creativity & functionality tend to go against each other.
                    Milos has a history & strong knowledge in software development as well as business development which redefined the whole Creative thinking term.
                    There is always a smart and light solutions for great achievements!
                </p>
            </div>
        </div>

    </AnimatedPage>

const Container = styled.div`
    width: 100%;
    height: 220px;
    z-index: 99999999;
    position: relative;
    // overflow: hidden;
    // backface-visibility: hidden;
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

const ShaderLayer = styled.div`
    width: 220px;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
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
`
const ShaderLayer2 = styled.div`
    width: 220px;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background: black;
    background-position: center;
    background-size: 100%;
    mix-blend-mode: color-dodge;
    background: #4B0082;
    background-attachment: fixed;
    background: linear-gradient(45deg, black, #9945FF, #f4310e, #f58308, #14F195, #777, #3c5e6d, #f4310e, #9945FF, #14F195, #14F195);
    background-size: 540% 540%;
    animation: ${gradient} 8s ease infinite;
    animation-timing-function: steps(10, jump-both);
    border-radius: 50%;
`
const ShaderLayer3 = styled.div`
    width: 220px;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background: black;
    background-position: center;
    background-size: 100%;
    mix-blend-mode: color-dodge;
    background: #4B0082;
    background-attachment: fixed;
    background: linear-gradient(45deg, black, #9945FF, #f4310e, #f58308, #14F195, #777, #3c5e6d, #f4310e, #9945FF, #14F195, #14F195);
    background-size: 540% 540%;
    animation: ${gradient} 5s ease-in-out infinite;
    border-radius: 50%;
`

const Mask = styled.div`
    width: 220px;
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
    background-image: url(${ape});
    background-repeat: no-repeat;
`


const Mask3 = styled.div`
    width: 220px;
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
    background-image: url(${ape3});
    background-repeat: no-repeat;
`


const Container2 = styled.div`
`

const Mask2 = styled.div`
    width: 220px;
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
    background-image: url(${ape2});
    background-repeat: no-repeat;
`




export default AboutPage
