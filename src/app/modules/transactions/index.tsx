"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "@/app/context/UserContext";
import TransactionTable from "@/app/components/organisms/TransactionTable";

type Account = {
  id: string;
  alias?: string;
  account_number?: string;
};

const TransactionsIndex: React.FC = () => {
  const { user, accountId, setAccountId } = useUser();
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const ids: string[] = [];
    if (user?.products && Array.isArray(user.products)) {
      user.products.forEach((p: { type: string; id: string }) => {
        if (p.type === "Account") ids.push(p.id);
      });
    }
    if (ids.length === 0) return;

    let mounted = true;
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const results = await Promise.all(
          ids.map(async (id) => {
            try {
              const r = await fetch(`http://localhost:5566/accounts/${id}`);
              if (!r.ok) return { id } as Account;
              const data = await r.json();
              return {
                id,
                alias: data.alias,
                account_number: data.account_number,
              } as Account;
            } catch {
              return { id } as Account;
            }
          })
        );
        if (!mounted) return;
        setAccounts(results.filter(Boolean) as Account[]);
        if (!accountId && results[0]?.id) setAccountId(results[0].id);
      } catch (e) {
        if (!mounted) return;
        setError("No se pudieron obtener las cuentas del usuario");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();
    return () => {
      mounted = false;
    };
  }, [user]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-2">Transacciones</h2>

      <div className="mb-4">
        {loading && <div>Cargando cuentas...</div>}
        {error && <div className="text-red-600">{error}</div>}
        {!loading && accounts.length > 0 && (
          <label className="block mb-2">
            <span className="text-sm text-gray-600">Seleccionar cuenta</span>
            <select
              className="mt-1 block w-64 p-2 border rounded"
              value={accountId ?? ""}
              onChange={(e) => setAccountId(e.target.value)}
            >
              {accounts.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.id}
                </option>
              ))}
            </select>
          </label>
        )}
        {!loading && accounts.length === 0 && (
          <div>No hay cuentas disponibles para este usuario.</div>
        )}
      </div>

      <TransactionTable />
    </div>
  );
};

export default TransactionsIndex;
