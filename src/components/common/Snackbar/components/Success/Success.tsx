import React from 'react';
import { Alert, AlertProps } from '@mui/material';
import { alertStyles } from './Success.styles';

interface SnackbarSuccessProps
  extends Pick<AlertProps, 'onClose' | 'children'> {}

export function SnackbarSuccess(props: SnackbarSuccessProps): JSX.Element {
  const { onClose, children = 'Действие прошло успешно' } = props;

  return (
    <Alert
      onClose={onClose}
      severity="success"
      variant="outlined"
      sx={alertStyles}
    >
      {children}
    </Alert>
  );
}
