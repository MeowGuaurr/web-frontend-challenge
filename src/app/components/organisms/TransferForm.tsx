'use client';

import React, { useState } from 'react';
import { useTransferForm } from '@/app/hooks/userTransferForm';
import FormGroup from '../molecules/FormGroup';
import AccountSelector from '../molecules/AccountSelector';
import FormInput from '../atoms/FormInput';
import CallToAction from '../molecules/CallToAction';
import ConfirmModal from '../molecules/ConfirmModal';
import { CheckCircle2 } from 'lucide-react';

export enum TransferStep {
  Origin = 0,
  Destination = 1,
  Amount = 2,
  Extra = 3,
}

const steps = [
  { id: TransferStep.Origin, step: 'Paso 1', label: 'Cuenta origen' },
  { id: TransferStep.Destination, step: 'Paso 2', label: 'Cuenta destino' },
  { id: TransferStep.Amount, step: 'Paso 3', label: 'Monto a transferir' },
  { id: TransferStep.Extra, step: 'Paso 4', label: 'Datos adicionales' },
];

const TransferForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<TransferStep>(TransferStep.Origin);

  const {
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

    setAccountId,
    setDestination,
    setAmount,
    setPostError,
    setPostSuccess,
    setShowConfirm,

    // datos adicionales
    debitConcept,
    creditConcept,
    reference,
    emailConfirmation,
    setDebitConcept,
    setCreditConcept,
    setReference,
    setEmailConfirmation,

    handlePrepare,
    handleConfirm,
  } = useTransferForm();

  const handleRestart = () => {
    setPostError(null);
    setPostSuccess(null);
    setDestination('');
    setAmount('');
    setDebitConcept('');
    setCreditConcept('');
    setReference('');
    setEmailConfirmation('');
    setCurrentStep(TransferStep.Origin);
  };

  // 🔢 Solo números/decimales en el monto
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;

    if (raw === '') {
      setAmount('');
      return;
    }

    const normalized = raw.replace(',', '.');
    const regex = /^\d*([.]\d{0,2})?$/;

    if (regex.test(normalized)) {
      setAmount(raw);
    }
  };

  const canGoNext = () => {
    if (currentStep === TransferStep.Origin) return !!accountId;

    if (currentStep === TransferStep.Destination) return destination.trim().length > 0;

    if (currentStep === TransferStep.Amount) {
      const val = parseFloat(amount.replace(/,/g, ''));
      return !isNaN(val) && val > 0;
    }

    return true;
  };

  const goNext = () => {
    if (!canGoNext()) return;

    if (currentStep === TransferStep.Extra) {
      handlePrepare();
    } else {
      setCurrentStep((s) => (s + 1) as TransferStep);
    }
  };

  const goBack = () => {
    setPostError(null);
    setPostSuccess(null);
    setCurrentStep((s) => (s > 0 ? ((s - 1) as TransferStep) : s));
  };

  const totalSteps = steps.length - 1;
  const progress = totalSteps <= 0 ? 0 : currentStep / totalSteps;

  if (postSuccess) {
    return (
      <div className="bg-white p-10 rounded-md shadow-sm flex flex-col items-center text-center">
        <div className="mb-6 flex items-center justify-center w-20 h-20 rounded-full bg-emerald-100 text-emerald-600">
          <CheckCircle2 className="w-12 h-12" />
        </div>
        <h2 className="text-2xl font-semibold mb-2">¡Transferencia realizada!</h2>
        <p className="text-gray-600 mb-6">Tu transferencia se ha procesado correctamente.</p>
        <CallToAction variant="primary" onClick={handleRestart}>
          Nueva transferencia
        </CallToAction>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-md shadow-sm">
      <div className="relative mb-8">
        <div className="absolute inset-x-8 top-[22px]">
          <div className="w-full h-[2px] bg-emerald-100 mt-3" />
          <div
            className="h-[2px] bg-emerald-600 transition-all duration-500 ease-out"
            style={{ width: `${progress * 100}%` }}
          />
        </div>

        <div className="relative z-10 flex justify-between px-8">
          {steps.map((step, index) => {
            const isActive = step.id === currentStep;
            const isDone = step.id < currentStep;

            const baseCircle = 'w-7 h-7 rounded-full flex items-center justify-center text-xs';

            const circleClass = isDone
              ? `${baseCircle} bg-emerald-600 text-white`
              : isActive
              ? `${baseCircle} bg-white border-[2px] border-emerald-600 text-emerald-700`
              : `${baseCircle} bg-white border border-gray-300 text-gray-400`;

            return (
              <div key={step.id} className="flex-1 flex flex-col items-center text-center">
                <span className="text-[10px] text-gray-400 mb-1">{step.step}</span>
                <div className={circleClass}>{isDone ? '✓' : index + 1}</div>
                <span className="mt-1 text-xs text-gray-700">{step.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {currentStep === TransferStep.Origin && (
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
      )}

      {currentStep === TransferStep.Destination && (
        <FormGroup label="Destino">
          <FormInput
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Cuenta destino"
          />
        </FormGroup>
      )}

      {currentStep === TransferStep.Amount && (
        <FormGroup label="Monto">
          <div className="flex gap-2 items-center">
            <FormInput value={amount} onChange={handleAmountChange} placeholder="0.00" />
            <div className="text-sm text-gray-700">
              {currency ?? selectedAccount?.currency ?? 'NIO'}
            </div>
          </div>
        </FormGroup>
      )}

      {currentStep === TransferStep.Extra && (
        <>
          <FormGroup label="Concepto de débito">
            <FormInput
              value={debitConcept}
              onChange={(e) => setDebitConcept(e.target.value)}
              placeholder="Cancelación de préstamo"
            />
          </FormGroup>

          <FormGroup label="Concepto de crédito">
            <FormInput
              value={creditConcept}
              onChange={(e) => setCreditConcept(e.target.value)}
              placeholder="Concepto de crédito"
            />
          </FormGroup>

          <div className="grid md:grid-cols-2 gap-4">
            <FormGroup label="Referencia">
              <FormInput
                value={reference}
                onChange={(e) => setReference(e.target.value)}
                placeholder="Referencia"
              />
            </FormGroup>

            <FormGroup label="Enviar confirmación a">
              <FormInput
                value={emailConfirmation}
                onChange={(e) => setEmailConfirmation(e.target.value)}
                placeholder="correo@ejemplo.com"
              />
            </FormGroup>
          </div>
        </>
      )}

      <div className="flex items-center gap-4 mt-6">
        <CallToAction
          variant="secondary"
          onClick={goBack}
          disabled={currentStep === TransferStep.Origin}
        >
          Atrás
        </CallToAction>
        <CallToAction variant="primary" onClick={goNext} disabled={!canGoNext() || posting}>
          {currentStep === TransferStep.Extra ? 'Continuar' : 'Siguiente'}
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

          {preparedPayload?.extraData && (
            <div className="mt-2 text-xs text-gray-600 space-y-1">
              <div>
                <strong>Concepto débito:</strong> {preparedPayload.extraData.debitConcept}
              </div>
              <div>
                <strong>Concepto crédito:</strong> {preparedPayload.extraData.creditConcept}
              </div>
              <div>
                <strong>Referencia:</strong> {preparedPayload.extraData.reference}
              </div>
              <div>
                <strong>Confirmación a:</strong> {preparedPayload.extraData.emailConfirmation}
              </div>
            </div>
          )}

          <div className="text-xs text-gray-500 mt-2">Confirma para enviar la transferencia.</div>
        </div>
      </ConfirmModal>

      {postError && <div className="mt-3 text-red-600">{postError}</div>}
    </div>
  );
};

export default TransferForm;
