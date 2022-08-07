import styled from 'styled-components'
import { motion } from 'framer-motion'
import axios from 'axios'

import Heading from '../../components/Heading'
import Text from '../../components/Text'
import Button from '../../components/Button'
import Input from '../../components/Input'
import QRCode from '../../components/QRCode'

import store from '../../state/state'
import { useWallet } from '../../services/useWallet'
import { useState } from 'react'

const NFTItem = ({ NFTData }) => {
    const setNFTSelected = store(state => state.setNFTSelected)

    return <NFTItemContainer onClick={() => setNFTSelected(NFTData)}>
        <NFT src={NFTData.image_uri} />
        <Heading type='smallest'>{NFTData.name}</Heading>
    </NFTItemContainer>
}

const GalleryPage = () => {
    const phantomWallet = store(state => state.phantomWallet)
    const NFTs = store(state => state.NFTs)
    const { getNftTokenData } = useWallet()

    return <Container>
        <Heading
            type='small'
            marginBottom='15px'
        >
            QRaftNFT
        </Heading>
        <Section
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
        >
            <Heading type='smallest'>Phantom Wallet Info</Heading>
            <Text size='small'>Public Address:</Text>
            <Text size='small'>{phantomWallet.publicKey.toString()}</Text>
        </Section>
        <Section
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
        >
            <Heading type='smallest'>QR Your NFT</Heading>
            <Text size='small'>Select one of the NFTs from your wallet and apply a QR code to it. We suggest adding your Linktree url to it.</Text>
        </Section>
        {NFTs.length !== 0 ?
            <Gallery>
                <Heading type='smallest'>Your NFT Gallery</Heading>
                <Text
                    size='small'
                    marginBottom='20px'
                >
                    Select on one of your NFTs by clicking on it in order to apply a QR code.
                </Text>
                {NFTs?.map(NFTData =>
                    <NFTItem
                        key={NFTData.mint}
                        NFTData={NFTData}
                    />
                )}
            </Gallery> :
            <Button size='small' onClick={getNftTokenData}>Get NFTs</Button>
        }
    </Container>
}

const SingleNFT = () => {
    const NFTSelected = store(state => state.NFTSelected)
    const [QRLink, setQRLink] = useState('')
    const [robohashURL, setRobohashURL] = useState('')
    const phantomWallet = store(state => state.phantomWallet)
    const setSpinner = store(state => state.setSpinner)
    const [successfulMint, setSuccessfulMint] = useState(false)

    const generateQRNFT = async nft => {
        setSpinner(true)
        try {
            let imageLink = nft.image_uri
        
            var request = new XMLHttpRequest()
    
            request.open('GET', imageLink, true)
            request.responseType = 'blob'
            request.onload = function() {
                var reader = new FileReader()
                reader.readAsDataURL(request.response)
                reader.onload = e => {
                    console.log(e.target.result)
                    setRobohashURL(e.target.result)
                    setSpinner(false)
                }
            }
    
            request.send()
        } catch (error) {
            console.error(error)
            setSpinner(false)
        }
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
                    formdata.append("external_url", QRLink)
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
                    setSuccessfulMint(true)
                    setSpinner(false)
                }
            } catch (error) {
                console.log(error)
                setSpinner(false)
            } finally {
                console.log('FINALLY EXECUTED')
            }
        }
    }

    return <Container>
        <Heading
            type='small'
            marginBottom='15px'
        >
            QR your NFT!
        </Heading>
        {robohashURL ?
            <>
                {successfulMint ?
                    <>
                        <Heading type='smallest'>NFT created successfully!</Heading>
                        <Text size='medium'>
                            Good job! You've successfully minted your NFT and it should be in your wallet in no-time. Thank you for using our service.
                        </Text>
                    </> :
                    <>    
                        <QRCodeContainer>
                            <QRCode text={QRLink.trim()} robohashURL={robohashURL} />
                        </QRCodeContainer>
                        <Button size='small' onClick={createNFT}>Mint NFT</Button>
                    </>
                }  
            </> :
            <>
                <Text
                    size='small'
                    marginBottom='20px'
                >
                    Enter the link you want to apply to the selected NFT and click Generate button.
                </Text>
                <NFTItem NFTData={NFTSelected} />
                <Input
                    label='Enter QR code link'
                    fullWidth={true}
                    marginBottom='20px'
                    onChange={event => setQRLink(event.target.value)}
                />
                <Button size='small' onClick={generateQRNFT.bind(null, NFTSelected)}>Generate QRNFT</Button>
            </>
        }
    </Container>
}

const QRaftNFTPage = () => {
    const NFTSelected = store(state => state.NFTSelected)

    return NFTSelected ?
        <SingleNFT /> :
        <GalleryPage />
}

const Container = styled.div`
    width: 100%;
`

const Section = styled(motion.div)`
    width: 80%;
    padding: 15px 10%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    border-radius: 10px;
    background: #4e44ce36;
    text-align: center;
    margin-bottom: 15px;
`

const Gallery = styled.div`
    width: 100%;
    margin-top: 30px;
`

const NFTItemContainer = styled.div`
    width: 100%;
    margin-bottom: 30px;
`

const NFT = styled.img`
    width: 100%;
    display: block;
    cursor: pointer;
`

const QRCodeContainer = styled.div`
    width: 100%;
    height: 300px;
    margin-bottom: 20px;

    & div { margin: 0 auto; }
`

export default QRaftNFTPage
