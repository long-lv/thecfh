import { ReactNode } from 'react';

export interface IPropsThecfhDialog {
  width?: string;
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
  fullWidth?: boolean;
  fullScreen?: boolean;
  disableBackdropClick?: boolean;
  disableEscapeKeyDown?: boolean;
  className?: string;
  style?: React.CSSProperties;
  closeButton?: boolean;
  closeButtonText?: string;
  confirmButton?: boolean;
  confirmButtonText?: string;
  onConfirm?: () => void;
  loading?: boolean;
  footer?: ReactNode;
}
