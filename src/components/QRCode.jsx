import { AwesomeQRCode } from '@awesomeqr/react'

const QRCode = ({ text, robohashURL }) =>
    <AwesomeQRCode
        options={{
            text: text,
            size: 321,
            logoCornerRadius: 2,
            logoMargin: 2,
            margin: 4,
            logoScale: 2,
            cornerAlignment: {
                scale: 1.5,
                protectors: false,
            },
            protectors: true,
            backgroundImage: robohashURL
        }}
    />

export default QRCode