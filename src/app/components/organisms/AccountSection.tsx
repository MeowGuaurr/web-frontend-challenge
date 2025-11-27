"use client";

import React, { useEffect, useState } from "react";
import AccountItem from "../molecules/AccountItem";
import Text from "../atoms/Text";
import { useUser } from "@/app/context/UserContext";

const AccountSection: React.FC = () => {
  const { accountId, user } = useUser();
  type Account = {
    alias?: string;
    account_number: string;
    balance: number;
    currency: string;
    country_code?: string;
  };

  const [accounts, setAccounts] = useState<Account[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const accountIds: string[] = [];
    if (user?.products && Array.isArray(user.products)) {
      user.products.forEach((p: { type: string; id: string }) => {
        if (p.type === "Account") accountIds.push(p.id);
      });
    }
    if (accountIds.length === 0 && accountId) accountIds.push(accountId);

    let mounted = true;

    const loadAll = async () => {
      try {
        setLoading(true);
        setError(null);

        if (accountIds.length > 0) {
          const results = await Promise.all(
            accountIds.map(async (id) => {
              try {
                const r = await fetch(`http://localhost:5566/accounts/${id}`);
                if (!r.ok) return null;
                return (await r.json()) as Account;
              } catch {
                return null;
              }
            })
          );
          if (!mounted) return;
          setAccounts(results.filter(Boolean) as Account[]);
          return;
        }

        if (user?.id) {
          const r = await fetch(
            `http://localhost:5566/users/${user.id}/accounts`
          );
          if (!mounted) return;
          if (r.ok) {
            const data = await r.json();
            setAccounts(Array.isArray(data) ? data : []);
            return;
          }
        }

        // no accounts found
        if (mounted) setAccounts([]);
      } catch (e) {
        if (!mounted) return;
        setError("No se pudieron obtener las cuentas");
        setAccounts([]);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    loadAll();

    return () => {
      mounted = false;
    };
  }, [accountId, user]);

  return (
    <section className="py-6">
      <div className="flex items-center justify-between px-4 sm:px-6">
        <Text className="text-xl font-bold">Cuentas</Text>
      </div>

      <div className="mt-4 overflow-x-auto px-4 sm:px-6">
        <div className="flex gap-6 sm:gap-9 py-2 w-max items-stretch">
          {loading && <div className="p-4">Cargando cuentas...</div>}
          {error && <div className="p-4 text-red-600">{error}</div>}
          {!loading && !error && accounts && accounts.length === 0 && (
            <div className="p-4">No se encontraron cuentas.</div>
          )}

          {!loading &&
            !error &&
            accounts &&
            accounts.length > 0 &&
            accounts.map((acc, i) => (
              <AccountItem
                key={i}
                alias={acc.alias ?? acc.account_number}
                account_number={acc.account_number}
                balance={acc.balance}
                currency={acc.currency}
              />
            ))}
        </div>
      </div>
    </section>
  );
};

export default AccountSection;
