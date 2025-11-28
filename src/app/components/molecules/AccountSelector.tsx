'use client';

import React from 'react';

type Account = {
  id: string;
  account_number?: string;
  balance?: number;
  currency?: string;
};

const AccountSelector: React.FC<{
  accounts: Account[];
  value?: string | null;
  onChange?: (id: string) => void;
}> = ({ accounts, value, onChange }) => {
  return (
    <div className="flex items-center gap-4">
      <div className="relative w-72">
        <select
          value={value ?? ''}
          onChange={(e) => onChange?.(e.target.value)}
          className="
            w-full h-12
            pl-3 pr-8
            bg-white
            border border-gray-200
            rounded-lg
            shadow-sm
            text-sm
            focus:outline-none
            focus:ring-2
            focus:ring-emerald-500/30
            focus:border-emerald-500
            transition-all
            cursor-pointer
          "
        >
          <option value="">Selecciona una cuenta</option>
          {accounts.map((a) => (
            <option key={a.id} value={a.id}>
              {a.account_number}
            </option>
          ))}
        </select>
      </div>

      <div
        className="
          w-72 h-12
          flex flex-col justify-center
          bg-emerald-50/60
          border border-emerald-100
          rounded-lg
          px-3
          shadow-sm
        "
      >
        <span className="text-xs text-gray-600">Saldo</span>

        <span className="font-semibold text-gray-800 text-sm leading-tight">
          {(() => {
            const sel = accounts.find((x) => x.id === value);
            if (!sel) return '—';
            const bal = sel.balance ?? 0;
            const cur = sel.currency ?? 'C$';
            return `${cur} ${bal.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            })}`;
          })()}
        </span>
      </div>
    </div>
  );
};

export default AccountSelector;
