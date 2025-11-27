"use client";

import React, { useState } from "react";
import Text from "../atoms/Text";
import IconButton from "../atoms/IconButton";

type AccountItemProps = {
  alias: string;
  account_number: string;
  balance: number;
  currency: string;
};

function countryFlag(currency: string): string {
  // couldn't find free icons, so using emojis
  if (currency === "NIO") return "🇳🇮";
  if (currency === "USD") return "🇺🇸";
  return "🇳🇮";
}

const AccountItem: React.FC<AccountItemProps> = ({
  alias,
  account_number,
  balance,
  currency,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(account_number);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  const symbol = currency === "USD" ? "$" : "C$";

  return (
    <div className="w-80 h-40 p-4 gap-9 rounded-sm bg-white shadow-md flex flex-col justify-between shrink-0">
      <div className="flex items-start justify-between">
        <div>
          <Text className="text-md font-semibold">
            {currency}&nbsp;{alias}
          </Text>
          <div className="flex items-center mt-2 text-xs text-greenSecondary">
            <div className="flex items-center">
              <div className="text-sm font-medium">{account_number}</div>
              <IconButton
                ariaLabel="Copiar número"
                onClick={handleCopy}
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="w-4 h-4"
                  >
                    <rect
                      x="9"
                      y="9"
                      width="13"
                      height="13"
                      rx="2"
                      ry="2"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      fill="none"
                    />
                    <path
                      d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      fill="none"
                    />
                  </svg>
                }
                className="text-greenSecondary"
              />
              {copied && <span className="text-xs text-black">Copiado</span>}
            </div>
          </div>
        </div>

        <div className="mr-2 text-md">{countryFlag(currency)}</div>
      </div>
      <div>
        <div className="text-md font-semibold text-black">
          {symbol}
          {balance.toLocaleString()}
        </div>
      </div>
    </div>
  );
};

export default AccountItem;
