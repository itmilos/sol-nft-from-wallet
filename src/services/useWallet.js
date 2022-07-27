import axios from 'axios'
import store from '../state/state'

import { Connection, clusterApiUrl } from '@solana/web3.js'
import { getParsedNftAccountsByOwner } from '@nfteyez/sol-rayz'

export function useWallet() {
    const phantomWallet = store(state => state.phantomWallet)
    const setPhantomWalletInstalled = store(state => state.setPhantomWalletInstalled)
    const setPhantomWallet = store(state => state.setPhantomWallet)

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
                // if (!onlyIfTrusted) visitPhantomWallet()
            }
        } catch (error) {
            console.error(error)
        }
    }

    const createConnection = () => new Connection(clusterApiUrl())

    const getAllNftData = async () => {
        try {
            const nfts = await getParsedNftAccountsByOwner({
                publicAddress: phantomWallet.publicKey,
                connection: phantomWallet.connect,
                serialization: true
            })

            return nfts
        } catch (error) {
            console.log(error)
        }
    }

    const getNftTokenData = async () => {
        try {
            let nftData = await getAllNftData()
            var data = Object.keys(nftData).map((key) => nftData[key])
            let arr = []

            for (let i = 0; i < data.length; i++) {
                console.log(data[i].data.uri)
                let val = await axios.get(data[i].data.uri)
                arr.push(val)
            }

            console.log('NFTS!!!', arr)
            return arr
        } catch (error) {
            console.log(error)
        }
    }

    return {
        connectPhantomWallet,
        getNftTokenData
    }
}