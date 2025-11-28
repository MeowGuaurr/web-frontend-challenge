'use client';

import React from 'react';
import TransferForm from '@/app/components/organisms/TransferForm';

const TransfersPage: React.FC = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Transferencias</h2>
      <TransferForm />
    </div>
  );
};

export default TransfersPage;
