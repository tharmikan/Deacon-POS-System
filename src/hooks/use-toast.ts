
import { useState } from "react";
import { ToastActionElement, ToastProps } from "@/components/ui/toast";

export const TOAST_REMOVE_DELAY = 1000;

export type ToasterToast = ToastProps & {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
};

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const;

let count = 0;

function generateId() {
  return `${count++}`;
}

export function useToast() {
  const [toasts, setToasts] = useState<ToasterToast[]>([]);

  function toast(props: Omit<ToasterToast, "id">) {
    const id = generateId();
    const newToast = { ...props, id };
    
    setToasts((prevToasts) => [...prevToasts, newToast]);
    
    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    }, 3000);
    
    return id;
  }

  function update(id: string, props: Omit<ToasterToast, "id">) {
    setToasts((prevToasts) => 
      prevToasts.map((toast) => (toast.id === id ? { ...toast, ...props } : toast))
    );
  }

  function dismiss(id: string) {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }

  return {
    toast,
    update,
    dismiss,
    toasts,
  };
}

export const toast = (props: Omit<ToasterToast, "id">) => {
  const id = generateId();
  // This is a simple implementation for direct usage
  // In a real app, you'd use a context provider
  return id;
};
