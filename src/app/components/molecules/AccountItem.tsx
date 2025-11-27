"use client";

import React, { useState } from "react";
import Text from "../atoms/Text";
import IconButton from "../atoms/IconButton";
import { faCopy as copyIcon } from "@fortawesome/free-regular-svg-icons";

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
    } catch {
      // ignore copy failures
    }
  };

  const symbol = currency === "USD" ? "$" : "C$";

  return (
    <div className="w-80 h-40 p-4 gap-9 rounded-sm bg-white shadow-md flex flex-col justify-between">
      <div className="flex items-start justify-between">
        <div>
          <Text className="text-lg font-semibold">
            {currency}&nbsp;{alias}
          </Text>
          <div className="flex items-center mt-2 text-xs text-greenSecondary">
            <div className="flex items-center">
              <div className="text-sm font-medium">{account_number}</div>
              <IconButton
                ariaLabel="Copiar número"
                onClick={handleCopy}
                icon={copyIcon}
                className="text-greenSecondary"
              />
              {copied && <span className="text-xs text-black">Copiado</span>}
            </div>
          </div>
        </div>

        <div className="mr-2 text-lg">{countryFlag(currency)}</div>
      </div>
      <div>
        <div className="text-2xl font-semibold text-black">
          {symbol}
          {balance.toLocaleString()}
        </div>
      </div>
    </div>
  );
};

export default AccountItem;
