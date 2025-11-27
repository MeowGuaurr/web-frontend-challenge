"use client";

import React from "react";

const ConfirmModal: React.FC<{
  open: boolean;
  title?: string;
  children?: React.ReactNode;
  onConfirm: () => void;
  onCancel: () => void;
  confirmLabel?: string;
}> = ({
  open,
  title = "Confirmar",
  children,
  onConfirm,
  onCancel,
  confirmLabel = "Confirmar",
}) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-md w-full max-w-lg p-6">
        <div className="mb-4">
          <h3 className="text-sm font-semibold">{title}</h3>
        </div>
        <div className="mb-6 text-sm text-gray-700">{children}</div>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded border border-gray-300"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-green-600 text-white"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
