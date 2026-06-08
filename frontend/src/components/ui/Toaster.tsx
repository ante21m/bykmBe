'use client';

import { useState, useEffect, createContext, useContext, useCallback } from 'react';
import { CheckCircle, XCircle, X } from 'lucide-react';

interface Toast {
  id: string;
  type: 'success' | 'error';
  title: string;
  message?: string;
}

interface ToastContextType {
  addToast: (toast: Omit<Toast, 'id'>) => void;
}

const ToastContext = createContext<ToastContextType>({ addToast: () => {} });

export function useToast() {
  return useContext(ToastContext);
}

export function Toaster() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { ...toast, id }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 max-w-sm w-full">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`flex items-start gap-3 p-4 shadow-xl border-l-4 bg-white animate-fade-up ${
              toast.type === 'success'
                ? 'border-forest-500'
                : 'border-red-600'
            }`}
          >
            {toast.type === 'success' ? (
              <CheckCircle size={20} className="text-forest-500 shrink-0 mt-0.5" />
            ) : (
              <XCircle size={20} className="text-red-600 shrink-0 mt-0.5" />
            )}
            <div className="flex-1">
              <p className="font-bold text-sm text-navy-900">{toast.title}</p>
              {toast.message && (
                <p className="text-xs text-navy-700/70 mt-1">{toast.message}</p>
              )}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
