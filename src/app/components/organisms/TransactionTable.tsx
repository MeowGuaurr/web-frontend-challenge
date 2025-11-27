"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "@/app/context/UserContext";

type Transaction = {
  id: string;
  date: string;
  description: string;
  amount: number;
  currency: string;
};

const TransactionTable: React.FC = () => {
  const { accountId } = useUser();
  const [transactions, setTransactions] = useState<Transaction[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!accountId) return;
    let mounted = true;

    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const r = await fetch(
          `http://localhost:5566/accounts/${accountId}/transactions`
        );
        if (!mounted) return;
        if (!r.ok) {
          setError("Error al obtener transacciones");
          setTransactions([]);
          return;
        }
        const data = await r.json();
        // API { i:  }
        const items = Array.isArray(data.items) ? data.items : [];
        const mapped: Transaction[] = items.map((it: any) => ({
          id: it.transaction_number ?? Math.random().toString(36).slice(2),
          date: it.transaction_date ?? "",
          description: it.description ?? it.bank_description ?? "",
          amount:
            typeof it.amount === "object"
              ? it.amount.value ?? 0
              : it.amount ?? 0,
          currency:
            typeof it.amount === "object"
              ? it.amount.currency ?? ""
              : it.currency ?? "",
        }));
        if (!mounted) return;
        setTransactions(mapped);
      } catch (e) {
        if (!mounted) return;
        setError("No se pudieron obtener las transacciones");
        setTransactions([]);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();

    return () => {
      mounted = false;
    };
  }, [accountId]);

  if (!accountId)
    return (
      <div className="p-6">Selecciona una cuenta para ver transacciones.</div>
    );
  if (loading) return <div className="p-6">Cargando transacciones...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="p-6 overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="text-sm text-gray-500 border-b">
            <th className="py-2">Fecha</th>
            <th className="py-2">Descripción</th>
            <th className="py-2">Monto</th>
            <th className="py-2">Moneda</th>
          </tr>
        </thead>
        <tbody>
          {transactions && transactions.length === 0 && (
            <tr>
              <td colSpan={4} className="py-4 text-center">
                Sin transacciones
              </td>
            </tr>
          )}
          {transactions?.map((t) => (
            <tr key={t.id} className="border-b last:border-b-0">
              <td className="py-3 text-sm text-gray-600">{t.date}</td>
              <td className="py-3 text-sm">{t.description}</td>
              <td className="py-3 text-sm font-semibold">
                {t.amount.toLocaleString()}
              </td>
              <td className="py-3 text-sm text-gray-600">{t.currency}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
