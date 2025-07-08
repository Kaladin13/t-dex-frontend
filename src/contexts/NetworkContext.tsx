import { FC, PropsWithChildren, createContext, useContext, useState } from 'react'
import { Network } from '../components/NetworkSwitcher'

interface NetworkContextType {
  network: Network
  setNetwork: (network: Network) => void
}

const NetworkContext = createContext<NetworkContextType | undefined>(undefined)

export const NetworkProvider: FC<PropsWithChildren> = ({ children }) => {
  const [network, setNetwork] = useState<Network>('testnet')

  return (
    <NetworkContext.Provider value={{ network, setNetwork }}>{children}</NetworkContext.Provider>
  )
}

export const useNetwork = () => {
  const context = useContext(NetworkContext)
  if (!context) {
    throw new Error('useNetwork must be used within a NetworkProvider')
  }
  return context
}
