import React, { useState, useEffect, useCallback } from 'react'
import { useTonConnectUI, useTonAddress, useTonConnectModal } from '@tonconnect/ui-react'
import { useNetwork } from '../contexts/NetworkContext'
import {
  onBalanceInput,
  Token,
  fetchTonBalance,
  handleFromSwapAction,
  getExchangeRate,
  onJettonAddressInput,
} from '../services/dex'
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
  const [toToken, setToToken] = useState<Token | undefined>(undefined)
  const [fromAmount, setFromAmount] = useState('')
  const [toAmount, setToAmount] = useState('')
  const [swapping, setSwapping] = useState(false)
  const [exchangeRates, setExchangeRates] = useState({ directRate: '1', reverseRate: '1' })
  const [debouncedFromAmount, setDebouncedFromAmount] = useState('')
  const [debouncedToAmount, setDebouncedToAmount] = useState('')
  const [lastChangedField, setLastChangedField] = useState<'from' | 'to' | null>(null)

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
  const [slippage, setSlippage] = useState<number>(0.5)
  const [customSlippage, setCustomSlippage] = useState<string>('')
  const [isCustomSlippage, setIsCustomSlippage] = useState<boolean>(false)

  useEffect(() => {
    if (!userAddress || !tonConnectUI) return
    if (fromToken.type === 'ton' || (toToken && toToken.type === 'ton')) {
      fetchTonBalance({ tonConnectUI, network, setBalance: setTonBalance })
    }
  }, [userAddress, tonConnectUI, fromToken, toToken, network])

  useEffect(() => {
    if (!tonConnectUI || !toToken) return

    const isFromTokenValid =
      fromToken.type === 'ton' ||
      (fromToken.type === 'jetton' && fromToken.address && fromToken.address.trim() !== '')
    const isToTokenValid =
      toToken.type === 'ton' ||
      (toToken.type === 'jetton' && toToken.address && toToken.address.trim() !== '')

    if (!isFromTokenValid || !isToTokenValid) {
      setExchangeRates({ directRate: '1', reverseRate: '1' })
      return
    }

    const updateExchangeRate = async () => {
      const rates = await getExchangeRate({
        tonConnectUI,
        network,
        fromToken,
        toToken,
      })
      setExchangeRates(rates)
    }

    updateExchangeRate()
  }, [fromToken, toToken, tonConnectUI, network])

  // Debounce для fromAmount
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedFromAmount(fromAmount)
    }, 150)

    return () => clearTimeout(timer)
  }, [fromAmount])

  // Debounce для toAmount
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedToAmount(toAmount)
    }, 150)

    return () => clearTimeout(timer)
  }, [toAmount])

  // Обработка debouncedFromAmount
  useEffect(() => {
    if (!debouncedFromAmount || !toToken || lastChangedField !== 'from') return

    const updateToAmount = async () => {
      await onBalanceInput({
        amount: debouncedFromAmount,
        tonConnectUI,
        network,
        fromToken,
        toToken,
        swapType: 'exactIn',
        setToAmount,
        slippage,
      })
    }

    updateToAmount()
  }, [debouncedFromAmount, toToken, tonConnectUI, network, fromToken, lastChangedField])

  // Обработка debouncedToAmount
  useEffect(() => {
    if (!debouncedToAmount || !toToken || lastChangedField !== 'to') return

    const updateFromAmount = async () => {
      await onBalanceInput({
        amount: debouncedToAmount,
        tonConnectUI,
        network,
        fromToken,
        toToken,
        swapType: 'exactOut',
        setFromAmount,
        slippage,
      })
    }

    updateFromAmount()
  }, [debouncedToAmount, toToken, tonConnectUI, network, fromToken, lastChangedField])

  const handleSwapDirection = () => {
    if (!toToken) return
    setFromToken(toToken)
    setToToken(fromToken)
    setFromAmount(toAmount)
    setToAmount(fromAmount)
    setVaultAddressFrom(vaultAddressTo)
    setVaultAddressTo(vaultAddressFrom)
    setJettonAddressStatusFrom(jettonAddressStatusTo)
    setJettonAddressStatusTo(jettonAddressStatusFrom)
    setLastChangedField(null)
  }

  const handleFromAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value

    // Разрешаем только цифры, точку и запятую
    const numericRegex = /^[0-9]*[.,]?[0-9]*$/
    if (inputValue !== '' && !numericRegex.test(inputValue)) {
      return // Не обновляем состояние если ввод некорректный
    }

    const val = inputValue.replace(/,/, '.')
    setFromAmount(val)
    setLastChangedField('from')
  }

  const handleToAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value

    // Разрешаем только цифры, точку и запятую
    const numericRegex = /^[0-9]*[.,]?[0-9]*$/
    if (inputValue !== '' && !numericRegex.test(inputValue)) {
      return // Не обновляем состояние если ввод некорректный
    }

    const val = inputValue.replace(/,/, '.')
    setToAmount(val)
    setLastChangedField('to')
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
    setLastChangedField('from')
  }

  const handleFromTokenSelect = (token: Token) => {
    setFromToken(token)
    setFromAmount('')
    setToAmount('')
    setLastChangedField(null)
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
    setLastChangedField(null)
    // console.log(token)

    if (token.type === 'jetton') {
      setVaultAddressTo(token.vaultAddress)
    } else {
      setVaultAddressTo(undefined)
    }
  }

  const handleSwap = () => {
    if (!toToken) return
    setSwapping(true)
    handleFromSwapAction(tonConnectUI, fromToken, toToken, fromAmount, slippage)
    setTimeout(() => setSwapping(false), 40000)
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

  const calculateMinAmountWithSlippage = (amount: string, slippagePercent: number) => {
    if (!amount || amount === '0' || amount === '') return '0'
    const numAmount = parseFloat(amount)
    if (isNaN(numAmount)) return '0'
    const minAmount = numAmount * (1 - slippagePercent / 100)
    return minAmount.toFixed(minAmount > 0 && minAmount < 0.0001 ? 8 : 4)
  }

  const calculateMaxAmountWithSlippage = (amount: string, slippagePercent: number) => {
    if (!amount || amount === '0' || amount === '') return '0'
    const numAmount = parseFloat(amount)
    if (isNaN(numAmount)) return '0'
    const maxAmount = numAmount * (1 + slippagePercent / 100)
    return maxAmount.toFixed(maxAmount > 0 && maxAmount < 0.0001 ? 8 : 4)
  }

  const getTonViewerLink = (token: Token) => {
    if (token.type === 'ton') {
      // Для TON используем адрес TON Vault
      return `https://testnet.tonviewer.com/EQDTsG5OoAbrtTRpYMHlmqDXwI9mj3Iv-wj-NNrNf0BDG-zD`
    } else if (token.type === 'jetton' && token.address) {
      return `https://testnet.tonviewer.com/${token.address}`
    }
    return null
  }

  const openTonViewer = (token: Token) => {
    const link = getTonViewerLink(token)
    if (link) {
      window.open(link, '_blank')
    }
  }

  const isAmountSelectorDisabled =
    !userAddress || (fromToken.type === 'jetton' && jettonAddressStatusFrom !== 'success')

  const { directRate, reverseRate } = exchangeRates

  const handleQuickTest = async () => {
    try {
      // Очищаем состояние
      setFromAmount('')
      setToAmount('')
      setLastChangedField(null)

      // Загружаем первый токен
      await onJettonAddressInput({
        address: 'kQBCzXhQNxS727KxwsHld8aVNoFpSka0Xzr3GUBOxC_l2gQM',
        tonConnectUI,
        network,
        setVaultAddress: setVaultAddressFrom,
        onSelect: handleFromTokenSelect,
      })

      // Загружаем второй токен
      await onJettonAddressInput({
        address: 'kQDO8Rt30nYL8RbXOWWMCqY3E4o-mN-tum0MTlABiFTDtz2p',
        tonConnectUI,
        network,
        setVaultAddress: setVaultAddressTo,
        onSelect: handleToTokenSelect,
      })

      setJettonAddressStatusFrom('success')
      setJettonAddressStatusTo('success')
    } catch (error) {
      console.error('Error in quick test:', error)
      setJettonAddressStatusFrom('error')
      setJettonAddressStatusTo('error')
    }
  }

  return (
    <div className='swap-card'>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1rem',
        }}
      >
        <h2>Swap</h2>
        <button
          onClick={handleQuickTest}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '0.9rem',
            fontWeight: '500',
          }}
        >
          Quick Test
        </button>
      </div>
      <div className='swap-section'>
        <div className='token-select-header'>
          <span>From</span>
          <div className='balance'>
            Balance: {formatBalanceForDisplay(fromToken)}
            {(fromToken.type === 'ton' || (fromToken.type === 'jetton' && vaultAddressFrom)) && (
              <button
                onClick={() => openTonViewer(fromToken)}
                style={{
                  marginLeft: '8px',
                  padding: '2px 6px',
                  fontSize: '12px',
                  background: 'none',
                  border: '1px solid #007bff',
                  borderRadius: '4px',
                  color: '#007bff',
                  cursor: 'pointer',
                  textDecoration: 'none',
                }}
                title='Открыть в TonViewer'
              >
                🔗
              </button>
            )}
          </div>
        </div>
        <div className='token-input-row'>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <TokenSelector
              tokens={mockTokens}
              selected={fromToken}
              onSelect={handleFromTokenSelect}
              jettonAddressStatus={jettonAddressStatusFrom}
              setJettonAddressStatus={setJettonAddressStatusFrom}
              setVaultAddress={setVaultAddressFrom}
            />
          </div>
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

            {lastChangedField === 'to' && toAmount && toToken && (
              <div style={{ fontSize: '0.75rem', color: '#888', marginTop: '0.25rem' }}>
                Max amount to pay: {calculateMaxAmountWithSlippage(fromAmount, slippage)}{' '}
                {fromToken.symbol}
              </div>
            )}
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
          <div className='balance'>
            Balance: {toToken ? formatBalanceForDisplay(toToken) : '-'}
            {toToken &&
              (toToken.type === 'ton' || (toToken.type === 'jetton' && vaultAddressTo)) && (
                <button
                  onClick={() => openTonViewer(toToken)}
                  style={{
                    marginLeft: '8px',
                    padding: '2px 6px',
                    fontSize: '12px',
                    background: 'none',
                    border: '1px solid #007bff',
                    borderRadius: '4px',
                    color: '#007bff',
                    cursor: 'pointer',
                    textDecoration: 'none',
                  }}
                  title='Открыть в TonViewer'
                >
                  🔗
                </button>
              )}
          </div>
        </div>
        <div className='token-input-row'>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <TokenSelector
              tokens={mockTokens}
              selected={toToken}
              onSelect={handleToTokenSelect}
              jettonAddressStatus={jettonAddressStatusTo}
              setJettonAddressStatus={setJettonAddressStatusTo}
              setVaultAddress={setVaultAddressTo}
            />
          </div>
          <div className='input-wrapper'>
            <input
              type='text'
              inputMode='decimal'
              value={toAmount}
              onChange={handleToAmountChange}
              placeholder='0'
              className='amount-input'
            />

            {lastChangedField === 'from' && toAmount && toToken && (
              <div style={{ fontSize: '0.75rem', color: '#888', marginTop: '0.25rem' }}>
                Min amount to receive: {calculateMinAmountWithSlippage(toAmount, slippage)}{' '}
                {toToken.symbol}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className='swap-info'>
        {toToken ? (
          <>
            <div>
              Price: 1 {fromToken.symbol} = {directRate} {toToken.symbol}
            </div>
            <div>
              1 {toToken.symbol} = {reverseRate} {fromToken.symbol}
            </div>
          </>
        ) : (
          <div>Select a token to see exchange rate</div>
        )}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <span>Max Slippage:</span>
          <div style={{ display: 'flex', gap: '0.25rem' }}>
            {[0.5, 1, 5].map((value) => (
              <button
                key={value}
                onClick={() => {
                  setSlippage(value)
                  setIsCustomSlippage(false)
                  setCustomSlippage('')
                }}
                style={{
                  padding: '0.25rem 0.5rem',
                  border: '1px solid #007bff',
                  borderRadius: '0.5rem',
                  background: slippage === value && !isCustomSlippage ? '#007bff' : 'transparent',
                  color: slippage === value && !isCustomSlippage ? 'white' : '#007bff',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  fontWeight: '500',
                }}
              >
                {value}%
              </button>
            ))}
            <input
              type='text'
              value={customSlippage}
              onChange={(e) => {
                const value = e.target.value
                if (value === '' || /^\d*\.?\d*$/.test(value)) {
                  setCustomSlippage(value)
                  if (value !== '') {
                    const numValue = parseFloat(value)
                    if (!isNaN(numValue) && numValue >= 0 && numValue <= 50) {
                      setSlippage(numValue)
                      setIsCustomSlippage(true)
                    }
                  }
                }
              }}
              placeholder='Custom'
              style={{
                width: '60px',
                padding: '0.25rem 0.5rem',
                border: '1px solid #007bff',
                borderRadius: '0.5rem',
                background: isCustomSlippage ? '#007bff' : 'transparent',
                color: isCustomSlippage ? 'white' : '#007bff',
                fontSize: '0.8rem',
                textAlign: 'center',
              }}
            />
            {isCustomSlippage && customSlippage && (
              <span style={{ fontSize: '0.8rem', color: '#007bff' }}>%</span>
            )}
          </div>
        </div>
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
          disabled={swapping || !fromAmount || !toAmount || !toToken}
        >
          {swapping ? 'Swapping...' : 'Swap'}
        </button>
      )}
    </div>
  )
}
