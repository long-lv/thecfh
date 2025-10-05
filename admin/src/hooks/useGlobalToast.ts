import { useToast } from '../contexts/ToastContext';
import { ToastConfig, ToastPosition } from '../contexts/ToastContext';

export interface ToastOptions extends Partial<ToastConfig> {
  title?: string;
  duration?: number;
  position?: ToastPosition;
  closable?: boolean;
}

export const useGlobalToast = () => {
  const { toast, closeToast, toasts } = useToast();

  return {
    toast,
    closeToast,
    toasts,
    
    // Convenience methods with options
    success: (message: string, options?: ToastOptions) => {
      toast.success(message, options);
    },
    
    error: (message: string, options?: ToastOptions) => {
      toast.error(message, options);
    },
    
    warning: (message: string, options?: ToastOptions) => {
      toast.warning(message, options);
    },
    
    info: (message: string, options?: ToastOptions) => {
      toast.info(message, options);
    },
  };
};
