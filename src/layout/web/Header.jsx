import styled, { keyframes } from 'styled-components'

import store from '../../state/state'
import { useWallet } from '../../services/useWallet'

import { Link } from 'react-router-dom'

import phantom from '../../assets/phantom.svg'

const Header = () => {
    const phantomWallet = store(state => state.phantomWallet)
    const { connectPhantomWallet } = useWallet()

    return <StyledHeader>
        <Navigation>
            <StyledLink to='/'>Home</StyledLink>
            <StyledLink to='example'>Example</StyledLink>
            <StyledLink to='qr' cta={+true}>QR NFT</StyledLink>
            <StyledLink to='about'>About</StyledLink>
            <PhantomLogo
                src={phantom}
                alt='phantom-logo'
                onClick={connectPhantomWallet}
                phatnomConnected={phantomWallet}
            />
        </Navigation>
    </StyledHeader>
}

const StyledHeader = styled.header`
    width: 100%;
    height: 80px;
    text-align: right;
`

const greenGlow = keyframes`
    from {
        filter: drop-shadow( 0 0 1px green) drop-shadow( 0 0 2px green) drop-shadow( 0 0 3px green);
    }
  
    to {
        filter: drop-shadow( 0 0 2px green) drop-shadow( 0 0 3px green) drop-shadow( 0 0 5px green);
    }
`

const redGlow = keyframes`
    from {
        filter: drop-shadow( 0 0 1px red) drop-shadow( 0 0 2px red) drop-shadow( 0 0 3px red);
    }
  
    to {
        filter: drop-shadow( 0 0 2px red) drop-shadow( 0 0 3px red) drop-shadow( 0 0 5px red);
    }
`

const PhantomLogo = styled.img`
    width: 30px;
    position: relative;
    top: 5px;
    transform: rotateY(180deg);
    cursor: pointer;
    animation: ${props => props.phatnomConnected ? greenGlow : redGlow} 2s ease-in-out infinite alternate;
`

const Navigation = styled.nav`
    padding: 20px 10%;
`

const StyledLink = styled(Link)`
    display: inline-block;
    line-height: 40px;
    padding: 0 20px;
    font-size: 16px;
    font-weight: 800;
    color: white;
    text-decoration: none;
    border-radius: 10px;
    margin-right: 5px;

    ${props => props.cta && `background-color: ${props.theme.color.darkPink};`}

    &:hover {
        color: ${props => props.cta ? props.theme.color.white : props.theme.color.green};
        ${props => props.cta && `background-color: ${props.theme.color.pink};`}
    }
`

export default Header
