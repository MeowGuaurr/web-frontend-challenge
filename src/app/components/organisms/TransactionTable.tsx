import React from "react";
import ViewAllHeader from "../molecules/ViewAllHeader";
import TransactionRow, { Transaction } from "../molecules/TransactionRow";
import Text from "../atoms/Text";

//dummy data to cosume from api later
const TRANSACTIONS_DATA: Transaction[] = [
  { date: "14/11/2021", description: "Walmart", debit: 320.0, balance: 2100 },
  {
    date: "12/11/2021",
    description: "Hugo Delivery",
    debit: 12.45,
    balance: 2100,
  },
  {
    date: "14/Nov/2021",
    description: "Walmart Carretera Masaya",
    debit: 320.0,
    balance: 2100,
  },
];

const TransactionTable: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100">
      <div className="flex items-center justify-between px-6 pt-4 pb-3">
        <ViewAllHeader />
      </div>

      {/* Encabezados */}
      <div className="px-6 pb-2">
        <div className="grid grid-cols-4 gap-4 text-xs font-semibold text-gray-400 uppercase tracking-wide border-b border-gray-100 pb-2">
          <div className="text-left">
            <Text>Fecha</Text>
          </div>
          <div className="text-left">
            <Text>Descripción</Text>
          </div>
          <div className="text-right">
            <Text>Débito USD</Text>
          </div>
          <div className="text-right">
            <Text>Balance USD</Text>
          </div>
        </div>
      </div>

      {/* Filas */}
      <div className="px-6 pb-4">
        {TRANSACTIONS_DATA.map((t, i) => (
          <TransactionRow key={i} transaction={t} />
        ))}
      </div>
    </div>
  );
};

export default TransactionTable;
