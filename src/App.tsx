import { FC } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { TonConnectButton } from '@tonconnect/ui-react'
import Swap from './components/Swap'
import './styles/App.css'
import './styles/JettonMinter.css'

export const App: FC = () => {
  return (
    <Router basename='/t-dex-frontend'>
      <div className='app'>
        <nav className='app-nav'>
          <div className='nav-content'>
            <div className='nav-brand'>
              <div className='nav-logo'>🦖 T-Dex</div>
            </div>
            <div className='nav-links'>
              <TonConnectButton />
            </div>
          </div>
        </nav>
        <Routes>
          <Route
            path='/'
            element={<Swap />}
          />
        </Routes>
      </div>
    </Router>
  )
}
