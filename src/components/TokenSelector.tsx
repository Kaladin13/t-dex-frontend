import React, { useState, useRef, useEffect } from 'react'
import { useTonConnectUI } from '@tonconnect/ui-react'
import { useNetwork } from '../contexts/NetworkContext'
import { onJettonAddressInput, Token } from '../services/dex'

type Props = {
  tokens: Token[]
  selected: Token
  onSelect: (token: Token) => void
  jettonAddressStatus?: 'error' | 'success'
  setJettonAddressStatus?: (status: 'error' | 'success' | undefined) => void
  setVaultAddress?: (vault: string) => void
}

export default function TokenSelector({
  tokens,
  selected,
  onSelect,
  jettonAddressStatus,
  setJettonAddressStatus,
}: Props) {
  const [customAddress, setCustomAddress] = useState(selected.address || '')
  const [mode, setMode] = useState(selected.symbol === 'TON' ? 'ton' : 'custom')
  const [open, setOpen] = useState(false)
  const [vaultAddress, setVaultAddress] = useState<string | undefined>()
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [tonConnectUI] = useTonConnectUI()
  const { network } = useNetwork()

  // close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClick)
    }

    return () => document.removeEventListener('mousedown', handleClick)
  }, [open])

  // Update token with vault address if set
  useEffect(() => {
    if (vaultAddress && mode === 'custom' && customAddress) {
      onSelect({
        type: 'jetton',
        symbol: 'JETTON',
        name: 'Custom Jetton',
        logo: '',
        balance: 0n,
        address: customAddress,
        vaultAddress,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vaultAddress])

  const handleModeChange = (value: 'ton' | 'custom') => {
    setMode(value)
    setOpen(false)
    if (value === 'ton') {
      const ton = tokens.find((t) => t.type === 'ton')
      if (ton) onSelect(ton)
    } else if (customAddress) {
      onSelect({
        type: 'jetton',
        symbol: 'JETTON',
        name: 'Custom Jetton',
        logo: '',
        balance: 0n,
        address: customAddress,
        vaultAddress: '',
      })
    }
  }

  const handleCustomAddressChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const addr = e.target.value
    setCustomAddress(addr)

    onSelect({
      type: 'jetton',
      symbol: 'JETTON',
      name: 'Custom Jetton',
      logo: '',
      balance: 0n,
      address: addr,
      vaultAddress: '',
    })

    if (setJettonAddressStatus) {
      setJettonAddressStatus(undefined)
    }

    try {
      await onJettonAddressInput({
        address: addr,
        tonConnectUI,
        network,
        setVaultAddress,
        onSelect,
      })

      if (setJettonAddressStatus) setJettonAddressStatus('success')
    } catch (err) {
      console.log(err)
      if (setJettonAddressStatus) setJettonAddressStatus('error')
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <div
        className='tact-dropdown'
        ref={dropdownRef}
        tabIndex={0}
        style={{ position: 'relative', width: '100%' }}
      >
        <button
          type='button'
          className='tact-dropdown-btn'
          onClick={() => setOpen((o) => !o)}
          style={{
            width: '100%',
            background: '#23262f',
            color: '#fff',
            border: 'none',
            borderRadius: 12,
            padding: '0.75rem',
            fontSize: '1.1rem',
            textAlign: 'left',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {mode === 'ton' ? 'TON' : 'Custom Jetton'}
          <span style={{ marginLeft: 8, fontSize: 18, color: '#aaa' }}>▼</span>
        </button>
        {open && (
          <div
            className='tact-dropdown-menu'
            style={{
              position: 'absolute',
              top: '110%',
              left: 0,
              width: '100%',
              background: '#23262f',
              borderRadius: 12,
              boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
              zIndex: 10,
              overflow: 'hidden',
            }}
          >
            <div
              className='tact-dropdown-item'
              style={{
                padding: '0.75rem 1rem',
                cursor: 'pointer',
                color: '#fff',
                fontWeight: mode === 'ton' ? 600 : 400,
                background: mode === 'ton' ? '#181a20' : 'none',
              }}
              onClick={() => handleModeChange('ton')}
            >
              TON
            </div>
            <div
              className='tact-dropdown-item'
              style={{
                padding: '0.75rem 1rem',
                cursor: 'pointer',
                color: '#fff',
                fontWeight: mode === 'custom' ? 600 : 400,
                background: mode === 'custom' ? '#181a20' : 'none',
              }}
              onClick={() => handleModeChange('custom')}
            >
              Custom Jetton
            </div>
          </div>
        )}
      </div>
      {mode === 'custom' && (
        <input
          type='text'
          placeholder='Jetton address'
          value={customAddress}
          onChange={handleCustomAddressChange}
          style={{
            marginTop: 4,
            padding: '0.75rem',
            borderRadius: 12,
            border:
              jettonAddressStatus === 'error'
                ? '1.5px solid #f85149'
                : jettonAddressStatus === 'success'
                ? '1.5px solid #3fb950'
                : 'none',
            background: '#23262f',
            color: '#fff',
            fontSize: '1.1rem',
            outline: 'none',
            boxShadow:
              jettonAddressStatus === 'error'
                ? '0 0 0 2px #f8514933'
                : jettonAddressStatus === 'success'
                ? '0 0 0 2px #3fb95033'
                : undefined,
            transition: 'border 0.2s, box-shadow 0.2s',
          }}
        />
      )}
    </div>
  )
}
