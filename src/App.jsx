import { isMobile } from 'react-device-detect'

import MobileHomePage from './pages/mobile/MobileHomePage'
import WebAppLayout from './layout/web/WebAppLayout'

function App() {
  return isMobile ?
    <MobileHomePage /> :
    <WebAppLayout />
}

export default App
