"use client";

import React, { useState, useMemo } from "react";
import Select from "../atoms/Select";

const EXCHANGE_RATE_NIO_PER_USD = 36.5; // static conversion rate
const BASE_AMOUNT = 1;

const CurrencySelector: React.FC = () => {
  const currencies = [
    { value: "NIO", label: "Córdoba" },
    { value: "USD", label: "USD" },
  ];

  const [fromCurrency, setFromCurrency] = useState<"NIO" | "USD">("NIO");
  const [toCurrency, setToCurrency] = useState<"NIO" | "USD">("USD");

  const { nioValue, usdValue } = useMemo(() => {
    if (fromCurrency === "NIO" && toCurrency === "USD") {
      const nio = BASE_AMOUNT;
      const usd = nio / EXCHANGE_RATE_NIO_PER_USD;
      return { nioValue: nio, usdValue: usd };
    }

    if (fromCurrency === "USD" && toCurrency === "NIO") {
      const usd = BASE_AMOUNT;
      const nio = usd * EXCHANGE_RATE_NIO_PER_USD;
      return { nioValue: nio, usdValue: usd };
    }

    return { nioValue: BASE_AMOUNT, usdValue: BASE_AMOUNT };
  }, [fromCurrency, toCurrency]);

  return (
    <div className="space-y-2 text-xs">
      <div className="flex items-center gap-2">
        <Select options={currencies} value={"NIO"} />
        <Select
          options={currencies}
          value={toCurrency}
          onChange={(value) => setToCurrency(value as "NIO" | "USD")}
        />
      </div>

      <div className="flex items-center justify-center gap-4">
        <span className="font-medium">{nioValue.toFixed(2)}</span>

        <button
          type="button"
          className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-soft text-white text-[10px]"
        >
          ⇄
        </button>

        <span className="font-medium">{usdValue.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default CurrencySelector;
