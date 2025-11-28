'use client';

import React, { useEffect } from 'react';

type ConfirmModalProps = {
  open: boolean;
  title?: string;
  children?: React.ReactNode;
  onConfirm: () => void;
  onCancel: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'default' | 'danger';
};

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  open,
  title = 'Confirmar',
  children,
  onConfirm,
  onCancel,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  variant = 'default',
}) => {
  // Cerrar con ESC
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCancel();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onCancel]);

  if (!open) return null;

  const confirmClasses =
    variant === 'danger'
      ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
      : 'bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-500';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onCancel}
    >
      <div
        className="
          w-full max-w-md rounded-xl bg-white shadow-xl border border-gray-100
          p-6
          transform transition-all duration-200
          animate-[fadeIn_0.15s_ease-out]
        "
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-modal-title"
      >
        <div className="mb-4 flex items-start gap-3 mt-1.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 text-sm">
            !
          </div>
          <div>
            <h3 id="confirm-modal-title" className="text-sm font-semibold text-gray-900">
              {title}
            </h3>
            {children && <div className="mt-2 text-sm text-gray-600">{children}</div>}
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="
              px-4 py-2 rounded-lg border border-gray-300 text-sm
              text-gray-700 hover:bg-gray-50
              focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-300
            "
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`
              px-4 py-2 rounded-lg text-sm text-white
              ${confirmClasses}
              focus:outline-none focus:ring-2 focus:ring-offset-1
            `}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
