import { isMobile } from 'react-device-detect'

import MobileHomePage from '../pages/mobile/MobileHomePage'
import ComputerHomePage from '../pages/web/ComputerHomePage'

const ApplicationTypeWrapper = () => isMobile ?
    <MobileHomePage /> :
    <ComputerHomePage />

export default ApplicationTypeWrapper
