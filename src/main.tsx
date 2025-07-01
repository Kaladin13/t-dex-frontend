import './polyfills'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App'
import { NetworkProvider } from './contexts/NetworkContext'
import { AppProviders } from './providers'

import './styles/fonts.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NetworkProvider>
      <AppProviders>
        <App />
      </AppProviders>
    </NetworkProvider>
  </StrictMode>,
)
