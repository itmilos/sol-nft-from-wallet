import { useState } from 'react'

export function useModals() {
    const [modalOpened, setModalOpened] = useState(null)

    const openModal = () => setModalOpened(true)
    const closeModal = cb => {
      cb()
      setModalOpened(false)
    }

    return {
        modalOpened,
        openModal,
        closeModal
    }
}