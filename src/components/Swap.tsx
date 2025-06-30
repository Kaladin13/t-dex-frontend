import React, { useState, useEffect } from 'react'
import { useTonConnectUI, useTonAddress, useTonConnectModal } from '@tonconnect/ui-react'
import { useNetwork } from '../contexts/NetworkContext'
import { onBalanceInput, Token, fetchTonBalance } from '../services/dex'
import TokenSelector from './TokenSelector'
import './Swap.css'
import TonLogo from '../assets/ton-logo.svg'
import { fromNano } from '@ton/core'

const TactTokenA: Token = {
  type: 'jetton',
  address: 'kQBCzXhQNxS727KxwsHld8aVNoFpSka0Xzr3GUBOxC_l2gQM',
  balance: 0n,
  name: 'TactTokenA',
  logo: 'https://raw.githubusercontent.com/tact-lang/tact/refs/heads/main/docs/public/logomark-light.svg',
  symbol: 'A',
  vaultAddress: 'EQBBWii_pqdQWcWQ9pWPC7lt1qoNngdZ9TuUMgT81TFgQpi1',
}

const mockTokens: Token[] = [
  { type: 'ton', symbol: 'TON', name: 'Toncoin', logo: TonLogo, balance: 10000000000n },
  TactTokenA,
]

