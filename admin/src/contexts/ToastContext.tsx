'use client';

import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { 
  Alert, 
  AlertTitle, 
  Box,
  Typography 
} from '@mui/material';

// Toast types
export type ToastType = 'success' | 'error' | 'warning' | 'info';

// Toast positions
export type ToastPosition = 
  | 'top-left' 
  | 'top-center' 
  | 'top-right' 
  | 'bottom-left' 
  | 'bottom-center' 
  | 'bottom-right';

// Toast configuration
export interface ToastConfig {
  type: ToastType;
  message: string;
  title?: string;
  duration?: number;
  position?: ToastPosition;
  closable?: boolean;
}

// Toast item interface
export interface ToastItem extends ToastConfig {
  id: string;
  open: boolean;
}

// Context type
interface ToastContextType {
  toast: {
    success: (message: string, config?: Partial<ToastConfig>) => void;
    error: (message: string, config?: Partial<ToastConfig>) => void;
    warning: (message: string, config?: Partial<ToastConfig>) => void;
    info: (message: string, config?: Partial<ToastConfig>) => void;
  };
  closeToast: (id: string) => void;
  toasts: ToastItem[];
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);


// Position styles
const getPositionStyles = (position: ToastPosition) => {
  const positions = {
    'top-left': { top: 16, left: 16, right: 'auto', bottom: 'auto' },
    'top-center': { top: 16, left: '50%', right: 'auto', bottom: 'auto', transform: 'translateX(-50%)' },
    'top-right': { top: 16, right: 16, left: 'auto', bottom: 'auto' },
    'bottom-left': { bottom: 16, left: 16, right: 'auto', top: 'auto' },
    'bottom-center': { bottom: 16, left: '50%', right: 'auto', top: 'auto', transform: 'translateX(-50%)' },
    'bottom-right': { bottom: 16, right: 16, left: 'auto', top: 'auto' },
  };
  return positions[position];
};

// Get toast icon
const getToastIcon = (type: ToastType) => {
  const icons = {
    success: '✅',
    error: '❌',
    warning: '⚠️',
    info: 'ℹ️',
  };
  return icons[type];
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

interface ToastProviderProps {
  children: ReactNode;
  defaultPosition?: ToastPosition;
  defaultDuration?: number;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ 
  children, 
  defaultPosition = 'top-right',
  defaultDuration = 4000 
}) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const closeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const addToast = useCallback((config: ToastConfig) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast: ToastItem = {
      id,
      open: true,
      duration: defaultDuration,
      position: defaultPosition,
      closable: true,
      ...config,
    };

    setToasts(prev => [...prev, newToast]);

    // Auto close after duration
    if (newToast.duration && newToast.duration > 0) {
      setTimeout(() => {
        closeToast(id);
      }, newToast.duration);
    }
  }, [defaultDuration, defaultPosition, closeToast]);

  const toast = {
    success: (message: string, config?: Partial<ToastConfig>) => {
      addToast({ ...config, type: 'success', message });
    },
    error: (message: string, config?: Partial<ToastConfig>) => {
      addToast({ ...config, type: 'error', message });
    },
    warning: (message: string, config?: Partial<ToastConfig>) => {
      addToast({ ...config, type: 'warning', message });
    },
    info: (message: string, config?: Partial<ToastConfig>) => {
      addToast({ ...config, type: 'info', message });
    },
  };

  const value: ToastContextType = {
    toast,
    closeToast,
    toasts,
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      
      {/* Toast Container */}
      {toasts.map((toastItem, index) => (
        <Box
          key={toastItem.id}
          sx={{
            position: 'fixed',
            ...getPositionStyles(toastItem.position || defaultPosition),
            zIndex: 10000,
            maxWidth: 400,
            minWidth: 300,
            marginTop: index * 70, // Stack toasts vertically
          }}
        >
          <Alert
            severity={toastItem.type}
            onClose={toastItem.closable ? () => closeToast(toastItem.id) : undefined}
            sx={{
              width: '100%',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              borderRadius: 2,
              mb: 1,
            }}
            icon={
              <Box sx={{ display: 'flex', alignItems: 'center', fontSize: '1.2rem' }}>
                {getToastIcon(toastItem.type)}
              </Box>
            }
          >
            {toastItem.title && (
              <AlertTitle sx={{ fontWeight: 'bold', marginBottom: 0.5 }}>
                {toastItem.title}
              </AlertTitle>
            )}
            <Typography variant="body2">
              {toastItem.message}
            </Typography>
          </Alert>
        </Box>
      ))}
    </ToastContext.Provider>
  );
};
