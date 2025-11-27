"use client";

import React from "react";
import { ChevronDown } from "lucide-react";

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
      <div className="relative">
        <select
          value={value ?? ""}
          onChange={(e) => onChange?.(e.target.value)}
          className="appearance-none pr-8 w-72 p-2 border border-gray-200 rounded bg-white"
        >
          <option value="">Selecciona cuenta</option>
          {accounts.map((a) => (
            <option key={a.id} value={a.id}>
              {a.id}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
          <ChevronDown className="w-4 h-4 text-gray-500" />
        </div>
      </div>

      <div className="flex flex-col text-sm">
        <span className="text-gray-600">Saldo</span>
        <span className="font-semibold text-gray-800">
          {(() => {
            const sel = accounts.find((x) => x.id === value);
            if (!sel) return "—";
            const bal = sel.balance ?? 0;
            const cur = sel.currency ?? "C$";
            return `${cur} ${bal.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            })}`;
          })()}
        </span>
        <span className="text-xs text-gray-400">
          {accounts.find((x) => x.id === value)?.account_number ?? ""}
        </span>
      </div>
    </div>
  );
};

export default AccountSelector;
