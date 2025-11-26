"use client";

import React from 'react';
import AccountItem from '../molecules/AccountItem';
import Text from '../atoms/Text';

const ACCOUNTS_DATA = [
  { alias: 'NIO Cuenta', account_number: '10424667', balance: 38456, currency: 'NIO', country_code: 'NI' },
  { alias: 'USD Cuenta', account_number: '10233849', balance: 22380, currency: 'USD', country_code: 'US' },
  { alias: 'USD Cuenta', account_number: '10635657', balance: 12400, currency: 'USD', country_code: 'US' }
];

const AccountSection: React.FC = () => {
  return (
    <section className="py-6">
      <div className="flex items-center justify-between px-6">
        <Text className="text-xl font-bold">Cuentas</Text>
      </div>

      <div className="mt-4 overflow-x-auto px-6">
        <div className="flex gap-4 py-2 w-max items-stretch">
          {ACCOUNTS_DATA.map((a, idx) => (
            <AccountItem
              key={idx}
              alias={a.alias}
              account_number={a.account_number}
              balance={a.balance}
              currency={a.currency}
              country_code={a.country_code}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AccountSection;
