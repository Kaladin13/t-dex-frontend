import { FC, PropsWithChildren } from 'react'
import { TonConnectUIProvider } from '@tonconnect/ui-react'
import { Toaster } from 'react-hot-toast'

// This manifest is used by @tonconnect/ui-react to connect to TON wallet
const manifestUrl =
  'https://raw.githubusercontent.com/ton-blockchain/minter/main/public/tonconnect-manifest.json'

export const AppProviders: FC<PropsWithChildren> = ({ children }) => {
  return (
    <TonConnectUIProvider manifestUrl={manifestUrl}>
      {children}
      <Toaster
        position='bottom-right'
        toastOptions={{
          style: {
            background: '#333',
            color: '#fff',
          },
        }}
      />
    </TonConnectUIProvider>
  )
}
