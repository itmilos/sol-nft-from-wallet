import {useEffect, useRef, useState} from 'react'
import styled from 'styled-components'
import Robohash from 'react-robohash'
import {useWallet} from './services/useWallet'
import {AwesomeQRCode} from '@awesomeqr/react'
import Modal from './components/Modal'

function App() {
    const inputRef = useRef(null)

    const {
        phantomWalletInstalled,
        walletAddress,
        connectPhantomWallet
    } = useWallet()

    const [robohashString, setRobohashString] = useState(null)
    const [robohashURL, setRobohashURL] = useState(null)
    const [QRText, setQRText] = useState(null)
    const [modalOpened, setModalOpened] = useState(null)

    useEffect(() => {
        connectPhantomWallet()
    }, [])

    const openModal = () => setModalOpened(true)
    const closeModal = () => {
        const url = document.getElementById('123').getElementsByTagName('img')[0].src

        const imageLink = url.split('?')[0]

        var request = new XMLHttpRequest()
        request.open('GET', imageLink, true)
        request.responseType = 'blob'
        request.onload = function () {
            var reader = new FileReader()
            reader.readAsDataURL(request.response)
            reader.onload = function (e) {
                setRobohashURL(e.target.result)
            }
        }
        request.send()
        setQRText(inputRef.current.value)
        setModalOpened(false)
    }

    return (
        <Container className='main-container'>
            <img alt='left-orb' src={'https://i.imgur.com/r0VFFep.png'} className='blurry-gradient2'/>
            <img alt='right-orb' src={'https://i.imgur.com/r0VFFep.png'} className='blurry-gradient'/>
            {!phantomWalletInstalled && <Text>No Phantom Wallet / No Business here :( </Text>}
            {walletAddress ?
                <>
                    <Text>Your wallet address is:</Text>
                    <p className='wallet-address'>{walletAddress}</p>
                    {!robohashString &&
                        <Button onClick={setRobohashString.bind(null, walletAddress)}>Generate Your NFT</Button>}
                    {robohashString && !robohashURL && <>
                        <Button onClick={openModal}>Add QR Code Link</Button>
                        <RobohashContainer id='123'>
                            <Robohash name={walletAddress} type='robot'/>
                        </RobohashContainer>
                    </>}
                </> :
                <Button
                    onClick={connectPhantomWallet.bind(null, false)}
                >
                    Connect Phantom Wallet
                </Button>
            }
            {robohashURL && <QRCodeContainer>
                {Robohash.name && <Button
                    onClick={() => window.location = 'mailto:milosrujevic@gmail.com?subject=QR NFT for ' + walletAddress + '!&body=Please state address where you want your stickers delivered: ___Your Address__"'}>
                    Order NFT Sticker
                </Button>
                }
                {QRText && <AwesomeQRCode
                    options={{
                        text: QRText,
                        size: 400,
                        backgroundImage: robohashURL
                    }}
                />}
            </QRCodeContainer>}
            <Modal show={modalOpened}>
                <ModalContent>
                    <StyledLabel>Please insert QR code link</StyledLabel>
                    <StyledInput ref={inputRef}/>
                    <Button onClick={closeModal}>Generate QR Code</Button>
                </ModalContent>
            </Modal>
        </Container>
    )
}

const Container = styled.div`
  height: 100%;
  padding: 0 10%;
  text-align: center;
`

const Text = styled.p`
  line-height: 48px;
  font-size: 36px;
  font-family: Arial Rounded MT Bold,Helvetica Rounded,Arial,sans-serif;
  color: white;
  margin: 0;
  text-shadow: 0 0 2px #330033;
  ${props => props.cursorPointer && 'cursor: pointer;'}
`

const Button = styled.button`
  font-size: 16px;
  height: 47px;
    padding: 5px 30px;
    line-height: 24px;
    font-family: Arial Rounded MT Bold,Helvetica Rounded,Arial,sans-serif;
    font-size: 16px;
    margin-bottom: 20px;
    color: #fff;
    background: hsla(328, 75%, 45%, 1);
    background: linear-gradient(90deg, hsla(328, 75%, 45%, 1) 0%, hsla(269, 85%, 41%, 1) 100%);
    background: -moz-linear-gradient(90deg, hsla(328, 75%, 45%, 1) 0%, hsla(269, 85%, 41%, 1) 100%);
    background: -webkit-linear-gradient(90deg, hsla(328, 75%, 45%, 1) 0%, hsla(269, 85%, 41%, 1) 100%);
    filter: progid: DXImageTransform.Microsoft.gradient( startColorstr="#C81D77", endColorstr="#6710C2", GradientType=1 );
    border-radius: 10px;
    border: none;
    cursor: copy;
`

const RobohashContainer = styled.div`
  text-align: center;
  margin-top: 40px;
`

const QRCodeContainer = styled.div`
  height: 400px;
  width: 400px;
  margin: 0 auto;
`

const ModalContent = styled.div`
margin-top: 20px;
  width: 515px;
  max-width: 100%;
  background: black;
  border-radius: 20px;
  border: 2px solid #292e42;
  padding: 60px 65px 15px;
  margin-right: auto;
  margin-left: auto;
  position: relative;
      text-align: center;
`

const StyledLabel = styled.label`
  display: block;
    color: #fff;
    cursor: pointer;
    -webkit-transition: all .42s cubic-bezier(.165,.84,.44,1);
    transition: all .42s cubic-bezier(.165,.84,.44,1);
    text-transform: uppercase;
    letter-spacing: .04em;
    font-family: monospace;
        font-size: 14px;
        text-align:left;
`

const StyledInput = styled.input`
    background: #141620;
    display: block;
    color: #fff;
    border-radius: 9px;
    font-family: IBM Plex Mono,monospace;
    font-size: 16px;
    font-weight: 500;
    padding: 0 19px;
    margin: 13px 0;
    line-height: 2.5;
    width: 100%;
    border: 0;
`

export default App
