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
}

export function ModalRequestError(props: ModalRequestErrorProps): JSX.Element {
  const { open, onClose } = props;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Произошла ошибка</DialogTitle>
      <DialogContent>
        <DialogContentText>Попробуйте повторить попытку</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} autoFocus>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
}
