"use client";

import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Slide,
  useMediaQuery,
  useTheme,
  Paper,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { IPropsThecfhDialog } from "./type";
import styles from "./style.module.css";

// Transition component for dialog
const Transition = React.forwardRef<
  HTMLDivElement,
  TransitionProps & { children: React.ReactElement }
>(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ThecfhDialog: React.FC<IPropsThecfhDialog> = (props) => {
  const {
    open,
    title,
    children,
    maxWidth = "sm",
    fullWidth = true,
    fullScreen = false,
    disableBackdropClick = false,
    disableEscapeKeyDown = false,
    className = "",
    style,
    closeButton = true,
    closeButtonText = "Cancel",
    confirmButton = false,
    confirmButtonText = "Ok",
    loading = false,
    footer,
    width,
    isHiddenBorderTop = false,
    isHiddenBorderBot = false,
    onConfirm,
    onClose,
  } = props;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleConfirm = () => {
    if (onConfirm && !loading) {
      onConfirm();
    }
  };

  const handleDialogClose = (event: object, reason: string) => {
    // Only allow closing if not disabled or if it's not a backdrop click
    if (!disableBackdropClick || reason !== "backdropClick") {
      onClose();
    }
  };

  // Determine dialog props
  const dialogProps = {
    open,
    onClose: handleDialogClose,
    maxWidth: width ? false : maxWidth, // Disable maxWidth if custom width is provided
    fullWidth: width ? false : fullWidth, // Disable fullWidth if custom width is provided
    fullScreen: fullScreen || isMobile,
    TransitionComponent: fullScreen ? Transition : undefined,
    className: `${styles.dialogContainer} ${
      width ? styles.customWidth : ""
    } ${className}`,
    style: width ? { ...style, width } : style,
    disableEscapeKeyDown,
    "aria-labelledby": title ? "thecfh-dialog-title" : undefined,
  };

  return (
    <Dialog
      {...dialogProps}
      sx={{
        ...(width && {
          "& .MuiDialog-container": {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          },
          "& .MuiDialog-paper": {
            margin: "16px",
            maxHeight: "calc(100% - 32px)",
            width: width,
            maxWidth: "none",
            position: "relative",
          },
        }),
        ...(isHiddenBorderTop && {
          "& .MuiDialogTitle-root": {
            borderBottom: "none",
          },
        }),
				...(isHiddenBorderBot && {
           "& .MuiDialogActions-root": {
            borderTop: "none",
          },
        }),
      }}
      PaperComponent={
        width
          ? ({ children, ...props }) => (
              <Paper
                {...props}
                sx={{
                  width: width,
                  maxWidth: "none",
                  margin: "16px",
                  maxHeight: "calc(100% - 32px)",
                }}
              >
                {children}
              </Paper>
            )
          : undefined
      }
    >
      {/* Dialog Title */}
      {title && (
        <DialogTitle id="thecfh-dialog-title" className={styles.dialogTitle}>
          {title}
          {closeButton && (
            <IconButton
              aria-label="close"
              onClick={onClose}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              ✕
            </IconButton>
          )}
        </DialogTitle>
      )}

      {/* Dialog Content */}
      <DialogContent className={styles.dialogContent}>{children}</DialogContent>

      {/* Dialog Actions */}
      {(footer || closeButton || confirmButton) && (
        <DialogActions className={styles.dialogActions}>
          {footer ? (
            footer
          ) : (
            <>
              {closeButton && (
                <button
                  type="button"
                  className={styles.closeButton}
                  onClick={onClose}
                  disabled={loading}
                >
                  {closeButtonText}
                </button>
              )}
              {confirmButton && (
                <button
                  type="button"
                  className={`${styles.confirmButton} ${
                    loading ? styles.loadingButton : ""
                  }`}
                  onClick={handleConfirm}
                  disabled={loading}
                >
                  {loading ? "" : confirmButtonText}
                </button>
              )}
            </>
          )}
        </DialogActions>
      )}
    </Dialog>
  );
};

export default ThecfhDialog;
