'use client';

import { useUser } from '@/app/context/UserContext';
import { useEffect, useMemo, useState } from 'react';

type Account = {
  id: string;
  account_number?: string;
  balance?: number;
  currency?: string;
};

export function useTransferForm() {
  const { user, accountId, setAccountId } = useUser();

  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loadingAccounts, setLoadingAccounts] = useState(false);
  const [errorAccounts, setErrorAccounts] = useState<string | null>(null);

  const [destination, setDestination] = useState('');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState<string | undefined>(undefined);
  const [posting, setPosting] = useState(false);
  const [postError, setPostError] = useState<string | null>(null);
  const [postSuccess, setPostSuccess] = useState<string | null>(null);

  const [showConfirm, setShowConfirm] = useState(false);
  const [preparedPayload, setPreparedPayload] = useState<any | null>(null);

  const [debitConcept, setDebitConcept] = useState('');
  const [creditConcept, setCreditConcept] = useState('');
  const [reference, setReference] = useState('');
  const [emailConfirmation, setEmailConfirmation] = useState('');

  useEffect(() => {
    const ids: string[] = [];
    if (user?.products && Array.isArray(user.products)) {
      user.products.forEach((p: { type: string; id: string }) => {
        if (p.type === 'Account') ids.push(p.id);
      });
    }
    if (ids.length === 0) return;

    let mounted = true;
    const load = async () => {
      try {
        setLoadingAccounts(true);
        setErrorAccounts(null);
        const results = await Promise.all(
          ids.map(async (id) => {
            try {
              const r = await fetch(`http://localhost:5566/accounts/${id}`);
              if (!r.ok) return { id } as Account;
              const data = await r.json();
              return {
                id,
                account_number: data.account_number,
                balance: data.balance,
                currency: data.currency,
              } as Account;
            } catch {
              return { id } as Account;
            }
          }),
        );
        if (!mounted) return;
        setAccounts(results.filter(Boolean) as Account[]);
        if (!accountId && results[0]?.id) setAccountId(results[0].id);
      } catch {
        if (!mounted) return;
        setErrorAccounts('No se pudieron cargar las cuentas');
      } finally {
        if (mounted) setLoadingAccounts(false);
      }
    };

    load();
    return () => {
      mounted = false;
    };
  }, [user]);

  useEffect(() => {
    const sel = accounts.find((a) => a.id === accountId);
    if (sel) setCurrency(sel.currency);
  }, [accountId, accounts]);

  const selectedAccount = useMemo(
    () => accounts.find((a) => a.id === accountId) || null,
    [accounts, accountId],
  );

  const buildPayload = () => {
    if (!selectedAccount) throw new Error('Selecciona una cuenta origen');
    const val = parseFloat(amount.replace(/,/g, ''));
    if (isNaN(val) || val <= 0) throw new Error('Monto inválido');
    if ((selectedAccount.balance ?? 0) < val)
      throw new Error('Saldo insuficiente en la cuenta origen');

    const payload: any = {
      origin: selectedAccount.id,
      destination,
      amount: {
        currency: currency ?? selectedAccount.currency ?? 'NIO',
        value: val,
      },
    };

    payload.extraData = {
      debitConcept,
      creditConcept,
      reference,
      emailConfirmation,
    };

    return payload;
  };

  const handlePrepare = () => {
    try {
      setPostError(null);
      setPostSuccess(null);
      const payload = buildPayload();
      setPreparedPayload(payload);
      setShowConfirm(true);
    } catch (e: any) {
      setPostError(e?.message ?? 'Error inesperado');
    }
  };

  const sendPayload = async (payload: any) => {
    const token =
      typeof window !== 'undefined'
        ? localStorage.getItem('auth_token') ||
          localStorage.getItem('app_token') ||
          localStorage.getItem('token')
        : null;

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const r = await fetch('http://localhost:5566/transactions', {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    });
    if (!r.ok) {
      const text = await r.text();
      throw new Error(text || 'Error al crear la transacción');
    }
    return r.json();
  };

  const handleConfirm = async () => {
    setShowConfirm(false);
    if (!preparedPayload) return;
    setPostError(null);
    setPostSuccess(null);
    try {
      setPosting(true);
      await sendPayload(preparedPayload);
      setPostSuccess('Transferencia realizada correctamente');
      const val = preparedPayload.amount?.value ?? 0;
      setAccounts((prev) =>
        prev.map((a) =>
          a.id === preparedPayload.origin ? { ...a, balance: (a.balance ?? 0) - val } : a,
        ),
      );
    } catch (e: any) {
      setPostError(e?.message ?? 'Error inesperado');
    } finally {
      setPosting(false);
      setPreparedPayload(null);
    }
  };

  return {
    accounts,
    loadingAccounts,
    errorAccounts,
    accountId,
    selectedAccount,
    destination,
    amount,
    currency,
    posting,
    postError,
    postSuccess,
    showConfirm,
    preparedPayload,

    debitConcept,
    creditConcept,
    reference,
    emailConfirmation,

    setAccountId,
    setDestination,
    setAmount,
    setPostError,
    setPostSuccess,
    setShowConfirm,
    setDebitConcept,
    setCreditConcept,
    setReference,
    setEmailConfirmation,

    buildPayload,
    handlePrepare,
    handleConfirm,
  };
}
