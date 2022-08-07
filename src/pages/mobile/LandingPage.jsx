import styled from 'styled-components'
import { useWallet } from '../../services/useWallet'

import Heading from '../../components/Heading'
import Text from '../../components/Text'
import Button from '../../components/Button'

const LandingPage = () => {
    const { connectPhantomWallet } = useWallet()

    return <Container>
        <Heading type='small'>
            Welcome Solana
        </Heading>
        <Heading
            type='small'
            marginBottom='20px'
        >
            HH Krakow
        </Heading>
        <Text
            size='medium'
            marginBottom='15px'
        >
            In order to use the application, you're gonna have to connect your Phantom wallet.
        </Text>
        <Button
            size='small'
            onClick={connectPhantomWallet.bind(null, false)}
        >
            Connect Phantom
        </Button>
    </Container>
}

const Container = styled.div`
    width: 100%;
`

export default LandingPage
