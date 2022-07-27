import create from 'zustand'

export const store = create(set => ({
    phantomWalletInstalled: false,
    setPhantomWalletInstalled: phantomWalletInstalled => set({ phantomWalletInstalled }),
    phantomWallet: null,
    setPhantomWallet: phantomWallet => set({ phantomWallet }),
    robotGenerated: null,
    setRobotGenerated: robotGenerated => set({ robotGenerated })
}))

export default store
