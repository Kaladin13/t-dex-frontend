import React, { useState } from 'react'
import { useTonConnectUI } from '@tonconnect/ui-react'
import { useNetwork } from '../contexts/NetworkContext'
import { onBalanceInput, Token } from '../services/dex'
import TokenSelector from './TokenSelector'
import './Swap.css'

const mockTokens: Token[] = [
  { type: 'ton', symbol: 'TON', name: 'Toncoin', logo: '', balance: 100 },
  {
    type: 'jetton',
    symbol: 'USDT',
    name: 'Tether USD',
    logo: '',
    balance: 2500n,
    address: 'EQC_usdt',
    vaultAddress: '',
  },
  {
    type: 'jetton',
    symbol: 'JET',
    name: 'Jetton',
    logo: '',
    balance: 5000n,
    address: 'EQC_jet',
    vaultAddress: '',
  },
]

export default function Swap() {
  const [fromToken, setFromToken] = useState<Token>(mockTokens[0])
  const [toToken, setToToken] = useState<Token>(mockTokens[1])
  const [fromAmount, setFromAmount] = useState('')
  const [toAmount, setToAmount] = useState('')
  const [swapping, setSwapping] = useState(false)

  const [tonConnectUI] = useTonConnectUI()
  const { network } = useNetwork()

  const [jettonAddressStatusFrom, setJettonAddressStatusFrom] = useState<
    'error' | 'success' | undefined
  >()
  const [jettonAddressStatusTo, setJettonAddressStatusTo] = useState<
    'error' | 'success' | undefined
  >()
  const [vaultAddressFrom, setVaultAddressFrom] = useState<string | undefined>()
  const [vaultAddressTo, setVaultAddressTo] = useState<string | undefined>()

  const handleSwapDirection = () => {
    setFromToken(toToken)
    setToToken(fromToken)
    setFromAmount(toAmount)
    setToAmount(fromAmount)
    setVaultAddressFrom(vaultAddressTo)
    setVaultAddressTo(vaultAddressFrom)
    setJettonAddressStatusFrom(jettonAddressStatusTo)
    setJettonAddressStatusTo(jettonAddressStatusFrom)
  }

  const handleFromAmountChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setFromAmount(e.target.value)
    setToAmount(e.target.value)

    // TODO: get actual amount
    await onBalanceInput({
      amount: e.target.value,
      token: fromToken,
      tonConnectUI,
      network,
      fromToken,
      toToken,
    })
  }

  const handleToAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToAmount(e.target.value)
    setFromAmount(e.target.value)

    // TODO: amountNeededToGetX
  }

  const handleFromTokenSelect = (token: Token) => {
    setFromToken(token)

    // highlevel set
    if (token.type === 'jetton') {
      setVaultAddressFrom(token.vaultAddress)
    } else {
      setVaultAddressFrom(undefined)
    }
  }

  const handleToTokenSelect = (token: Token) => {
    setToToken(token)

    if (token.type === 'jetton') {
      setVaultAddressTo(token.vaultAddress)
    } else {
      setVaultAddressTo(undefined)
    }
  }

  const handleSwap = () => {
    setSwapping(true)
    // send actual swap
    setTimeout(() => setSwapping(false), 1500)
  }

  return (
    <div className='swap-card'>
      <h2>Swap</h2>
      <div className='swap-section'>
        <span>From</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <TokenSelector
            tokens={mockTokens}
            selected={fromToken}
            onSelect={handleFromTokenSelect}
            jettonAddressStatus={jettonAddressStatusFrom}
            setJettonAddressStatus={setJettonAddressStatusFrom}
            setVaultAddress={setVaultAddressFrom}
          />
          {fromToken.type === 'jetton' && fromToken.vaultAddress && (
            <span style={{ color: '#3fb950', fontSize: 12, marginLeft: 8 }}>
              Vault: {fromToken.vaultAddress}
            </span>
          )}
        </div>
        <input
          type='number'
          value={fromAmount}
          onChange={handleFromAmountChange}
          placeholder='0.0'
        />
        <div className='balance'>Balance: {fromToken.balance}</div>
      </div>
      <button
        className='swap-direction'
        onClick={handleSwapDirection}
      >
        &#8595;
      </button>
      <div className='swap-section'>
        <span>To</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <TokenSelector
            tokens={mockTokens}
            selected={toToken}
            onSelect={handleToTokenSelect}
            jettonAddressStatus={jettonAddressStatusTo}
            setJettonAddressStatus={setJettonAddressStatusTo}
            setVaultAddress={setVaultAddressTo}
          />
          {toToken.type === 'jetton' && toToken.vaultAddress && (
            <span style={{ color: '#3fb950', fontSize: 12, marginLeft: 8 }}>
              Vault: {toToken.vaultAddress}
            </span>
          )}
        </div>
        <input
          type='number'
          value={toAmount}
          onChange={handleToAmountChange}
          placeholder='0.0'
        />
        <div className='balance'>Balance: {toToken.balance}</div>
      </div>
      <div className='swap-info'>
        <div>
          Price: 1 {fromToken.symbol} = 1 {toToken.symbol}
        </div>
        <div>Slippage: 0.5% (mock)</div>
      </div>
      <button
        className='swap-btn'
        onClick={handleSwap}
        disabled={swapping || !fromAmount || !toAmount}
      >
        {swapping ? 'Swapping...' : 'Swap'}
      </button>
    </div>
  )
}
