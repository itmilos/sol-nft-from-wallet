import create from 'zustand'

export const store = create(set => ({
    phantomWalletInstalled: false,
    setPhantomWalletInstalled: phantomWalletInstalled => set({ phantomWalletInstalled }),
    phantomWallet: null,
    setPhantomWallet: phantomWallet => set({ phantomWallet }),
    NFTs: [],
    setNFTs: NFTs => set({ NFTs }),
    NFTSelected: null,
    setNFTSelected: NFTSelected => set({ NFTSelected }),
    robotGenerated: null,
    setRobotGenerated: robotGenerated => set({ robotGenerated }),
    generatedQRCodes: [],
    addGeneratedQRCode: generatedQRCode => set(state => ({
        generatedQRCodes: [ ...state.generatedQRCodes, generatedQRCode ]
    })),
    spinner: false,
    setSpinner: spinner => set({ spinner })
}))

export default store
