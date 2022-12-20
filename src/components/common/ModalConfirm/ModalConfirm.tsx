import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogProps,
} from '@mui/material';

interface ModalRequestErrorProps extends Pick<DialogProps, 'open'> {
  onClose?: () => void;
  onConfirm?: () => void;
  confirmText?: string;
}

export function ModalConfirm(props: ModalRequestErrorProps): JSX.Element {
  const { open = false, onClose, onConfirm, confirmText } = props;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Подтвердите действие</DialogTitle>
      {confirmText && (
        <DialogContent>
          <DialogContentText>{confirmText}</DialogContentText>
        </DialogContent>
      )}
      <DialogActions>
        <Button onClick={onClose}>Отмена</Button>
        <Button onClick={onConfirm} autoFocus>
          Подтвердить
        </Button>
      </DialogActions>
    </Dialog>
  );
}