export default function Swap() {
  const [fromToken, setFromToken] = useState<Token>(mockTokens[0]!)
  const [toToken, setToToken] = useState<Token>(mockTokens[1]!)
  const [fromAmount, setFromAmount] = useState('')
  const [toAmount, setToAmount] = useState('')
  const [swapping, setSwapping] = useState(false)

  const [tonConnectUI] = useTonConnectUI()
  const userAddress = useTonAddress()
  const { open } = useTonConnectModal()
  const { network } = useNetwork()

  const [jettonAddressStatusFrom, setJettonAddressStatusFrom] = useState<
    'error' | 'success' | undefined
  >()
  const [jettonAddressStatusTo, setJettonAddressStatusTo] = useState<
    'error' | 'success' | undefined
  >()
  const [vaultAddressFrom, setVaultAddressFrom] = useState<string | undefined>()
  const [vaultAddressTo, setVaultAddressTo] = useState<string | undefined>()
  const [tonBalance, setTonBalance] = useState<string>('0')

  useEffect(() => {
    if (!userAddress || !tonConnectUI) return
    if (fromToken.type === 'ton' || toToken.type === 'ton') {
      fetchTonBalance({ tonConnectUI, network, setBalance: setTonBalance })
    }
  }, [userAddress, tonConnectUI, fromToken, toToken, network])

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
    const val = e.target.value.replace(/,/, '.')
    setFromAmount(val)
    setToAmount(val)

    await onBalanceInput({
      amount: val,
      tonConnectUI,
      network,
      fromToken,
      toToken,
      swapType: 'exactIn',
    })
  }

  const handleToAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/,/, '.')
    setToAmount(val)
    setFromAmount(val)

    // TODO: amountNeededToGetX
  }

  const setAmountFromBalance = (fraction: number) => {
    if (!userAddress) return

    const balanceString = fromToken.type === 'ton' ? tonBalance : fromNano(fromToken.balance)
    const balance = parseFloat(balanceString.replace(',', '.'))
    if (isNaN(balance)) return

    const amount = balance * fraction
    const amountString = amount.toLocaleString('en-US', {
      useGrouping: false,
      maximumFractionDigits: 20,
    })
    setFromAmount(amountString)
    // Also trigger the dependent updates
    handleFromAmountChange({ target: { value: amountString } } as React.ChangeEvent<HTMLInputElement>)
  }

  const handleFromTokenSelect = (token: Token) => {
    setFromToken(token)
    setFromAmount('')
    setToAmount('')
    // console.log(token)

    if (token.type === 'jetton') {
      setVaultAddressFrom(token.vaultAddress)
    } else {
      setVaultAddressFrom(undefined)
    }
  }

  const handleToTokenSelect = (token: Token) => {
    setToToken(token)
    setFromAmount('')
    setToAmount('')
    // console.log(token)

    if (token.type === 'jetton') {
      setVaultAddressTo(token.vaultAddress)
    } else {
      setVaultAddressTo(undefined)
    }
  }

  const handleSwap = () => {
    setSwapping(true)
    setTimeout(() => setSwapping(false), 1500)
  }

  const formatBalanceForDisplay = (token: Token) => {
    if (!userAddress) return '-'
    let balanceStr = '0'
    if (token.type === 'ton') {
      balanceStr = tonBalance
    } else {
      if (token.balance === 0n) return '0.0000'
      balanceStr = fromNano(token.balance)
    }
    const balance = parseFloat(balanceStr)
    if (isNaN(balance)) return '0.0000'
    // show more precision for small balances
    return balance.toFixed(balance > 0 && balance < 0.0001 ? 8 : 4)
  }

  const isAmountSelectorDisabled =
    !userAddress || (fromToken.type === 'jetton' && jettonAddressStatusFrom !== 'success')

  return (
    <div className='swap-card'>
      <h2>Swap</h2>
      <div className='swap-section'>
        <div className='token-select-header'>
          <span>From</span>
          <div className='balance'>Balance: {formatBalanceForDisplay(fromToken)}</div>
        </div>
        <div className='token-input-row'>
          <TokenSelector
            tokens={mockTokens}
            selected={fromToken}
            onSelect={handleFromTokenSelect}
            jettonAddressStatus={jettonAddressStatusFrom}
            setJettonAddressStatus={setJettonAddressStatusFrom}
            setVaultAddress={setVaultAddressFrom}
          />
          <div className='input-wrapper'>
            <input
              type='text'
              inputMode='decimal'
              value={fromAmount}
              onChange={handleFromAmountChange}
              placeholder='0'
              className='amount-input'
            />
            <div className='amount-setter'>
              <button
                onClick={() => setAmountFromBalance(0.5)}
                disabled={isAmountSelectorDisabled}
                className='amount-button'
              >
                Half
              </button>
              <button
                onClick={() => setAmountFromBalance(1)}
                disabled={isAmountSelectorDisabled}
                className='amount-button'
              >
                Max
              </button>
            </div>
            <div className='amount-usd'>$0.00</div>
          </div>
        </div>
      </div>
      <button
        className='swap-direction'
        onClick={handleSwapDirection}
      >
        &#8595;
      </button>
      <div className='swap-section'>
        <div className='token-select-header'>
          <span>To</span>
          <div className='balance'>Balance: {formatBalanceForDisplay(toToken)}</div>
        </div>
        <div className='token-input-row'>
          <TokenSelector
            tokens={mockTokens}
            selected={toToken}
            onSelect={handleToTokenSelect}
            jettonAddressStatus={jettonAddressStatusTo}
            setJettonAddressStatus={setJettonAddressStatusTo}
            setVaultAddress={setVaultAddressTo}
          />
          <div className='input-wrapper'>
            <input
              type='text'
              inputMode='decimal'
              value={toAmount}
              onChange={handleToAmountChange}
              placeholder='0'
              className='amount-input'
            />
            <div className='amount-usd'>$0.00</div>
          </div>
        </div>
      </div>
      <div className='swap-info'>
        <div>
          Price: 1 {fromToken.symbol} = 1 {toToken.symbol}
        </div>
        <div>Slippage: 0.5% (mock)</div>
      </div>

      {!userAddress ? (
        <button
          className='swap-btn'
          onClick={open}
        >
          Connect wallet
        </button>
      ) : (
        <button
          className='swap-btn'
          onClick={handleSwap}
          disabled={swapping || !fromAmount || !toAmount}
        >
          {swapping ? 'Swapping...' : 'Swap'}
        </button>
      )}
    </div>
  )
}
