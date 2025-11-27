'use client';

import React, { useEffect, useMemo, useState } from 'react';
// TransferForm handles building a transfer payload, validating balance,
// showing a confirmation modal and posting to the /transactions endpoint.
import { useUser } from '@/app/context/UserContext';
import FormGroup from '../molecules/FormGroup';
import AccountSelector from '../molecules/AccountSelector';
import FormInput from '../atoms/FormInput';
import CallToAction from '../molecules/CallToAction';
import ConfirmModal from '../molecules/ConfirmModal';

type Account = {
  id: string;
  account_number?: string;
  balance?: number;
  currency?: string;
};

const TransferForm: React.FC = () => {
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

  // load accounts from user.products
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
      } catch (e) {
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

  // currency of account
  useEffect(() => {
    const sel = accounts.find((a) => a.id === accountId);
    if (sel) setCurrency(sel.currency);
  }, [accountId, accounts]);

  const selectedAccount = useMemo(
    () => accounts.find((a) => a.id === accountId) || null,
    [accounts, accountId],
  );

  const handleSubmit = async () => {
    setPostError(null);
    setPostSuccess(null);

    if (!selectedAccount) return setPostError('Selecciona una cuenta origen');
    const val = parseFloat(amount.replace(/,/g, ''));
    if (isNaN(val) || val <= 0) return setPostError('Monto inválido');
    if ((selectedAccount.balance ?? 0) < val)
      return setPostError('Saldo insuficiente en la cuenta origen');

    const payload = {
      origin: selectedAccount.id,
      destination: destination,
      amount: {
        currency: currency ?? selectedAccount.currency ?? 'NIO',
        value: val,
      },
    };

    try {
      // in case of tokens, just ui purpoose
      setPosting(true);
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
      const res = await r.json();
      setPostSuccess('Transferencia realizada correctamente');

      setAccounts((prev) =>
        prev.map((a) =>
          a.id === selectedAccount.id ? { ...a, balance: (a.balance ?? 0) - val } : a,
        ),
      );
    } catch (e: any) {
      setPostError(e?.message ?? 'Error inesperado');
    } finally {
      setPosting(false);
    }
  };

  // Confirmation modal
  const [showConfirm, setShowConfirm] = useState(false);
  const [preparedPayload, setPreparedPayload] = useState<any | null>(null);

  const handlePrepare = () => {
    setPostError(null);
    setPostSuccess(null);

    if (!selectedAccount) return setPostError('Selecciona una cuenta origen');
    const val = parseFloat(amount.replace(/,/g, ''));
    if (isNaN(val) || val <= 0) return setPostError('Monto inválido');
    if ((selectedAccount.balance ?? 0) < val)
      return setPostError('Saldo insuficiente en la cuenta origen');

    const payload = {
      origin: selectedAccount.id,
      destination: destination,
      amount: {
        currency: currency ?? selectedAccount.currency ?? 'NIO',
        value: val,
      },
    };
    setPreparedPayload(payload);
    setShowConfirm(true);
  };

  const handleConfirm = async () => {
    setShowConfirm(false);
    if (!preparedPayload) return;
    setPostError(null);
    setPostSuccess(null);
    try {
      setPosting(true);
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
        body: JSON.stringify(preparedPayload),
      });
      if (!r.ok) {
        const text = await r.text();
        throw new Error(text || 'Error al crear la transacción');
      }
      await r.json();
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

  return (
    <div className="bg-white p-4 rounded-md shadow-sm">
      <FormGroup label="Cuenta origen">
        {loadingAccounts ? (
          <div>Cargando cuentas...</div>
        ) : errorAccounts ? (
          <div className="text-red-600">{errorAccounts}</div>
        ) : (
          <AccountSelector
            accounts={accounts}
            value={accountId ?? ''}
            onChange={(id) => setAccountId(id)}
          />
        )}
      </FormGroup>

      <FormGroup label="Destino">
        <FormInput
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder="Cuenta destino"
        />
      </FormGroup>

      <FormGroup label="Monto">
        <div className="flex gap-2 items-center">
          <FormInput
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
          />
          <div className="text-sm text-gray-700">
            {currency ?? selectedAccount?.currency ?? 'NIO'}
          </div>
        </div>
      </FormGroup>

      <div className="flex items-center gap-4 mt-4">
        <CallToAction variant="secondary" onClick={() => setAmount('')}>
          Atrás
        </CallToAction>
        <CallToAction variant="primary" onClick={handlePrepare} disabled={posting}>
          {posting ? 'Enviando...' : 'Enviar'}
        </CallToAction>
      </div>

      <ConfirmModal
        open={showConfirm}
        title="Confirmar transferencia"
        onConfirm={handleConfirm}
        onCancel={() => setShowConfirm(false)}
      >
        <div className="text-sm">
          <div>
            <strong>Origen:</strong> {preparedPayload?.origin}
          </div>
          <div>
            <strong>Destino:</strong> {preparedPayload?.destination}
          </div>
          <div>
            <strong>Monto:</strong> {preparedPayload?.amount?.currency}{' '}
            {preparedPayload?.amount?.value}
          </div>
          <div className="text-xs text-gray-500 mt-2">Confirma para enviar la transferencia.</div>
        </div>
      </ConfirmModal>

      {postError && <div className="mt-3 text-red-600">{postError}</div>}
      {postSuccess && <div className="mt-3 text-green-600">{postSuccess}</div>}
    </div>
  );
};

export default TransferForm;
