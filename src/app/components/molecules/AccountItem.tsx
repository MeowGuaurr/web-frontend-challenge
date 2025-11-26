"use client";

import React, { useState } from 'react';
import Text from '../atoms/Text';
import IconButton from '../atoms/IconButton';

type AccountItemProps = {
  alias: string;
  account_number: string;
  balance: number;
  currency: string;
  country_code?: string; // 'NI', 'US'
};

function countryFlag(code?: string) {
  if (!code) return '🏳️';
  const map: Record<string, string> = {
    NI: '🇳🇮',
    US: '🇺🇸',
  };
  return map[code] ?? '🏳️';
}

const AccountItem: React.FC<AccountItemProps> = ({ alias, account_number, balance, currency, country_code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(account_number);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore copy failures
    }
  };

  const symbol = currency === 'USD' ? '$' : 'C$';

  return (
    <div className="w-80 p-5 bg-white rounded-lg shadow-md flex flex-col justify-between">
      <div className="flex items-start justify-between">
        <div>
          <Text className="text-sm font-semibold">{alias}</Text>
          <div className="flex items-center mt-2 text-xs text-gray-500">
            <div className="mr-2">{countryFlag(country_code)}</div>
            <div className="flex items-center gap-2">
              <div className="text-xs font-mono">{account_number}</div>
              <IconButton ariaLabel="Copiar número" onClick={handleCopy} icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4"><path d="M8 7V4a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2h-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>} />
              {copied && <span className="text-xs text-green-700">Copiado</span>}
            </div>
          </div>
        </div>

        <div className="text-right">
          <Text className="text-xs">Saldo</Text>
          <div className="text-2xl font-bold text-green-800">
            {symbol}{balance.toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountItem;
