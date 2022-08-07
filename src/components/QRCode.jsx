import { AwesomeQRCode } from '@awesomeqr/react'

const QRCode = ({ text, robohashURL }) =>
    <AwesomeQRCode
        options={{
            text: text,
            size: 820,
            autoColor: false,
            margin: 8,
            logoScale: 2,
            backgroundDimming: "rgba(255,255,255,0.29)",
            colorLight: '#456c05',
            colorDark: '#c209ff',
            dotScale: 0.4,
            cornerAlignment: {
                scale: 1.5,
                protectors: false,
            },
            protectors: true,
            backgroundImage: robohashURL
        }}
    />

export default QRCode