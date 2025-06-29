import React, { useState } from 'react';
import TokenSelector from './TokenSelector';
import './Swap.css';

const mockTokens = [
  { symbol: 'TON', name: 'Toncoin', logo: '', balance: 100 },
  { symbol: 'USDT', name: 'Tether USD', logo: '', balance: 2500 },
  { symbol: 'JET', name: 'Jetton', logo: '', balance: 5000 },
];

export default function Swap() {
  const [fromToken, setFromToken] = useState(mockTokens[0]);
  const [toToken, setToToken] = useState(mockTokens[1]);
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [swapping, setSwapping] = useState(false);

  const handleSwapDirection = () => {
    setFromToken(toToken);
    setToToken(fromToken);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  };

  const handleFromAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFromAmount(e.target.value);
    // Mock price: 1:1 for now
    setToAmount(e.target.value);
  };

  const handleToAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToAmount(e.target.value);
    setFromAmount(e.target.value);
  };

  const handleSwap = () => {
    setSwapping(true);
    setTimeout(() => setSwapping(false), 1500);
  };

  return (
    <div className="swap-card">
      <h2>Swap</h2>
      <div className="swap-section">
        <span>From</span>
        <TokenSelector tokens={mockTokens} selected={fromToken} onSelect={setFromToken} />
        <input type="number" value={fromAmount} onChange={handleFromAmountChange} placeholder="0.0" />
        <div className="balance">Balance: {fromToken.balance}</div>
      </div>
      <button className="swap-direction" onClick={handleSwapDirection}>&#8595;</button>
      <div className="swap-section">
        <span>To</span>
        <TokenSelector tokens={mockTokens} selected={toToken} onSelect={setToToken} />
        <input type="number" value={toAmount} onChange={handleToAmountChange} placeholder="0.0" />
        <div className="balance">Balance: {toToken.balance}</div>
      </div>
      <div className="swap-info">
        <div>Price: 1 {fromToken.symbol} = 1 {toToken.symbol}</div>
        <div>Slippage: 0.5% (mock)</div>
      </div>
      <button className="swap-btn" onClick={handleSwap} disabled={swapping || !fromAmount || !toAmount}>
        {swapping ? 'Swapping...' : 'Swap'}
      </button>
    </div>
  );
} 