import styled from 'styled-components'
import { createPortal } from 'react-dom'

const domNode = document.getElementById('app-modal')

const Modal = ({ show, children }) => show ?
    createPortal(
        <ModalBackground>
            {children}
        </ModalBackground>,
        domNode
    ) :
    null

const ModalBackground = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(179, 255, 171, 0.9);
`

export default Modal