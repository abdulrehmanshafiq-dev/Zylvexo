"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  useEffect,
} from "react";
import { CheckCircle, XCircle, Info, X } from "lucide-react";

type ToastType = "success" | "error" | "info";

interface ToastItem {
  id: number;
  type: ToastType;
  message: string;
}

interface ToastContextValue {
  toast: (opts: { type: ToastType; message: string }) => void;
}

const ToastContext = createContext<ToastContextValue>({
  toast: () => {},
});

export function useToast() {
  return useContext(ToastContext);
}

let nextId = 0;

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const toast = useCallback(
    ({ type, message }: { type: ToastType; message: string }) => {
      const id = nextId++;
      setToasts((prev) => [...prev.slice(-2), { id, type, message }]);
    },
    []
  );

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2">
        {toasts.map((t) => (
          <ToastItem key={t.id} item={t} onDismiss={dismiss} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

const icons = {
  success: CheckCircle,
  error: XCircle,
  info: Info,
};

const styles = {
  success: "bg-green-600/90 border-green-500/50",
  error: "bg-red-600/90 border-red-500/50",
  info: "bg-[#7C3AED]/90 border-[#7C3AED]/50",
};

function ToastItem({
  item,
  onDismiss,
}: {
  item: ToastItem;
  onDismiss: (id: number) => void;
}) {
  const [visible, setVisible] = useState(false);
  const Icon = icons[item.type];

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(() => onDismiss(item.id), 300);
    }, 3500);
    return () => clearTimeout(timer);
  }, [item.id, onDismiss]);

  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-lg border backdrop-blur-sm text-white text-sm shadow-lg transition-all duration-300 ${
        styles[item.type]
      } ${visible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}`}
    >
      <Icon className="w-4 h-4 shrink-0" />
      <span className="flex-1">{item.message}</span>
      <button
        onClick={() => onDismiss(item.id)}
        className="text-white/60 hover:text-white"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
