"use client";

import React from "react";
import TransactionTable from "@/app/components/organisms/TransactionTable";

const TransactionsIndex: React.FC = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-2">Transacciones</h2>
      <TransactionTable />
    </div>
  );
};

export default TransactionsIndex;
