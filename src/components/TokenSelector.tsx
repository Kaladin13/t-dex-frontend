import React, { useState } from 'react';

type Token = {
  symbol: string;
  name: string;
  logo: string;
  balance: number;
  address?: string;
};

type Props = {
  tokens: Token[];
  selected: Token;
  onSelect: (token: Token) => void;
};

export default function TokenSelector({ tokens, selected, onSelect }: Props) {
  const [customAddress, setCustomAddress] = useState(selected.address || '');
  const [mode, setMode] = useState(selected.symbol === 'TON' ? 'ton' : 'custom');

  const handleModeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setMode(value);
    if (value === 'ton') {
      const ton = tokens.find(t => t.symbol === 'TON');
      if (ton) onSelect(ton);
    } else if (customAddress) {
      onSelect({ symbol: 'JETTON', name: 'Custom Jetton', logo: '', balance: 0, address: customAddress });
    }
  };

  const handleCustomAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const addr = e.target.value;
    setCustomAddress(addr);
    onSelect({ symbol: 'JETTON', name: 'Custom Jetton', logo: '', balance: 0, address: addr });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <select value={mode} onChange={handleModeChange}>
        <option value="ton">TON</option>
        <option value="custom">Custom Jetton</option>
      </select>
      {mode === 'custom' && (
        <input
          type="text"
          placeholder="Jetton address"
          value={customAddress}
          onChange={handleCustomAddressChange}
          style={{ marginTop: 4, padding: '0.5rem', borderRadius: 8, border: '1px solid #333', background: '#23262f', color: '#fff' }}
        />
      )}
    </div>
  );
} 