import { useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'

import store from '../../state/state'
import { useWallet } from '../../services/useWallet'

import AnimatedPage from './AnimatedPage'
import Heading from '../../components/Heading'
import Text from '../../components/Text'
import AnimatedSection from '../../components/AnimatedSection'
import Button from '../../components/Button'
import RobohashComponent from '../../components/Robohash'
import Input from '../../components/Input'
import QRCode from '../../components/QRCode'

import phantom from '../../assets/phantom.svg'

import axios from 'axios'

const PhantomInfo = () =>
    <LeftSide
        key='left'
        initial={{ x: '100%', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
    >
        <AnimatedSection key='phantom' delay={.3}>
            <Heading type='small'>Phantom Wallet</Heading>
            <Text size='medium'>In order to use the application, you're gonna have to connect your Phantom wallet. We need your public address so we can generate your UNIQUE robot and we need access to your wallet so you can select your favorite NFT you want to QR.</Text>
        </AnimatedSection>
        <PhantomContainer
            initial={{ x: '-300%' }}
            animate={{ x: 0, transition: { duration: 3 } }}
        >
            <Phantom src={phantom} alt='phantom-logo' />
        </PhantomContainer>
    </LeftSide>

const Menu = ({ phantomWallet, connectPhantomWallet, setPage }) =>
    <RightSide
        key='right'
        initial={{ x: '100%', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: '-100%', opacity: 0 }}
    >
        {phantomWallet ?
            <>
                <Section
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                >
                    <Heading type='small' marginBottom='10px'>Phantom Wallet Info</Heading>
                    <Text size='medium' bold>Public Address:</Text>
                    <Text size='medium'>{phantomWallet ? phantomWallet.publicKey.toString() : 'Not connected'}</Text>
                </Section>

                <Section
                    cursorPointer
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    onClick={() => setPage(1)}
                >
                    <Heading type='small' marginBottom='10px'>Generate QR Wallet Image</Heading>
                    <Text size='medium'>Generate a unique robot image from Phantom wallet's public key. Add the link you want to share with people and we'll send you the image.</Text>
                </Section>

                <Section
                    cursorPointer
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    onClick={() => setPage(2)}
                >
                    <Heading type='small' marginBottom='10px'>QR Your NFT</Heading>
                    <Text size='medium'>Select one of the NFTs from your wallet and apply a QR code to it. We suggest adding your Linktree url to it.</Text>
                </Section>
            </> :
            <Button onClick={connectPhantomWallet.bind(null, false)}>Connect Phantom</Button>
        }
    </RightSide>

const QRGenerator = ({
    robotGenerated,
    setRobotGenerated,
    phantomWallet,
    generateQRNFT,
    QRGenerated,
    robohashURL,
    qrLink,
    setQRLink,
    createNFT
}) => {

    return <WalletQR
        key='robot'
        initial={{ x: '100%', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: '-100%', opacity: 0 }}
    >
        {!robotGenerated ?
            <Button onClick={setRobotGenerated.bind(null, true)}>Generate Robot</Button> :
            <>
                {!QRGenerated ?
                    <>
                        <RobohashComponent walletAddress={phantomWallet.publicKey.toString()} />
                        <Input label='Enter QR code link' onChange={e => setQRLink(e.target.value)} />
                        {!QRGenerated && qrLink.trim() && <Button onClick={generateQRNFT}>Generate QR</Button>}
                    </> :
                    <>
                        <QRCodeContainer><QRCode text={qrLink.trim()} robohashURL={robohashURL} /></QRCodeContainer>
                        <Button onClick={createNFT}>Create NFT</Button>
                    </>
                }
            </>
        }
    </WalletQR>
}

const QRNFT = ({
    qrLink,
    setQRLink,
    generateQRNFT,
    robohashURL,
    createNFT
}) => {
    const [selectedNFT, setSelectedNFT] = useState(null)
    const [QRGenerated, setQRGenerated] = useState(false)

    const NFTs = store(state => state.NFTs)
    const { getNftTokenData } = useWallet()

    const handleGenerateQR = async () => {
        await generateQRNFT(selectedNFT)
        setQRGenerated(true)
    }

    return <WalletQR
        key='nft'
        initial={{ x: '100%', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: '-100%', opacity: 0 }}
    >
        {QRGenerated ?
        <>
            <QRCodeContainer><QRCode text={qrLink.trim()} robohashURL={robohashURL} /></QRCodeContainer>
            <Button onClick={createNFT}>Create NFT</Button>
        </> :
            selectedNFT ?
                <SelectedNFTContainer>
                    <Item src={selectedNFT.image_uri} size='big' />
                    <Input label='Enter QR code link' onChange={e => setQRLink(e.target.value)} />
                    <Button onClick={handleGenerateQR}>Add QR Code</Button>
                </SelectedNFTContainer> :
                NFTs?.length === 0 ?
                    <Button onClick={getNftTokenData}>Get NFTs</Button> :
                    <>
                        <Heading type='small'>Your NFT Gallery</Heading>
                        <Gallery>
                            {NFTs?.map(NFT => <Item key={NFT.image_uri} src={NFT.image_uri} onClick={setSelectedNFT.bind(null, NFT)} />)}
                        </Gallery>
                    </>
        }
    </WalletQR> 
}

const QRPage = () => {
    const phantomWallet = store(state => state.phantomWallet)
    const robotGenerated = store(state => state.robotGenerated)
    const setRobotGenerated = store(state => state.setRobotGenerated)
    const setSpinner = store(state => state.setSpinner)

    const { connectPhantomWallet } = useWallet()

    const [page, setPage] = useState(0)
    const [qrLink, setQRLink] = useState('')
    const [robohashURL, setRobohashURL] = useState('')
    const [QRGenerated, setQRGenerated] = useState(false)

    const generateQRNFT = (nft = false) => {
        let imageLink = ''

        if (nft?.image_uri) {
            console.log('ENTERED', nft)
            imageLink = nft.image_uri
        } else {
            console.log(document.getElementById('robohash-container'))
            const url = document.getElementById('robohash-container').getElementsByTagName('img')[0].src
            console.log('URL', url)
            imageLink = url.split('?')[0]
        }
    
        var request = new XMLHttpRequest()

        request.open('GET', imageLink, true)
        request.responseType = 'blob'
        request.onload = function() {
            var reader = new FileReader()
            reader.readAsDataURL(request.response)
            reader.onload = e => {
                console.log(e.target.result)
                setRobohashURL(e.target.result)
                setQRGenerated(true)
            }
        }

        request.send()
    }

    const createNFT = () => {
        setSpinner(true)
        console.log('FUNC EXECUTED')
        function b64toBlob(dataURI) {

            var byteString = atob(dataURI.split(',')[1])
            var ab = new ArrayBuffer(byteString.length)
            var ia = new Uint8Array(ab)
        
            for (var i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i)
            }
            return new Blob([ab], { type: 'image/jpeg' })
        }
        
        var myTimeout = setTimeout(myGreeting, 900)
        
        function myGreeting() {
            var divCollection = document.querySelectorAll('div')
            divCollection.forEach(iterate)
        }
        
        function myStopFunction() {
            clearTimeout(myTimeout)
        }
        
        const iterate = async item => {
            try {
                if (item.style.backgroundImage.indexOf('base64') !== -1) {
                    var createNFTHeaders = new Headers()
                    createNFTHeaders.append("x-api-key", "QQx9fwLpfVTua7_o")
            
                    var formdata = new FormData()
                    formdata.append("network", "devnet")
                    formdata.append("private_key", "4qerdPEVyDwPpzFNHXF4qfChb9hvXdfYr1JfXSBxXYCUFaKU5eyrK8GSfHfyJTCiKYQoxGJFMahXUHBcGL9c4Dqo")
                    formdata.append("name", 'MRnft')
                    formdata.append("symbol", "QRNFT")
                    formdata.append("description", "generated by QRaftNFT")
                    formdata.append("attributes", "[{\"trait_type\": \"speed\", \"value\": 100},\n{\"trait_type\": \"aggression\", \"value\": \"crazy\"},\n{\"trait_type\": \"energy\", \"value\": \"very high\"}]")
                    formdata.append("external_url", qrLink)
                    formdata.append("max_supply", "2")
                    formdata.append("royalty", "20")
                    formdata.append("file", b64toBlob(item.style.backgroundImage.substring(5).slice(0, -2)), "cb.jpeg")

                    const { data: createNFTResponseData } = await axios({
                        method: 'post',
                        headers: { 'x-api-key': 'QQx9fwLpfVTua7_o' },
                        url: 'https://api.shyft.to/sol/v1/nft/create',
                        data: formdata
                    })

                    console.log(createNFTResponseData)
                    
                    const transferResponse = await axios({
                        method: 'post',
                        headers: { 'x-api-key': 'QQx9fwLpfVTua7_o' },
                        url: 'https://api.shyft.to/sol/v1/nft/transfer',
                        data: {
                            network: 'devnet',
                            from_address: "4qerdPEVyDwPpzFNHXF4qfChb9hvXdfYr1JfXSBxXYCUFaKU5eyrK8GSfHfyJTCiKYQoxGJFMahXUHBcGL9c4Dqo",
                            token_address: createNFTResponseData.result.mint,
                            to_address: phantomWallet.publicKey.toString(),
                            transfer_authority: true
                        }
                    })

                    console.log('RES', transferResponse)
                    setSpinner(false)
                    setPage(5)
                    setTimeout(function () {
                        setPage(1)
                    },1200)
                }
            } catch (error) {
                console.log(error)
                setSpinner(false)
            } finally {
                console.log('FINALLY EXECUTED')
            }
        }
    }

    return <AnimatedPage>
        <AnimatePresence>
            {page === 5 &&
                <div style={{ width: '100%', backgroundColor: '#58bd58', padding: '20px', margin: '20px', color: '#fff', borderRadius: '5px'}}>
                    You have successfully minted QRNFT
                </div>
            }
            {!page && <PhantomInfo />}
            <Menu
                phantomWallet={phantomWallet}
                connectPhantomWallet={connectPhantomWallet} 
                setPage={setPage}
            />
            {page === 1 &&
                <QRGenerator
                    robotGenerated={robotGenerated}
                    setRobotGenerated={setRobotGenerated}
                    phantomWallet={phantomWallet}
                    generateQRNFT={generateQRNFT}
                    QRGenerated={QRGenerated}
                    robohashURL={robohashURL}
                    qrLink={qrLink}
                    setQRLink={setQRLink}
                    createNFT={createNFT}
                />
            }
            {page === 2 &&
                <QRNFT
                    qrLink={qrLink}
                    setQRLink={setQRLink}
                    generateQRNFT={generateQRNFT}
                    robohashURL={robohashURL}
                    createNFT={createNFT}
                />
            }
        </AnimatePresence>
    </AnimatedPage>
}

const LeftSide = styled(motion.div)`
    width: calc(50% - 40px);
    display: inline-block;
    vertical-align: top;
    padding-right: 40px;
`

const PhantomContainer = styled(motion.div)`
    width: 100%;
    padding-top: 70px;
`
const svgShadow = keyframes`
    from {
        left: 0;
        filter: drop-shadow( 0 0 5px #fea1df) drop-shadow( 0 0 10px #fea1df) drop-shadow( 0 0 15px #fea1df);
    }
  
    to {
        left: 5px;
        filter: drop-shadow( 0 0 15px #4e44ce) drop-shadow( 0 0 20px #4e44ce) drop-shadow( 0 0 25px #4e44ce);
    }
`

const Phantom = styled.img`
    width: 40%;
    position: relative;
    animation: ${svgShadow} 2s ease-in-out infinite alternate;
    margin-left: 10%;
`

const RightSide = styled(motion.div)`
    width: 50%;
    display: inline-block;
    vertical-align: top;
    padding-bottom: 50px;
    text-align: center;
`

const WalletQR = styled(motion.div)`
    width: calc(50% - 40px);
    min-height: 100vh;
    padding-left: 40px;
    display: inline-block;
    vertical-align: top;
    text-align: center;
`

const Gallery = styled.div`
    width: 100%;
    margin-top: 20px;
`

const Item = styled.img`
    width: 45%;
    display: inline-block;
    margin: 0 0 30px 5%;
    cursor: pointer;

    ${({ size }) => size === 'big' && `
        width: 60%;
        margin: 0 auto;
    `}
`

const SelectedNFTContainer = styled.div`
    width: 100%;
`

const Section = styled(motion.div)`
    width: 70%;
    padding: 30px 15%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    border-radius: 15px;
    background: #4e44ce27;
    text-align: center;
    margin-bottom: 30px;

    ${({ cursorPointer }) => cursorPointer && 'cursor: pointer;'}
`

const QRCodeContainer = styled.div`
    width: 100%;
    height: 300px;
    & div { margin: 0 auto; }
`

export default QRPage
