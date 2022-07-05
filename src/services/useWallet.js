import { useState } from 'react'

export function useWallet() {
    const [phantomWalletInstalled, setPhantomWalletInstalled] = useState(false)
    const [walletAddress, setWalletAddress] = useState('')

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

                const walletAddress = response.publicKey.toString()

                setWalletAddress(walletAddress)
            } else {
                setPhantomWalletInstalled(false)
                // if (!onlyIfTrusted) visitPhantomWallet()
            }
        } catch (error) {
            console.error(error)
        }
    }

    return {
        phantomWalletInstalled,
        walletAddress,
        connectPhantomWallet
    }
}