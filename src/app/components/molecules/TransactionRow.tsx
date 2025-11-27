import React from "react";
import Text from "../atoms/Text";

export type Transaction = {
  date: string;
  description: string;
  debit: number;
  balance: number;
};

type Props = { transaction: Transaction };

const TransactionRow: React.FC<Props> = ({ transaction }) => {
  const formatDebit = (value: number) =>
    value.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  // Without decimals
  const formatBalance = (value: number) =>
    value.toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });

  return (
    <div className="grid grid-cols-4 gap-4 items-center py-3 border-b border-gray-100 last:border-b-0 text-sm">
      <div className="text-left">
        <Text>{transaction.date}</Text>
      </div>

      <div className="text-left">
        <Text className="truncate">{transaction.description}</Text>
      </div>

      <div className="text-right">
        <Text>{formatDebit(transaction.debit)}</Text>
      </div>

      <div className="text-right">
        <Text>{formatBalance(transaction.balance)}</Text>
      </div>
    </div>
  );
};

export default TransactionRow;
