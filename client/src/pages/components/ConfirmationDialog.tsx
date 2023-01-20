import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

interface ConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  confirmButtonText?: string;
  isDisabled?: boolean;
  children?: React.ReactNode;
}

export function ConfirmationDialog({
  onClose,
  onConfirm,
  open,
  title,
  children,
  isDisabled = false,
  confirmButtonText = "Confirm",
}: ConfirmationDialogProps) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  if (!open) {
    return null;
  }

  return (
    <Dialog
      data-cy="confirmation-dialog"
      fullScreen={fullScreen}
      open={open}
      onClose={onClose}
    >
      <DialogTitle data-cy="confirmation-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{children}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button data-cy="cancel-btn" onClick={onClose} disabled={isDisabled}>
          Cancel
        </Button>
        <Button data-cy="confirm-btn" onClick={onConfirm} disabled={isDisabled}>
          {confirmButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
