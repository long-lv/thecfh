import { ReactNode } from "react";

export interface IPropsThecfhDialog {
  width?: string;
  open: boolean;
  title?: string;
  children: ReactNode;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | false;
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
  isHiddenBorderTop?: boolean;
  isHiddenBorderBot?: boolean;
  loading?: boolean;
  footer?: ReactNode;
  onConfirm?: () => void;
  onClose: () => void;
}
