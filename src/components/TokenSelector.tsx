import React, { useState, useRef, useEffect } from 'react'
import { useTonConnectUI } from '@tonconnect/ui-react'
import { useNetwork } from '../contexts/NetworkContext'
import { onJettonAddressInput, Token } from '../services/dex'
import TonLogo from '../assets/ton-logo.svg'
import JettonLogo from '../assets/jetton-logo.svg'
import toast from 'react-hot-toast'

type Props = {
  tokens: Token[]
  selected: Token | undefined
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
  setVaultAddress,
}: Props) {
  const [customAddress, setCustomAddress] = useState('')
  const [mode, setMode] = useState(selected?.type || 'ton')
  const [open, setOpen] = useState(false)
  const [vaultAddress, setVaultAddressLocal] = useState<string | undefined>()
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [tonConnectUI] = useTonConnectUI()
  const { network } = useNetwork()
  const [hasTyped, setHasTyped] = useState(false)

  // Синхронизируем mode с selected токеном
  useEffect(() => {
    if (selected?.type) {
      setMode(selected.type)
      if (selected.type === 'jetton') {
        setCustomAddress(selected.address || '')
        setHasTyped(!!selected.address)
      } else if (selected.type === 'ton') {
        setCustomAddress('')
        setHasTyped(false)
      }
    }
  }, [selected])

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
    if (vaultAddress && mode === 'jetton' && customAddress) {
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

  const handleModeChange = (value: 'ton' | 'jetton') => {
    setMode(value)
    setOpen(false)
    if (value === 'ton') {
      setCustomAddress('')
      setHasTyped(false)
      const ton = tokens.find((t) => t.type === 'ton')
      if (ton) onSelect(ton)
    } else {
      setCustomAddress('')
      setHasTyped(false)
      onSelect({
        type: 'jetton',
        symbol: 'JETTON',
        name: 'Custom Jetton',
        logo: '',
        balance: 0n,
        address: '',
        vaultAddress: '',
      })
    }
  }

  const showPreview =
    mode === 'ton' ||
    (mode === 'jetton' &&
      selected &&
      selected.type === 'jetton' &&
      selected.address &&
      selected.symbol &&
      selected.logo &&
      hasTyped)

  const handleCustomAddressChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const addr = e.target.value
    setCustomAddress(addr)
    setHasTyped(true)
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
        setVaultAddress: setVaultAddress,
        onSelect,
      })
      if (setJettonAddressStatus) setJettonAddressStatus('success')
    } catch (err) {
      if (setJettonAddressStatus) setJettonAddressStatus('error')

      toast.error(typeof err === 'string' ? err : err instanceof Error ? err.message : String(err))
    }
  }

  const getLogoSrc = (token: Token) => {
    if (token.logo) return token.logo
    if (token.type === 'ton') return TonLogo
    return JettonLogo
  }

  // Helper to truncate addresses
  const truncateAddress = (addr: string) =>
    addr.length > 12 ? `${addr.slice(0, 4)}...${addr.slice(-4)}` : addr

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
          {showPreview && selected ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexGrow: 1 }}>
              <img
                src={getLogoSrc(selected)}
                alt={`${selected.symbol} logo`}
                style={{ width: 24, height: 24, borderRadius: '50%' }}
              />
              <span style={{ fontWeight: 'bold' }}>{selected.name}</span>
            </div>
          ) : (
            <span style={{ color: '#888', fontWeight: 500 }}>Select or enter address</span>
          )}
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
                fontWeight: mode === 'jetton' ? 600 : 400,
                background: mode === 'jetton' ? '#181a20' : 'none',
              }}
              onClick={() => handleModeChange('jetton')}
            >
              Custom Jetton
            </div>
          </div>
        )}
      </div>
      {mode === 'jetton' && (
        <input
          type='text'
          placeholder='Jetton address'
          value={customAddress}
          onChange={handleCustomAddressChange}
          style={{
            marginTop: 4,
            padding: '0.75rem',
            borderRadius: 12,
            border: !hasTyped
              ? 'none'
              : jettonAddressStatus === 'error'
                ? '1.5px solid #f85149'
                : jettonAddressStatus === 'success'
                  ? '1.5px solid #3fb950'
                  : 'none',
            background: '#23262f',
            color: '#fff',
            fontSize: '1.1rem',
            outline: 'none',
            boxShadow: !hasTyped
              ? undefined
              : jettonAddressStatus === 'error'
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
