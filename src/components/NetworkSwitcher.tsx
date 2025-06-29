import { FC } from 'react'
import './NetworkSwitcher.css'

export type Network = 'testnet' | 'mainnet'

interface NetworkSwitcherProps {
  network: Network
  onChange: (network: Network) => void
}

export const NetworkSwitcher: FC<NetworkSwitcherProps> = ({ network, onChange }) => {
  return (
    <div className='network-switcher'>
      <button
        className={`network-button ${network === 'testnet' ? 'active' : ''}`}
        onClick={() => onChange('testnet')}
      >
        Testnet
      </button>
      <button
        className={`network-button ${network === 'mainnet' ? 'active' : ''}`}
        onClick={() => onChange('mainnet')}
      >
        Mainnet
      </button>
    </div>
  )
}
