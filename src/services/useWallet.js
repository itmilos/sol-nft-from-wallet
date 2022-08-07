import store from '../state/state'

export function useWallet() {
    const phantomWallet = store(state => state.phantomWallet)
    const setPhantomWalletInstalled = store(state => state.setPhantomWalletInstalled)
    const setPhantomWallet = store(state => state.setPhantomWallet)
    const setNFTs = store(state => state.setNFTs)
    const setSpinner = store(state => state.setSpinner)

    const connectPhantomWallet = async (onlyIfTrusted = true) => {
        try {
            const { solana } = window

            console.log(solana)

            if (solana?.isPhantom) {
                setPhantomWalletInstalled(true)

                const response = onlyIfTrusted ?
                    await solana.connect({ onlyIfTrusted: true }) :
                    await solana.connect()

                console.log('WALLET', response)
                setPhantomWallet(response)
            } else {
                setPhantomWalletInstalled(false)
            }
        } catch (error) {
            console.error(error)
        }
    }

    const getNftTokenData = async () => {
        setSpinner(true)

        try {
            var myHeaders = new Headers()
            myHeaders.append('x-api-key', 'QQx9fwLpfVTua7_o')
            
            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            }
            
            let result = await fetch(`https://api.shyft.to/sol/v1/nft/read_all?network=mainnet-beta&address=${phantomWallet.publicKey}`, requestOptions)
            let parsedResult = await result.json()

            console.log('NFT DATA', parsedResult)

            setNFTs(parsedResult.result)
            setSpinner(false)
        } catch (error) {
            console.error(error)
            setSpinner(false)
        }
    }

    return {
        connectPhantomWallet,
        getNftTokenData
    }
}