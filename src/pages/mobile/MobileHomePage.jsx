import styled from 'styled-components'
import bg from '../../assets/index_scale_adoption_mobile.webp'

const MobileHomePage = () => {
    return <Container>
        <BGImage src={bg} />
    </Container>
}

const Container = styled.div`
    position: relative;
    width: 100%;
    min-height: 100vh;
    background-color: black;
    color: white;
    text-align: right;
`

const BGImage = styled.img`
    height: 100vh;
    opacity: 0.3;
`

export default MobileHomePage