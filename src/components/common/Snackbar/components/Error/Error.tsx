import React from 'react';
import { Alert, AlertProps } from '@mui/material';
import { alertStyles } from './Error.styles';

interface SnackbarErrorProps extends Pick<AlertProps, 'onClose' | 'children'> {}

export function SnackbarError(props: SnackbarErrorProps): JSX.Element {
  const { onClose, children = 'Произошла ошибка' } = props;

  return (
    <Alert onClose={onClose} severity="error" sx={alertStyles}>
      {children}
    </Alert>
  );
}
